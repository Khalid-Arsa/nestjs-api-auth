import { UserType } from 'src/types/user.type';
export declare class UsersService {
    private readonly users;
    constructor();
    findOne(username: string): Promise<UserType | undefined>;
}
