import KanbanSelectPage from "@/page/KanbanSelectPage.vue";
import KanbanTaskPage from "@/page/KanbanTaskPage.vue";
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
    { path: '/', component: KanbanSelectPage },
    { path: '/:index?', component: KanbanTaskPage}
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes
})

export default router