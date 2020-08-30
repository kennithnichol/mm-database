export interface IAuthService {
    signJWT (props: any): any;
    decodeJWT (token: any): Promise<any>;
    createRefreshToken (): any;
    getTokens (username: string): Promise<string[]>;
    saveAuthenticatedUser (user: any): Promise<void>;
    deAuthenticateUser (username: string): Promise<void>;
    refreshTokenExists (refreshToken: any): Promise<boolean>;
    getUserNameFromRefreshToken (refreshToken: any): Promise<string>;
}