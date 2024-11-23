<script lang="ts" setup>
import { dragStateKey } from '@/keys/InjectionKeys';
import type { KanbanTask } from '@/store/KanbanTasksStore';
import { inject, onUpdated, reactive, ref, useTemplateRef, watch } from 'vue';

const { task, row } = defineProps<{
    task: KanbanTask
    row: number
}>()
const dragState = inject(dragStateKey)


const id = ref('')
const taskRef = useTemplateRef('taskRef')
const disablePe = ref(false)

const styles = reactive({
    translate: '',
    transition: 'none',
    position: 'inherit',
    gridArea: `${row} / 1 / ${row} / 1`,
    zIndex: '0'
})


let mouseCoords = {
    x: 0,
    y: 0
}
function mouseMoveGlobal(event: MouseEvent) {
    if (!dragState || dragState.task === null)
        return
    if (!task)
        return
    if (task.id === dragState.task.id) {
        const x = event.x - mouseCoords.x;
        const y = event.y - mouseCoords.y;
        styles.transition = 'none'
        styles.translate = `${x}px ${y}px`
    }
}


function mouseUp(event: MouseEvent) {
    if (!dragState || dragState.task === null)
        return
    if (!task)
        return
    if (task.id === dragState.task.id) {
        styles.transition = '0.5s'
        styles.translate = '0'

        dragState.task = null
        dragState.element = null

        disablePe.value = false

        styles.position = 'relative'
        styles.zIndex = '0'

        id.value = ''

        window.removeEventListener("mousemove", mouseMoveGlobal)
        window.removeEventListener("mouseup", mouseUp)
    }
}

function mouseDown(event: MouseEvent) {
    mouseCoords.x = event.x
    mouseCoords.y = event.y
    // - (taskRef.value?.offsetTop ?? 0)

    const x = event.x - mouseCoords.x;
    const y = event.y - mouseCoords.y;

    if (dragState) {
        dragState.task = task
        dragState.element = taskRef.value
    }
    disablePe.value = true

    styles.position = 'absolute'
    styles.zIndex = '2'
    styles.translate = `${x}px ${y}px`

    id.value = 'dragging-task'

    window.addEventListener("mousemove", mouseMoveGlobal, true)
    window.addEventListener("mouseup", mouseUp)
}

watch(() => row, (newValue) => {
    if (newValue !== null) {
        styles.gridArea = `${newValue} / 1 / ${newValue} / 1`
    }
})

</script>

<template>
    <Teleport to=".tasks-col-body">

    </Teleport>
    <div class="kn-task">

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