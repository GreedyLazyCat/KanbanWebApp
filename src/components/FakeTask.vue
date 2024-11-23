<script lang="ts" setup>
import { reactive } from 'vue';

const {row} = defineProps({
    row: Number
})

const styles = reactive({
    gridArea: `${row} / 1 / ${row} / 1`
})

</script>

<template>
    <div class="fake-task" :style="styles"></div>
</template>

<style>
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