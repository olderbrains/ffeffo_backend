import { IUser } from '../../models/user.model';
import { RegisterDto } from './auth.dto';
interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}
export declare class AuthService {
    register(dto: RegisterDto): Promise<{
        user: IUser;
        tokens: TokenPair;
    }>;
    login(firebaseToken: string): Promise<{
        user: IUser;
        tokens: TokenPair;
    }>;
    /**
     * Development-only shortcut: issues a platform JWT for an existing seeded user
     * by email, bypassing Firebase. Hard-gated to NODE_ENV=development so it can
     * never mint tokens in staging or production.
     */
    devLogin(email: string): Promise<{
        user: IUser;
        tokens: TokenPair;
    }>;
    refreshTokens(refreshToken: string): Promise<TokenPair>;
    logout(userId: string): Promise<void>;
    private generateTokens;
    private storeRefreshToken;
    private getStoredRefreshToken;
    private revokeAllTokens;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map