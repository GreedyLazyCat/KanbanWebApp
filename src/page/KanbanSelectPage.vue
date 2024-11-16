<script lang="ts" setup>
import KanbanItem from '@/components/KanbanItem.vue';
import { computed, onMounted, reactive, ref } from 'vue';

const started = ref(false);
const showNewItem = ref(false);

const kanbans = reactive([
    {
        id: 0,
        title: 'First Kanban',
        isNew: false
    },
    {
        id: 1,
        title: 'Second Kanban',
        isNew: false
    }
])

function start() {
    started.value = true;
    localStorage.setItem("isNotNewUser", "true")
}

function addKanban() {
    let kanbansLength = kanbans.length;
    let kanban = kanbans[kanbansLength - 1];
    kanbans.push({
        id: kanban.id + 1,
        title: "New Kanban",
        isNew: true
    });
    showNewItem.value = false;
}

function addMouseLeft() {
    showNewItem.value = false;
}

function addMouseEnter() {
    if (!kanbans.find((p) => p.isNew)) {
        showNewItem.value = true;
    }
}

onMounted(() => {
    let isNotNewUser = localStorage.getItem("isNotNewUser")
    if (isNotNewUser != null) {
        started.value = isNotNewUser === "true";
    }
});



</script>

<template>
    <div class="kanban-list-main">
        <div class="kanban-tool" :class="{ 'kanban-tool__started': started }">
            <div class="kanban-tool__logo">
                <div>
                    <h1>Kanban</h1>
                    <div class="line-separator"></div>
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
                </div>
                <button class="get-started-btn" @click="start">Get Started</button>
            </div>
            <div class="kanban-tool__ctrls">
                <button class="btn" @mouseenter="addMouseEnter" @mouseleave="addMouseLeft" @click="addKanban">Add
                    kanban</button>
            </div>
        </div>
        <div class="kanban-select-body" :class="{ 'kanban-select-body__started': started }">
            <KanbanItem v-for="kanban in kanbans" :kanban="kanban" :key="kanban.id" />
            <div class="kanban-add-item" :class="{ 'opacity-1': showNewItem }">
                <h3>New Kanban</h3>
            </div>
        </div>
    </div>
</template>

<style>
.kanban-add-item.opacity-1 {
    opacity: 1;
}

.kanban-add-item {
    background-color: #38ad5b;
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
    /* border: 1px solid var(--card-border); */
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.7rem;
    opacity: 0;
    transition: 0.5s ease-out;
}

.kanban-add-item>h3 {
    margin: 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.477);
}
</style>