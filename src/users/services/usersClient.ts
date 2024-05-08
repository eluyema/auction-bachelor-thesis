import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { MyUserResponseDto } from './dtos/MyUserResponseDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';
import { UserResponseDto } from './dtos/UserResponseDto';

export class UsersClient extends HttpClient {
    async getMyUser() {
        const user = await this.get<MyUserResponseDto>('/self');

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.get<MyUserResponseDto>('/email/' + email);

        return user;
    }

    async updateUser(email: string, data: UpdateUserDto) {
        console.log('fff', email, data);
        const user = await this.put<UpdateUserDto, UserResponseDto>('/email/' + email, data);

        return user;
    }
}
