<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Task from '@/components/Task.vue';
import { useKanbanTasksStore, type KanbanTask } from '@/store/KanbanTasksStore';
import { computed, inject, onMounted, ref, useTemplateRef, watch } from 'vue';
import { dragStateKey } from '@/keys/InjectionKeys';

const { labelText, labelType, tasks } = defineProps({
    labelText: String,
    /** @type {('todo'|'done'|'in-progress'|'under-review')} */
    labelType: String,
    tasks: Array
})

const colTasks = tasks as KanbanTask[]
const taskStore = useKanbanTasksStore()

const taskBody = useTemplateRef("taskBody")
const insertionIndex = ref(-1)
const insertLastBottom = computed(() => dragState?.taskId != null && insertionIndex.value === (colTasks.length))
let draggingFromThisCol = false

const dragState = inject(dragStateKey, {
    taskId: null,
    element: null
})

//TO REWORK
function findMaxInsertionIndex(bodyChildren: HTMLCollection, y: number): number {
    if (bodyChildren.length === 1 || bodyChildren.length === 0)
        return 0
    let maxTop = y
    let index = 0
    let temp = 0

    for (let i = 0; i < bodyChildren.length; i++) {
        const element = bodyChildren[i]

        if (!element.classList.contains('kn-task'))
            continue
        if (element == dragState.element) {
            index += 1
            continue
        }
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + (rect.height / 2)

        if (elementTop > maxTop) {
            maxTop = elementTop
            break
        }

        index += 1
    }

    return index
}

function mouseMove(event: MouseEvent) {
    if (dragState.taskId === null)
        return
    if (!taskBody.value)
        return
    const bodyChildren = taskBody.value.children
    
    //wtf i dont why assining index(which is 0) turns insertionIndex.value into 1
    //and why Math.abs helps
    insertionIndex.value = Math.abs(findMaxInsertionIndex(bodyChildren, event.y))
}

//ToDo
function mouseUp(event: MouseEvent) {
    insertionIndex.value = -1
}

watch(() => dragState?.taskId, (newValue) => {
    if (newValue == null) {
        draggingFromThisCol = false
    }
    else if (colTasks.findIndex((p) => p.id === dragState.taskId) != -1) {
        draggingFromThisCol = true
    }
})


</script>


<template>
    <div class="tasks-col" @mousemove="mouseMove" @mouseleave="insertionIndex = -1" @mouseup="mouseUp">
        <div class="tasks-col-header">
            <div class="tasks-col-label" :class="labelType">
                {{ labelText }}
            </div>
            <button class="icon-btn ">
                <font-awesome-icon icon="plus" />
            </button>
        </div>
        <div class="tasks-col-body" ref="taskBody">
            <template v-for="(task, i) in colTasks" :key="i">
                <div class="fake-task" v-if="insertionIndex === i"></div>
                <Task :task-obj="task">{{ task.id }}</Task>
            </template>
            <div class="fake-task" v-if="insertLastBottom"></div>
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
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content;
    grid-auto-rows: min-content;
    gap: 1rem;
    padding: 0 5px;
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
    animation: growHeight 0.2s forwards;
}

@keyframes growHeight {
    0% {
        height: 0px;
    }

    100% {
        height: 100px;
    }
}
</style>