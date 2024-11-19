<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Task from '@/components/Task.vue';
import type { KanbanTask } from '@/store/KanbanTasksStore';
import { computed, inject, onMounted, ref, useTemplateRef } from 'vue';
import { dragStateKey } from '@/keys/InjectionKeys';

const { labelText, labelType, tasks } = defineProps({
    labelText: String,
    /** @type {('todo'|'done'|'in-progress'|'under-review')} */
    labelType: String,
    tasks: Array
})

const colTasks = tasks as KanbanTask[]
const taskBody = useTemplateRef("taskBody")
const insertionIndex = ref(-1)

const dragState = inject(dragStateKey)

function findMaxInsertionIndex(bodyChildren: HTMLCollection, y: number): number {
    let maxTop = y
    let index = -1

    for (let i = 0; i < bodyChildren.length; i++) {
        const element = bodyChildren[i]

        if (!element.classList.contains('kn-task'))
            continue
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + (rect.height / 2)
        if (elementTop > maxTop) {
            maxTop = elementTop
            index = i
            break
        }

    }
    return index
}

function mouseMove(event: MouseEvent) {
    console.log(labelType)
    if (dragState == null || dragState.taskId === null)
        return
    
    if (!taskBody.value)
        return
    if (colTasks.findIndex((p) => p.id === dragState.taskId) != -1) {
        return
    }
    const bodyChildren = taskBody.value.children

    if (bodyChildren.length === 0)
        return

    insertionIndex.value = findMaxInsertionIndex(bodyChildren, event.y)

}

</script>


<template>
    <div class="tasks-col" @mousemove="mouseMove" >
        <div class="tasks-col-header">
            <div class="tasks-col-label" :class="labelType">
                {{ labelText }}
            </div>
            <button class="icon-btn ">
                <font-awesome-icon icon="plus" />
            </button>
        </div>
        <div class="tasks-col-body" ref="taskBody">
            <template v-for="(task, index) in colTasks">
                <div class="fake-task" v-if="insertionIndex === index"></div>
                <Task :task-obj="task"></Task>
            </template>
        </div>
    </div>
</template>

<style>
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
    flex-basis: 5%;
    padding: 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.tasks-col-label {
    padding: 0.2rem 0.5rem;
    width: fit-content;
    font-weight: 700;
    border-radius: 5px;
}

.todo {
    background-color: aqua;
    color: rgb(0, 80, 80);
}

.done {
    background-color: rgb(132, 255, 132);
    color: green;
}

.in-progress {
    background-color: indianred;
    color: rgb(114, 28, 0);
}

.under-review {
    background-color: rgb(255, 222, 112);
    color: rgb(138, 106, 0);
}

.tasks-col-body {
    flex-basis: 95%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 0.5rem;
    padding-bottom: 0.5rem;
}

.task-col__content {
    flex-basis: 90%;
}

.fake-task {
    width: 100%;
    height: 100px;
    background-color: green;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>