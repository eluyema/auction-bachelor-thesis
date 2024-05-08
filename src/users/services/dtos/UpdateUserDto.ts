import { AccessLevelType } from 'src/entities/users/MyUser';

export type UpdateUserDto = {
    name: string;
    email: string;
    accessLevel: AccessLevelType;
};
