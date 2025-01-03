import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Reward from './Reward.vue';
import Account from './Account.vue';
import Game from './Game.vue';
import Chat from './Chat.vue';
import Agent from './Agent.vue';
import Discover from './Discover.vue';
import Buy from './Buy.vue';
import Entity from './Entity.vue';
import Details from './Details.vue';


const routes: Array<any> = [
    {
        path: '/',
        component: Chat
    },
    {
        path: '/Reward',
        component: Reward
    },
    {
        path: '/Discover',
        component: Discover,
    },
    {
        path: "/Details/:id",
        component: Details,
    },
    {
        path: "/Buy",
        component: Buy,
    },
    {
        path: "/Entity/:id",
        component: Entity,
    },
    {
        path: '/Account',
        component: Account
    },
    {
        path: '/Agent',
        component: Agent
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;