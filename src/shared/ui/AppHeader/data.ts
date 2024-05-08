import facebookSocial from 'src/app/assets/images/social-images/facebook-social.svg';
import telegramSocial from 'src/app/assets/images/social-images/telegram-social.svg';
import youtubeSocial from 'src/app/assets/images/social-images/youtube-social.svg';

export const socialItems = [
    {
        image: facebookSocial,
        src: 'https://www.facebook.com/prozorro.gov.ua',
        alt: 'facebook',
    },
    {
        image: telegramSocial,
        src: 'https://t.me/tendernya',
        alt: 'telegram',
    },
    {
        image: youtubeSocial,
        src: 'https://www.youtube.com/channel/UCI-2twjrz8C4dYiQXDGZf5g',
        alt: 'youtube',
    },
] as const;
