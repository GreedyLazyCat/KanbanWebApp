<script lang="ts" setup>
import { openingAnimation } from '@/animation/animations';
import { onMounted } from 'vue';

</script>

<template>
    <div class="tasks-main">
        <div class="tasks-col" v-for="n in 4">
            <div class="tasks-col-header">
                <div class="tasks-col-label">
                    To Do
                </div>
            </div>
            <div class="tasks-col-body">

            </div>
        </div>
    </div>
</template>

<style>
.tasks-main {
    height: 100%;
    width: 100%;
    display: flex;
    overflow: scroll;
}

.tasks-col {
    flex-grow: 1;
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
}

.tasks-col-body {
    flex-basis: 90%;
}

.tasks-col-label {
    padding: 0.2rem 0.5rem;
    width: fit-content;
    background-color: rgb(132, 255, 132);
    color: green;
    font-weight: 700;
    border-radius: 5px;
}

</style>