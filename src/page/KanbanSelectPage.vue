<script lang="ts" setup>
import KanbanItem from '@/components/KanbanItem.vue';
import HugeBottomLight from '@/components/HugeBottomLight.vue';
import { openingAnimation } from '@/animation/animations'
import { Flip } from 'gsap/Flip';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import KanbanHeader from '@/components/KanbanHeader.vue';

interface Kanban {
    id: number,
    title: string,
    isNew: boolean
}

const showNewItem = ref(false);
const disableNewItemTransition = ref(false);


const kanbans = reactive([
    {
        id: 0,
        title: 'First Kanban',
        isNew: false
    },
    {
        id: 1,
        title: 'Second Kanban',
        isNew: false
    }
])

function stopEditingKanbanTitle(){
    const lastKanban = kanbans[kanbans.length - 1]
    if(lastKanban && lastKanban.isNew){
        lastKanban.isNew = false;
    }    
}

function addKanban() {
    stopEditingKanbanTitle()
    let kanbansLength = kanbans.length;
    let kanban = kanbans[kanbansLength - 1];
    let id = (kanban) ? kanban.id + 1 : 0;
    kanbans.push({
        id: id,
        title: `Kanban №${id + 1}`,
        isNew: true
    });
}



function kanbanDeleted(kanban: Kanban) {
    let toDelete = kanbans.findIndex((p) => p.id == kanban.id)
    if (toDelete >= 0) {
        kanbans.splice(toDelete, 1)
    }
}

function kanbanEdited(kanban: Kanban) {
    let index = kanbans.findIndex((p) => p.id === kanban.id)
    if (index >= 0) {
        kanbans[index] = kanban;
    }
}

onMounted(() => {
    //TODO: add will be disabled after first  
    
});

</script>

<template>
    <div class="select-tools">
        <button class="btn" @click="addKanban">Add kanban</button>
    </div>
    <KanbanItem v-for="kanban in kanbans" :kanban="kanban" :key="kanban.id" @edited="kanbanEdited"
        @deleted="kanbanDeleted" />
    <!-- <div class="kanban-add-item" :class="{ 'transition-none': disableNewItemTransition, 'opacity-1': showNewItem }">
        <h3>Add new Kanban</h3>
    </div> -->

</template>

<style>
.select-tools{
    padding: 1.0rem 0;
    display: flex;
}
</style>