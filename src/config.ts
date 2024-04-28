export type AppConfig = {
    prozzoroUrl: string
    rootAppId: string
    theme: {
        breakpoints: {
            maxMobileWidth: number;
            minDesktopWidth: number
        },
    }
}

export const config: AppConfig = {
    prozzoroUrl: 'https://prozorro.gov.ua',
    rootAppId: '#app',
    theme: {
        breakpoints: {
            maxMobileWidth: 1024,
            minDesktopWidth: 1025
        },
    }
}
