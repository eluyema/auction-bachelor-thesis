import { createWebHistory , createRouter } from 'vue-router'

import AuctionListPage from 'src/auction/pages/AuctionListPage/AuctionListPage.vue';
import LoginPage from 'src/auth/pages/LoginPage/LoginPage.vue';   
import RegistrationPage from 'src/auth/pages/RegistrationPage/RegistrationPage.vue';

const routes = [
  { path: '/', component: AuctionListPage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})