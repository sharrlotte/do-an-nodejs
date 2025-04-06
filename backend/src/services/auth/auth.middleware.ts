import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from 'src/config/configuration';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig>,
  ) {}

  async use(req: any, res: any, next: any) {
    const token = req?.headers?.authorization;

    if (!token) {
      req['user'] = null;
      return next();
    }
    try {
      const { sub, ...payload } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('auth.jwt.secret'),
      });

      //@ts-ignore
      req['user'] = { ...payload, id: +sub };
    } catch (error) {
      //TODO: Secure
      res.clearCookie('jwt');
    }

    next();
  }
}
