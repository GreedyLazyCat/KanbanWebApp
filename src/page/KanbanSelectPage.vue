<script lang="ts" setup>
import KanbanItem from '@/components/KanbanItem.vue';
import { useKanbanStore } from '@/store/KanbanStore';
import { onMounted, reactive, ref, watch } from 'vue';


interface Kanban {
    id: number,
    title: string,
    isNew: boolean
}
const kanbansStore = useKanbanStore()


function stopEditingKanbanTitle() {
    const lastKanban = kanbansStore.kanbans[kanbansStore.kanbans.length - 1]
    if (lastKanban && lastKanban.isNew) {
        lastKanban.isNew = false;
    }
}

function addKanban() {
    stopEditingKanbanTitle()
    let kanbansLength = kanbansStore.kanbans.length;
    let kanban = kanbansStore.kanbans[kanbansLength - 1];
    let id = (kanban) ? kanban.id + 1 : 0;
    kanbansStore.addKanban({
        id: id,
        title: `Kanban №${id + 1}`,
        isNew: true
    })
}



function kanbanDeleted(kanban: Kanban) {
    kanbansStore.deleteKanban(kanban)
}

function kanbanEdited(kanban: Kanban) {
    kanbansStore.editKanban(kanban)
}

onMounted(() => {
    
});

</script>

<template>
    <div class="select-tools">
        <button class="btn" @click="addKanban">Add kanban</button>
    </div>
    <KanbanItem v-for="kanban in kanbansStore.kanbans" :kanban="kanban" :key="kanban.id" @edited="kanbanEdited"
        @deleted="kanbanDeleted" />
    <!-- <div class="kanban-add-item" :class="{ 'transition-none': disableNewItemTransition, 'opacity-1': showNewItem }">
        <h3>Add new Kanban</h3>
    </div> -->

</template>

<style>
.select-tools {
    padding: 1.0rem 0;
    display: flex;
}
</style>