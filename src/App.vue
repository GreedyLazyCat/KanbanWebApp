<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import { animateGetStarted, openingAnimation } from '@/animation/animations'
import KanbanHeader from './components/KanbanHeader.vue';
import HugeBottomLight from './components/HugeBottomLight.vue';

const started = ref(false)

function start() {
  started.value = true;
  animateGetStarted(1)
  localStorage.setItem("isNotNewUser", "true")
}

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
  nextTick(() => {
    // animateGetStarted(0)
    openingAnimation(1)
  })
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