<template>
    <header class='header'>
        <div class='header-body'>
            <a class='header-logo' :href='prozzoroUrl' target='_self'>
                <img :src='prozorroLogo' alt='Логотип Прозорро'/>
            </a>
            <div class='header-content'>
                <ul class='social-list' >
                    <li class='social-item' v-for='item in socialItems'>
                        <a target='_blank' class='social-link' :href='item.src'><img class='social-image' :src='item.image' :alt='item.alt'/></a>
                    </li>
                </ul>
                <CustomIcon iconName='account_circle'/>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
import CustomIcon from 'src/shared/ui/CustomIcon/CustomIcon.vue';
import prozorroLogo from 'src/app/assets/images/prozorro-logo.svg';
import facebookSocial from 'src/app/assets/images/social-images/facebook-social.svg';
import telegramSocial from 'src/app/assets/images/social-images/telegram-social.svg';
import youtubeSocial from 'src/app/assets/images/social-images/youtube-social.svg';
import { config } from 'src/config';

const { prozzoroUrl } = config;

const socialItems = [
    {
        image: facebookSocial,
        src: 'https://www.facebook.com/prozorro.gov.ua',
        alt: 'facebook'
    },
    {
        image: telegramSocial,
        src: 'https://t.me/tendernya',
        alt: 'telegram'
    },
    {
        image: youtubeSocial,
        src: 'https://www.youtube.com/channel/UCI-2twjrz8C4dYiQXDGZf5g',
        alt: 'youtube'
    },
] as const;


</script>

<style scoped lang='scss'>
@import 'src/app/assets/styles/theme/index.scss';

.header {
    display: flex;
    height: 64px;
    padding: 8px 12px;
    background: var(--background-color-white);

    @include desktop() {
        padding-right: 40px;
        padding-left: 40px;
    }
}

.header-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-logo {
}

.header-content {
    display: flex;
}

.social-list {
    display: none;
    align-items: center;

    @include desktop() {
        margin-right: 32px;
        display: flex;
    }
}

.social-item:not(:last-child) {
    margin-right: 20px;
}

.social-link {
    background-repeat: no-repeat;
    background-position: 50%;
}

.social-image {
    display: block;
    transition: transform .2s;
    
    &:hover {
        transform: scale(1.1);
    }
}
</style>
