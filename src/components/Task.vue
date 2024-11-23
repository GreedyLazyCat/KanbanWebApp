<script lang="ts" setup>
import { dragStateKey } from '@/keys/InjectionKeys';
import type { KanbanTask } from '@/store/KanbanTasksStore';
import { inject, onUpdated, reactive, ref, useTemplateRef, watch } from 'vue';

const { task, row } = defineProps<{
    task: KanbanTask
    row: number
}>()
const dragState = inject(dragStateKey)

const taskRef = useTemplateRef('taskRef')

const taskGridArea = ref(`${row} / 1 / ${row} / 1`,)
const dragging = ref(false)
const draggingStyles = reactive({
    position: 'absolute',
    left: '0',
    top: '0',
    width: '',
    pointerEvents: 'none'
})


let clickRelativeCoords = {
    x: 0,
    y: 0
}

function mouseMoveGlobal(event: MouseEvent) {
    if (!dragState || dragState.task === null)
        return
    if (!task)
        return
    if (task.id === dragState.task.id) {
        writeCoordsToDragStyle(event)
    }
}


function mouseUp(event: MouseEvent) {
    if (!dragState || dragState.task === null)
        return
    if (!task)
        return
    if (task.id === dragState.task.id) {
        dragging.value = false

        dragState.element = null
        dragState.task = null

        window.removeEventListener("mousemove", mouseMoveGlobal)
        window.removeEventListener("mouseup", mouseUp)
    }
}

// function write

function writeCoordsToDragStyle(event: MouseEvent) {
    draggingStyles.left = `${event.x - clickRelativeCoords.x}px`
    draggingStyles.top = `${event.y - clickRelativeCoords.y}px`
}

function mouseDown(event: MouseEvent) {
    if (!dragState)
        return
    dragState.element = taskRef.value
    dragState.task = task
    if (taskRef.value) {
        const rect = taskRef.value.getBoundingClientRect()
        draggingStyles.width = `${rect?.width}px`
        clickRelativeCoords.x = event.x - rect.left;
        clickRelativeCoords.y = event.y - rect.top;
        writeCoordsToDragStyle(event)
    }

    dragging.value = true


    window.addEventListener("mousemove", mouseMoveGlobal, true)
    window.addEventListener("mouseup", mouseUp)
}

watch(() => row, (newValue) => {
    if (newValue !== null) {
        taskGridArea.value = `${newValue} / 1 / ${newValue} / 1`
    }
})

</script>

<template>
    <Teleport to="body">
        <div class="kn-task" :style="draggingStyles" v-if="dragging">
            {{ task.id}}
        </div>
    </Teleport>
    <div class="kn-task" :style="{ gridArea: taskGridArea }" v-if="!dragging" ref="taskRef" @mousedown="mouseDown">
        {{ task.id}}
    </div>
</template>

<style>
.kn-task {
    width: 100%;
    height: 100px;
    background-color: red;
    border-radius: 5px;
    box-sizing: border-box;
    z-index: 2;
    color: white;
}

.disable-pe {
    pointer-events: none;
}
</style>