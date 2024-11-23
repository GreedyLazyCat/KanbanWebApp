<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Task from '@/components/Task.vue';
import { KanbanTaskType, useKanbanTasksStore, type KanbanTask } from '@/store/KanbanTasksStore';
import { computed, inject, onMounted, reactive, ref, useTemplateRef, watch } from 'vue';
import { dragStateKey } from '@/keys/InjectionKeys';
import FakeTask from '@/components/FakeTask.vue';
import KanbanTaskPage from '@/page/KanbanTaskPage.vue';

const { labelText, labelType, tasks } = defineProps<{
    labelText: string
    labelType: KanbanTaskType
    tasks: KanbanTask[]
}>()

const dragState = inject(dragStateKey, {
    task: null,
    element: null
})


const taskElements = useTemplateRef("taskElement")
const dragging = ref(false)
const insertionIndex = ref(-1)
const taskRows = reactive(new Map<number, number>())

const labelClass = computed(() => {
    switch (labelType) {
        case KanbanTaskType.todo:
            return "todo"
        case KanbanTaskType.inProgress:
            return "in-progress"
        case KanbanTaskType.underReview:
            return "under-review"
        case KanbanTaskType.done:
            return "done"
    }
})
const fakeTaskRow = computed(() => {
    return insertionIndex.value
})

function taskRow(row: number) {
    if (!dragState || !dragState.task)
        return row
    if (insertionIndex.value === dragState.task?.row)
        return row
    if (row >= insertionIndex.value && insertionIndex.value >= dragState.task.row)
        return row - 1
    if (row <= insertionIndex.value && insertionIndex.value <= dragState.task.row)
        return row + 1
    return row
}
function getInsertionIndex(y: number) {
    if (taskElements.value === null)
        return
    let index = 1
    let maxIndex = -1
    let maxY = y
    for (let taskRef of taskElements.value) {
        if (!taskRef)
            continue
        const taskElement = taskRef.$refs.taskRef
        if (taskElement === dragState.element) {
            // index += 1
            continue
        }
        const rect = taskElement.getBoundingClientRect()
        const elemY = rect.top + rect.height / 2
        if (elemY > maxY)
            break
        index += 1
    }
    return index
}

function mouseMove(event: MouseEvent) {
    if (!dragState || !dragState.task || !dragState.element)
        return
    dragging.value = true
    insertionIndex.value = (getInsertionIndex(event.y) ?? -1)

    console.log(`in ${insertionIndex.value} ftr ${fakeTaskRow.value}`)
}
function mouseLeave(event: MouseEvent) {
    if (!dragState || !dragState.task || !dragState.element)
        return
    dragging.value = false
}
watch(() => dragState.task, (newValue) => {
    if (!newValue) {
        dragging.value = false
        insertionIndex.value = -1
    }
})

watch(insertionIndex, (index) => {
    let i = 1
    console.log(`inde sfjsdf ${index}`)
    for(let key of taskRows.keys()){
        if(dragState.task?.id === key && (index !== -1))
            continue
        taskRows.set(key, i)
        i++
    }
}
)

onMounted(() => {
    for (let task of tasks) {
        taskRows.set(task.id, task.row)
    }
})
</script>


<template>
    <div class="tasks-col" @mousemove="mouseMove" @mouseleave="mouseLeave" @mouseup="dragging = false">
        <div class="tasks-col-header">
            <div class="tasks-col-label" :class="labelClass">
                {{ labelText }}
            </div>
            <button class="icon-btn">
                <font-awesome-icon icon="plus" />
            </button>
        </div>
        <div class="tasks-col-body" ref="taskBody">
            <!-- <FakeTask v-if="dragging" :row="fakeTaskRow" /> -->
            <Task ref="taskElement" v-for="task in tasks" :task="task" :row="taskRows.get(task.id) ?? 0" :key="task.id">
            </Task>
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