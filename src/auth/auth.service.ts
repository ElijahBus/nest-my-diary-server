import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async singin(authDto: AuthDto) {
    // find the user based of the name
    const user = await this.prisma.user.findUnique({
      where: {
        name: authDto.name,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare the password
    const passwordMatches = await argon.verify(user.password, authDto.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.signToken(user.id, user.name);
  }

  async singup(authDto: AuthDto) {
    // generate the password hash
    const hashedPassword = await argon.hash(authDto.password);
    // save the user into the database
    try {
      return this.prisma.user.create({
        data: {
          name: authDto.name,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken!');
        }

        throw error;
      }
    }
  }

  async signToken(
    userId: number,
    name: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      name,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
