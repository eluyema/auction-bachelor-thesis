import { AccessLevelType } from 'src/entities/users/MyUser';

export interface UserResponseDto {
    id: string;
    name: string;
    email: string;
    accessLevel: AccessLevelType;
}
