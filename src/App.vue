<script setup lang="ts">
import { onMounted } from 'vue';
import KanbanSelectPage from './page/KanbanSelectPage.vue';
import { RouterView } from 'vue-router';
onMounted(() => {
  document.documentElement.setAttribute("data-theme", "dark");
});
</script>

<template>
  <RouterView></RouterView>
</template>