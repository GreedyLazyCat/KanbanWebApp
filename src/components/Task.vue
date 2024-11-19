<script lang="ts" setup>
import { dragStateKey } from '@/keys/InjectionKeys';
import type { KanbanTask } from '@/store/KanbanTasksStore';
import { inject, reactive, ref, useTemplateRef } from 'vue';

const { taskObj } = defineProps({
    taskObj: Object
})
const dragState = inject(dragStateKey)

const task = taskObj as KanbanTask

const styles = reactive({
    translate: '',
    transition: 'none'
})
const taskRef = useTemplateRef('taskRef')

let mouseCoords = {
    x: 0,
    y: 0
}

function mouseMoveLocal(event:MouseEvent){
    // if(dragState && dragState.element === taskRef.value)
        // event.stopPropagation()
}

function mouseMoveGlobal(event: MouseEvent) {
    if (!dragState)
        return
    if (!task)
        return
    if (task.id === dragState.taskId) {
        const x = event.x - mouseCoords.x;
        const y = event.y - mouseCoords.y;
        // console.log(x, y)
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
        window.removeEventListener("mousemove", mouseMoveGlobal)
        window.removeEventListener("mouseup", mouseUp)
    }
}

function mouseDown(event: MouseEvent) {
    mouseCoords.x = event.x
    mouseCoords.y = event.y
    if (dragState) {
        dragState.taskId = task.id
        dragState.element = taskRef.value
    }
    window.addEventListener("mousemove", mouseMoveGlobal, true)
    window.addEventListener("mouseup", mouseUp)
}

</script>

<template>
    <div class="kn-task" ref="taskRef" @mousemove="mouseMoveLocal" :style="styles" @mousedown.prevent="mouseDown"></div>
</template>

<style>
.kn-task {
    width: 100%;
    height: 100px;
    background-color: red;
    border-radius: 5px;
    box-sizing: border-box;
}
</style>