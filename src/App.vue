<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { animateGetStarted, openingAnimation } from '@/animation/animations'
import KanbanHeader from './components/KanbanHeader.vue';
import HugeBottomLight from './components/HugeBottomLight.vue';
import { useKanbanStore } from './store/KanbanStore';

interface Kanban {
  id: number,
  title: string,
  isNew: boolean
}
const started = ref(false)
const kanbanStore = useKanbanStore()

function start() {
  started.value = true;
  animateGetStarted(1)
  localStorage.setItem("isNotNewUser", "true")
}

function loadKanbans() {
  const savedKanbans = localStorage.getItem("kanbans")
  if (savedKanbans) {
    const parsedKanbans = JSON.parse(savedKanbans) as Kanban[]
    kanbanStore.setKanbans(parsedKanbans)
  }
}


onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
  nextTick(() => {
    // animateGetStarted(0)
    openingAnimation(1)
  })
  loadKanbans()

  const dateFromStorage = localStorage.getItem("lastVisit")
  if (dateFromStorage) {
    const lastVisitDate = new Date(dateFromStorage)
    const hoursPassed = (Date.now() - lastVisitDate.getTime()) / 1000 / 60 / 60
    if (hoursPassed > 24) {
      //TODO: show getstarted animation
    }
  }

});
</script>

<template>
  <div class="kanban-main">
    <HugeBottomLight :moveToSides="started"></HugeBottomLight>
    <KanbanHeader :getStartedClick="start" />
    <div class="kanban-body">
      <RouterView />
    </div>
  </div>

</template>