import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';
import MoviesView from '../views/MoviesView.vue';
import DetailsView from '../views/DetailsView.vue';
import CartView from '../views/CartView.vue';
import SettingsView from '../views/SettingsView.vue';
import ErrorView from '../views/ErrorView.vue';
import { userAuthorized, useStore } from '../store';


const routes = [
    { path: '/', component: HomeView },
    { path: '/register', component: RegisterView },
    { path: '/login', component: LoginView },
    { path: '/movies', component: MoviesView },
    { path: '/movies/:id', component: DetailsView },
    { path: '/cart', component: CartView },
    { path: '/settings', component: SettingsView },
    { path: '/:pathMatch(.*)*', meta: { auth: false }, component: ErrorView, }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    userAuthorized.then(() => {
        const store = useStore();

        if (!store.user && to.meta.auth) {
            next("/login");
        } else {
            next();
        }
    });
});

export default router;

