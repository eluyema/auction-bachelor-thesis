import { AccessLevel, AccessLevelType } from '../users/MyUser';

export const myDataTab = {
    name: 'Мої дані',
    link: '/profile/my-info',
} as const;

export const myAuctionsTab = {
    name: 'Створені аукціони',
    link: '/profile/auctions',
} as const;

export const myParticipationAuctionsTab = {
    name: 'Аукціни в яких брали участь',
    link: '/profile/participation-auctions',
};

export const usersSettingsTab = {
    name: 'Пошук користувачів',
    link: '/profile/users',
} as const;

export const selectAvailableTabs = (accessLevel: AccessLevelType) => {
    if (accessLevel === AccessLevel.REGULAR) {
        return [myDataTab, myParticipationAuctionsTab];
    }

    if (accessLevel === AccessLevel.MANAGER) {
        return [myDataTab, myParticipationAuctionsTab, myAuctionsTab];
    }

    return [myDataTab, myParticipationAuctionsTab, myAuctionsTab, usersSettingsTab];
};
