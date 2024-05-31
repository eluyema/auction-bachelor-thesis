import { AccessLevelType } from 'src/entities/users/MyUser';

export interface MyUserResponseDto {
    id: string;
    name: string;
    email: string;
    accessLevel: AccessLevelType;
}
