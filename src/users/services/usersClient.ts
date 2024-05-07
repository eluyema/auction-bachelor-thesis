import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { MyUserResponseDto } from './dtos/MyUserResponseDto';

export class UsersClient extends HttpClient {
    async getMyUser() {
        const { result: user } = await this.get<MyUserResponseDto>('/self');

        return user;
    }
}
