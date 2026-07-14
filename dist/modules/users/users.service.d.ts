import { IUser } from '../../models/user.model';
import { PaginatedResponse } from '../../shared/utils/pagination';
import { ListUsersQueryDto } from './users.dto';
export declare class UsersService {
    listUsers(query: ListUsersQueryDto): Promise<PaginatedResponse<IUser>>;
    getUserById(id: string): Promise<IUser>;
}
//# sourceMappingURL=users.service.d.ts.map