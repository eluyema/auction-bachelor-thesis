export const AccessLevel = {
    REGULAR: 'REGULAR',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN',
} as const;

export type AccessLevelType = (typeof AccessLevel)[keyof typeof AccessLevel];

export interface User {
    id: string;
    name: string;
    email: string;
    accessLevel: AccessLevelType;
}
