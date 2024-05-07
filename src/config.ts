export type AppConfig = {
    prozzoroUrl: string;
    rootAppId: string;
    apiUrl: string;
    theme: {
        breakpoints: {
            maxMobileWidth: number;
            minDesktopWidth: number;
        };
    };
};

export const config: AppConfig = {
    prozzoroUrl: 'https://prozorro.gov.ua',
    rootAppId: '#app',
    apiUrl: 'https://online-auction-backend.com.ua',
    theme: {
        breakpoints: {
            maxMobileWidth: 1024,
            minDesktopWidth: 1025,
        },
    },
};

//'https://online-auction-backend.com.ua' ||
