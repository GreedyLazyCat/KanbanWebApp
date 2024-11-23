<script lang="ts" setup>
import { useKanbanStore } from '@/store/KanbanStore';
import { computed, onMounted, provide, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TasksColumn from '@/components/TasksColumn.vue';
import { dragStateKey } from '@/keys/InjectionKeys';
import { useKanbanTasksStore } from '@/store/KanbanTasksStore';

library.add(faPlus)

const kanbanStore = useKanbanStore()
const kanbanTasksStore = useKanbanTasksStore()
const route = useRoute()


const kanban = computed(() => {
    const id = Number(route.params.index)
    return kanbanStore.kanbans.find((p) => p.id === id)
})

const todoTasks = computed(() => {
    const getToDoTasks = kanbanTasksStore.getTodoByKanban
    if (!kanban.value) {
        return []
    }
    return getToDoTasks(kanban.value?.id)
})
const InProgressTasks = computed(() => {
    const getter = kanbanTasksStore.getInProgressByKanban
    if (!kanban.value) {
        return []
    }
    return getter(kanban.value?.id)
})
const underReviewTasks = computed(() => {
    const getter = kanbanTasksStore.getUnderReviewByKanban
    if (!kanban.value) {
        return []
    }
    return getter(kanban.value?.id)
})
const doneTasks = computed(() => {
    const getter = kanbanTasksStore.getDoneByKanban
    if (!kanban.value) {
        return []
    }
    return getter(kanban.value?.id)
})
provide(dragStateKey, reactive({
    task: null,
    element: null
}))
</script>

<template>
    <div class="tasks-main">
        <div class="tasks-header">
            <h3>{{ kanban?.title }}</h3>
        </div>
        <div class="tasks-body">
            <TasksColumn :tasks="todoTasks" label-type="todo" label-text="To Do"></TasksColumn>
            <TasksColumn :tasks="InProgressTasks" label-type="in-progress" label-text="Work in progress"></TasksColumn>
            <TasksColumn :tasks="underReviewTasks" label-type="under-review" label-text="Under review"></TasksColumn>
            <TasksColumn :tasks="doneTasks" label-type="done" label-text="Done"></TasksColumn>
        </div>
    </div>
</template>

<style>
.tasks-main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.tasks-header h3 {
    margin: 0;
    margin-top: 0.5rem;
    margin-left: 1rem;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.477);
}

.tasks-header {
    display: flex;
    align-items: center;
    flex-basis: 5%;
}

.tasks-body {
    display: flex;
    /* flex-direction: column; */
    flex-basis: 95%;
}

.hover-add {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    /* overflow: hidden; */
    transition: 0.5s ease;
}

.hover-add>svg {
    flex-basis: 100%;
    transition: 0.5s ease;
}

.hover-add:hover>svg {
    /* width: 7rem; */
    flex-basis: 10%;
}

.hover-add::after {
    display: block;
    content: 'Add';
    text-align: center;
    flex-basis: 0%;
    overflow: hidden;
    transition: 0.5s ease;
    width: 0;
}

.hover-add:hover::after {
    width: 100%;
    flex-basis: 90%;
}
</style>