import { createWebHistory, createRouter } from 'vue-router';

import AuctionListPage from 'src/pages/auction/AuctionListPage/AuctionListPage.vue';
import LoginPage from 'src/pages/auth/LoginPage/LoginPage.vue';
import RegistrationPage from 'src/pages/auth/RegistrationPage/RegistrationPage.vue';
import MyAuctionsPage from 'src/pages/profile/MyAuctionsPage/MyAuctionsPage.vue';
import MyInfoPage from 'src/pages/profile/MyInfoPage/MyInfoPage.vue';
import UsersSettingsPage from 'src/pages/profile/UsersSettingsPage/UsersSettingsPage.vue';
import { useAuthStore } from 'src/auth/store';
import NotFound from 'src/pages/NotFound.vue';
import AuctionEditorPage from 'src/pages/profile/AuctionEditorPage/AuctionEditorPage.vue';
import CreateAuction from 'src/pages/profile/CreateAuction/CreateAuction.vue';

const routes = [
    { path: '/', component: AuctionListPage },
    { path: '/login', component: LoginPage },
    { path: '/registration', component: RegistrationPage },
    {
        path: '/profile/auctions',
        component: MyAuctionsPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile/auctions/create',
        component: CreateAuction,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile/auctions/:auctionId',
        component: AuctionEditorPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile/my-info',
        component: MyInfoPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile/users',
        component: UsersSettingsPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthorized) {
        authStore
            .setupMyUser()
            .then(() => {
                const isAuthorized = authStore.isAuthorized;
                if (isAuthorized) {
                    next();
                } else {
                    next('login');
                }
            })
            .catch(() => {
                next('login');
            });
    } else {
        next();
    }
});
