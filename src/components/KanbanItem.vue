<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

const { kanban } = defineProps(['kanban'])

const titleEditing = ref(kanban.isNew)
const titleInput = ref<HTMLInputElement>()
const inputValue = ref(kanban.title)

const editButtonText = computed(() => {
    return (titleEditing.value) ? 'Save ' : 'Rename '
})

function focusInput() {
    if (titleInput.value) {
        titleInput.value.focus();
    }
}

function toggleTitleEditing() {
    titleEditing.value = !titleEditing.value
    if (titleEditing.value) {
        nextTick(() => {
            focusInput()
        })
    }
}

onMounted(() => {
    focusInput()
});

</script>

<template>
    <div class="kanban-item">
        <input v-if="titleEditing" ref="titleInput" type="text" name="" class="kanban-title-edit"
            @keyup.enter="titleEditing = false" :placeholder="kanban.title" v-model="inputValue">
        <h3 v-else>{{ inputValue }}</h3>
        <div class="kanban-item__ctrls">
            <button class="btn" @click="toggleTitleEditing">{{ editButtonText }}</button>
            <button class="btn">Delete</button>
        </div>
    </div>
</template>

<style>
.kanban-item {
    background-color: var(--card-bg);
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 15px;
    border: 1px solid var(--card-border);
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.7rem;
}

.kanban-item>h3 {
    margin: 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.477);
}

.kanban-item__ctrls {
    display: flex;
    gap: 1rem;
}

.kanban-item:hover {
    cursor: pointer;
}

.kanban-title-edit {
    background-color: var(--card-bg);
    border: 1px solid var(--light-txt-color);
    border-radius: 5px;
    color: var(--text-color);
    font-size: 1.2rem;
}
</style>