<script setup lang="ts">
import gsap from 'gsap';
import { onMounted, watch } from 'vue';

const { moveToSides } = defineProps(['moveToSides'])

function animateMoveToSides() {
    gsap.to('.second-light-source',
        {
            // bottom: '0%',
            top: '100%',
            translate: '0',
            scale: '2 0.5',
            opacity: '0.5',
            duration: 1,
            ease: 'expo.out'
        }
    )
    gsap.to('.first-light-source',
        {
            bottom: '100%',
            right: '0%',
            translate: '0',
            scale: '2 0.5',
            opacity: '0.5',
            duration: 1,
            ease: 'expo.out'
        }
    )
}

function animateLightUp() {
    gsap.to('.first-light-source',
        {
            boxShadow: '0 0 500px 150px rgba(151, 107, 255, 0.4)',
            duration: 1
        }
    )
    gsap.to('.second-light-source',
        {
            boxShadow: '0 0 500px 150px rgba(56, 173, 91, 0.4)',
            duration: 1
        }
    )
}

onMounted(() => {
    animateLightUp()
})

watch(() => moveToSides, (newValue, oldValue) => {
    if (newValue) {
        animateMoveToSides()
    }
})

</script>

<template>
    <div class="first-light-source"></div>
    <div class="second-light-source"></div>
</template>
<style>
.first-light-source {
    /* z-index: -1; */
    position: absolute;
    bottom: 0;
    /* right: 50%; */
    right: 0;
    /* top: 0; */
    translate: 50% 0;
    background-color: transparent;
    height: 0;
    width: 0;
    border-radius: 40%;
    box-shadow: 0 0 0 0 transparent;
    filter: blur(10px) brightness(0.8);

}

.second-light-source {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    translate: -10rem 50%;
    background-color: transparent;
    height: 0;
    width: 10rem;
    border-radius: 40%;
    box-shadow: 0 0 0 0 transparent;
    filter: blur(10px) brightness(0.8);
}
</style>
