import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('oauth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('github')
  @UseGuards(PassportAuthGuard('github'))
  async githubLogin() { }

  @Get('/github/callback')
  @UseGuards(PassportAuthGuard('github'))
  async githubLoginCallback(@Req() req) {
    const { user } = req;

    const response = {
      id: user.id,
      username: user.username,
      email: user.email,
      access_token: user.jwt,
    };
    return response;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMyData(@Req() req) {
    console.log(req['payload']);


    return this.authService.getAllMyData(req['payload']);
  }
}
