<script lang="ts" setup>
import { dragStateKey } from '@/keys/InjectionKeys';
import type { KanbanTask } from '@/store/KanbanTasksStore';
import { inject, reactive, ref, useTemplateRef } from 'vue';

const { taskObj } = defineProps({
    taskObj: Object
})
const dragState = inject(dragStateKey)

const task = taskObj as KanbanTask
const id = ref('')

const styles = reactive({
    translate: '',
    transition: 'none',
    position: 'inherit',
})

const taskRef = useTemplateRef('taskRef')
const disablePe = ref(false)

let mouseCoords = {
    x: 0,
    y: 0
}
function mouseMoveGlobal(event: MouseEvent) {
    if (!dragState)
        return
    if (!task)
        return
    if (task.id === dragState.taskId) {
        const x = event.x - mouseCoords.x;
        const y = event.y - mouseCoords.y;
        styles.transition = 'none'
        styles.translate = `${x}px ${y}px`
    }
}


function mouseUp(event: MouseEvent) {
    if (!dragState)
        return
    if (!task)
        return
    if (task.id === dragState.taskId) {
        styles.transition = '0.5s'
        styles.translate = '0'

        dragState.taskId = null
        dragState.element = null

        disablePe.value = false

        styles.position = 'relative'

        id.value = ''

        window.removeEventListener("mousemove", mouseMoveGlobal)
        window.removeEventListener("mouseup", mouseUp)
    }
}

function mouseDown(event: MouseEvent) {
    mouseCoords.x = event.x
    mouseCoords.y = event.y - (taskRef.value?.offsetTop ?? 0)
    
    const x = event.x - mouseCoords.x;
    const y = event.y - mouseCoords.y;
   
    if (dragState) {
        dragState.taskId = task.id
        dragState.element = taskRef.value
    }
    disablePe.value = true

    styles.position = 'absolute'
    styles.translate = `${x}px ${y}px`

    id.value = 'dragging-task'

    window.addEventListener("mousemove", mouseMoveGlobal, true)
    window.addEventListener("mouseup", mouseUp)
}

</script>

<template>
    <div class="kn-task" :id="id" ref="taskRef" :class="{ 'disable-pe': disablePe }" :style="styles"
        @mousedown.prevent="mouseDown">
        <slot></slot>
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
}

.disable-pe {
    pointer-events: none;
}
</style>