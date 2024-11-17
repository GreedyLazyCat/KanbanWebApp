<script lang="ts" setup>
import KanbanItem from '@/components/KanbanItem.vue';
import { animateGetStarted, openingAnimation } from '@/animation/animations'
import { Flip } from 'gsap/Flip';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';

interface Kanban {
    id: number,
    title: string,
    isNew: boolean
}

const started = ref(false);
const showNewItem = ref(false);
const disableNewItemTransition = ref(false);

const logoTitle = ref()

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
    animateGetStarted()
    localStorage.setItem("isNotNewUser", "true")
}

function addKanban() {
    let kanbansLength = kanbans.length;
    let kanban = kanbans[kanbansLength - 1];
    let id = (kanban) ? kanban.id + 1 : 0;
    kanbans.push({
        id: id,
        title: "New Kanban",
        isNew: true
    });
    // showNewItem.value = false;
    // disableNewItemTransition.value = true;
}

function addMouseLeft() {
    showNewItem.value = false;
}

function addMouseEnter() {
    // if (!kanbans.find((p) => p.isNew)) {
    // disableNewItemTransition.value = false;
    showNewItem.value = true;
    // }
}

function kanbanDeleted(kanban: Kanban) {
    let toDelete = kanbans.findIndex((p) => p.id == kanban.id)
    if (toDelete >= 0) {
        kanbans.splice(toDelete, 1)
    }
}

function kanbanEdited(kanban: Kanban) {
    let index = kanbans.findIndex((p) => p.id === kanban.id)
    if (index >= 0) {
        kanbans[index] = kanban;
    }
}

onMounted(() => {
    let isNotNewUser = localStorage.getItem("isNotNewUser")
    if (isNotNewUser != null) {
        // started.value = isNotNewUser === "true";
    }
    nextTick(() => {
        openingAnimation()
    })
});



</script>

<template>
    <div class="kanban-list-main">
        <div class="kanban-tool">
            <div class="kanban-tool__logo">
                <div>
                    <h1 ref="logoTitle">Kanban</h1>
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
        <div class="kanban-select-body">
            <KanbanItem v-for="kanban in kanbans" :kanban="kanban" :key="kanban.id" @edited="kanbanEdited"
                @deleted="kanbanDeleted" />
            <div class="kanban-add-item"
                :class="{ 'transition-none': disableNewItemTransition, 'opacity-1': showNewItem }">
                <h3>New Kanban</h3>
            </div>
        </div>
    </div>
</template>

<style>
.kanban-add-item.opacity-1 {
    opacity: 1;
}

.kanban-add-item.transition-none {
    transition: none;
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