<script lang="ts" setup>

const { getStartedClick } = defineProps(['getStartedClick'])


</script>

<template>
    <div class="kanban-tool">
        <div class="header-bottom-border"></div>
        <div class="kanban-tool__logo">
            <div>
                <h1 ref="logoTitle">Kanban</h1>
                <div class="line-separator"></div>
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" />
            </div>
            <button class="get-started-btn" @click="getStartedClick">Get Started</button>
        </div>
        <div class="kanban-tool__ctrls">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.header-bottom-border{
    position: absolute;
    height: 2px;
    width: 0;
    left: 50%;
    bottom: 0;
    translate: -50% 0;
    opacity: 0.3;
    box-shadow: 0 0 15px 3px #a27bff70;
    background: linear-gradient(270deg, var(--primary)50%, var(--secondary));
}
</style>