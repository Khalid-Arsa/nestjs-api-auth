import { AuthService } from '../auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): any;
}
