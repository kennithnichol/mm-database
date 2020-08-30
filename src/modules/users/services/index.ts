import  { IAuthService } from './authService';

class RedisAuthService implements IAuthService {
    signJWT (props: any): any { return '' };
    decodeJWT (token: any): Promise<any> { return new Promise((resolve,reject) => { return resolve('') } ) };
    createRefreshToken (): any { return '' };
    async getTokens (username: string): Promise<string[]> { return [] };
    async saveAuthenticatedUser (user: any): Promise<void> { return; };
    async deAuthenticateUser (username: string): Promise<void> { return; };
    async refreshTokenExists (refreshToken: any): Promise<boolean> { return false; };
    async getUserNameFromRefreshToken (refreshToken: any): Promise<string> { return ''; };
}

const authService = new RedisAuthService();

export { authService }