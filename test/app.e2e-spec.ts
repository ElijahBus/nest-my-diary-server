import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const reqBody: AuthDto = {
      name: 'Bel',
      password: 'Bel123',
    };

    describe('Signup', () => {
      it('should throw if name is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(reqBody)
          .expectStatus(400);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(reqBody)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(reqBody)
          .expectStatus(200)
          .stores('userAccessToken', 'access_token'); // stores in the access token in a variable for later usage
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAccessToken}',
          })
          .expectStatus(200);
      });
    });
  });
});
