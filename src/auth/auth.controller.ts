import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('singin')
  signin(@Body() req: AuthDto) {
    return this.authService.singin(req);
  }

  @Post('signup')
  signup(@Body() req: AuthDto) {
    return this.authService.singup(req);
  }
}
