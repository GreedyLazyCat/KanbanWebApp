import KanbanSelectPage from "@/page/KanbanSelectPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    { path: '/', component: KanbanSelectPage },
    { path: '/:index?', component: KanbanSelectPage }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router