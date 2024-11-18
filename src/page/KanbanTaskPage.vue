<script lang="ts" setup>
import { useKanbanStore } from '@/store/KanbanStore';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus)

const kanbanStore = useKanbanStore()
const route = useRoute()


const kanban = computed(() => {
    const id = Number(route.params.index)
    return kanbanStore.kanbans.find((p) => p.id === id)
})

onMounted(() => {
    // console.log(kanban.value)
    // console.log(kanbanStore.kanbans)
})

</script>

<template>
    <div class="tasks-main">
        <div class="tasks-header">
            <h3>{{ kanban?.title }}</h3>
        </div>
        <div class="tasks-body">
            <div class="tasks-col" v-for="n in 4">
                <div class="tasks-col-header">
                    <div class="tasks-col-label">
                        To Do
                    </div>
                    <button class="icon-btn ">
                        <font-awesome-icon icon="plus" />
                    </button>
                </div>
                <div class="tasks-col-body">
                </div>
            </div>
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
    flex-basis: 10%;
}

.tasks-body {
    display: flex;
    /* flex-direction: column; */
    flex-basis: 90%;
}

.tasks-col {
    /* flex-grow: 1; */
    flex-basis: 25%;
    margin: 0.6rem 0.3rem;
    background-color: var(--card-bg);
    border-radius: 5px;
    border: 1px solid var(--card-border);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.tasks-col-header {
    flex-basis: 10%;
    padding: 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.tasks-col-label {
    padding: 0.2rem 0.5rem;
    width: fit-content;
    background-color: rgb(132, 255, 132);
    color: green;
    font-weight: 700;
    border-radius: 5px;
}

.tasks-col-body {
    flex-basis: 90%;
    display: flex;
    flex-direction: column;
}

.task-col__content {
    flex-basis: 90%;
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