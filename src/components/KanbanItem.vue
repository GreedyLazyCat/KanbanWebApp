<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['deleted', 'edited'])
const router = useRouter()

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

function deleteKanban() {
    emit('deleted', kanban)
}

function openKanban() {
    router.push(`/${kanban.id}`)
}

function toggleTitleEditing() {
    titleEditing.value = !titleEditing.value
    if (titleEditing.value) {
        nextTick(() => {
            focusInput()
        })
    } else {
        emit('edited', {
            id: kanban.id,
            title: inputValue.value,
            isNew: false
        })
    }
}

watch(() => kanban.isNew, (newValue) => {
    if(!newValue){
        titleEditing.value = false;
    }
})

onMounted(() => {
    focusInput()
});

</script>

<template>
    <div class="kanban-item" :class="{ 'new-item-animation': kanban.isNew }" @click="openKanban">
        <input v-if="titleEditing" ref="titleInput" type="text" name="" class="kanban-title-edit"
            @keyup.enter="toggleTitleEditing" :placeholder="kanban.title" v-model="inputValue">
        <h3 v-else @dblclick="toggleTitleEditing">{{ inputValue }}</h3>
        <div class="kanban-item__ctrls">
            <button class="btn" @click.stop="toggleTitleEditing">{{ editButtonText }}</button>
            <button class="btn" @click.stop="deleteKanban">Delete</button>
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

.new-item-animation {
    animation: newKanbanItem 1s forwards;
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

@keyframes newKanbanItem {
    0% {

        background-color: #38ad5b;
    }

    100% {
        background-color: var(--card-bg);
    }
}
</style>