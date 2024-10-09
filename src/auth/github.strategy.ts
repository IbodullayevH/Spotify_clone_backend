import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { AuthService } from "./auth.service";
import * as dotenv from 'dotenv';

dotenv.config(); 

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_REDIRECT_URI,
            scope: ['user:email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
        try {
            const jwt: string = await this.authService.validateOAuthLogin(profile);
            const user = {
                id: profile.id,
                username: profile.username,
                email: profile.emails?.[0].value || null,
                jwt,
            };
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
