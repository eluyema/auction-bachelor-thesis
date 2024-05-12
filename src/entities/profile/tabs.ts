import { AccessLevel, AccessLevelType } from '../users/MyUser';

export const myDataTab = {
    name: 'Мої дані',
    link: '/profile/my-info',
} as const;

export const myAuctionsTab = {
    name: 'Створені аукціони',
    link: '/profile/auctions',
} as const;

export const usersSettingsTab = {
    name: 'Пошук користувачів',
    link: '/profile/users',
} as const;

export const selectAvailableTabs = (accessLevel: AccessLevelType) => {
    if (accessLevel === AccessLevel.REGULAR) {
        return [myDataTab];
    }

    if (accessLevel === AccessLevel.MANAGER) {
        return [myDataTab, myAuctionsTab];
    }

    return [myDataTab, myAuctionsTab, usersSettingsTab];
};
