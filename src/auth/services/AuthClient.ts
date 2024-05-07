import HttpClient from 'src/app/services/HttpClient/HttpClient';
import { RegistrationDto } from './dtos/RegistrationDto';
import { LoginDto } from './dtos/LoginDto';
import { LoginResponseDto } from './dtos/LoginResponseDto';
import { config } from 'src/config';

export class AuthClient extends HttpClient {
    async login(dto: LoginDto) {
        const { result } = await this.post<LoginDto, LoginResponseDto>('/login', dto);
        const { accessToken, refreshToken } = result;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    async registration(dto: RegistrationDto) {
        await this.post<RegistrationDto>('/registration', dto);
    }

    async logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    tokensAvailable(): boolean {
        const accessToken = localStorage.getItem('accessToken');
        const refreshAccess = localStorage.getItem('refreshToken');

        return !!accessToken || !!refreshAccess;
    }
}
