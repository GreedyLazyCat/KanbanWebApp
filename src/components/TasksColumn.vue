<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Task from '@/components/Task.vue';
import { KanbanTaskType, useKanbanTasksStore, type KanbanTask } from '@/store/KanbanTasksStore';
import { computed, inject, onMounted, ref, useTemplateRef, watch } from 'vue';
import { dragStateKey } from '@/keys/InjectionKeys';
import FakeTask from '@/components/FakeTask.vue';
import KanbanTaskPage from '@/page/KanbanTaskPage.vue';

const { labelText, labelType, tasks } = defineProps({
    labelText: String,
    /** @type {('todo'|'done'|'in-progress'|'under-review')} */
    labelType: String,
    tasks: Array
})

const colTasks = ref(tasks as KanbanTask[])
const taskStore = useKanbanTasksStore()

const taskBody = useTemplateRef("taskBody")
const insertAboveIndex = ref(-1)
const insertLastBottom = computed(() => dragState?.task != null && insertAboveIndex.value === (colTasks.value.length + 1))
const taskCount = computed(() => colTasks.value.length)
let draggingFromThisCol = false

const dragState = inject(dragStateKey, {
    task: null,
    element: null
})

function taskRow(row: number): number {
    if (!dragState || dragState.task === null || insertAboveIndex.value === -1)
        return row
    if (draggingFromThisCol) {
        if (row < dragState.task.row && insertAboveIndex.value <= row)
            return row + 1
        if (row > dragState.task.row && insertAboveIndex.value > row)
            return row - 1
        return row
    }
    if (row >= insertAboveIndex.value) {
        return row + 1
    }

    return row

}

const fakeTaskRow = computed(() => {
    if (draggingFromThisCol)
        return Math.max(1, insertAboveIndex.value - 1)

    return insertAboveIndex.value
})

function findMaxInsertionIndex(bodyChildren: HTMLCollection, y: number): number {
    if (bodyChildren.length === 1 || bodyChildren.length === 0)
        return 1
    let maxTop = y
    let index = 1

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
    if (dragState.task === null)
        return
    if (!taskBody.value)
        return
    const bodyChildren = taskBody.value.children

    //wtf i dont why assining index(which is 0) turns insertionIndex.value into 1
    //and why Math.abs helps
    insertAboveIndex.value = Math.abs(findMaxInsertionIndex(bodyChildren, event.y))
    console.log(`insertion index ${insertAboveIndex.value}`)
}

//ToDo
function mouseUp(event: MouseEvent) {
    if (!dragState || dragState.task === null)
        return
    let type = KanbanTaskType.todo
    switch (labelType) {
        case 'todo':
            type = KanbanTaskType.todo
            break
        case 'in-progress':
            type = KanbanTaskType.inProgress
            break
        case 'under-review':
            type = KanbanTaskType.underReview
            break
        case 'done':
            type = KanbanTaskType.done
            break
    }
    taskStore.updateTaskRow(dragState.task,
        fakeTaskRow.value, type)
    insertAboveIndex.value = -1
}

watch(() => dragState?.task, (newValue) => {
    if (newValue == null) {
        draggingFromThisCol = false
    }
    else if (dragState.task !== null && colTasks.value.indexOf(dragState.task) != -1) {
        draggingFromThisCol = true
    }
})

watch(() => tasks, (newValue) => {
    colTasks.value = tasks as KanbanTask[]
})


</script>


<template>
    <div class="tasks-col" @mousemove="mouseMove" @mouseleave="insertAboveIndex = -1" @mouseup="mouseUp"
        @click="mouseMove">
        <div class="tasks-col-header">
            <div class="tasks-col-label" :class="labelType">
                {{ labelText }}
            </div>
            <button class="icon-btn ">
                <font-awesome-icon icon="plus" />
            </button>
        </div>
        <div class="tasks-col-body" ref="taskBody">
            <template v-for="(task, i) in colTasks" :key="task.id">
                <FakeTask v-if="(insertAboveIndex - 1) === i" :row="fakeTaskRow"></FakeTask>
                <Task :task-obj="task" :row="taskRow(task.row)">{{ task.id }}</Task>
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
</style>