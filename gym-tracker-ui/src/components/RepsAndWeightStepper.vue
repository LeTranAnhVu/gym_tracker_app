<script lang="ts" setup>
import { ref } from 'vue'
import { StepperItem } from './Stepper.vue'

const steppers = ref<StepperItem[]>([
    { unit: 'Kg', value: 1 },
    { unit: 'Reps', value: 1 },
])
</script>
<template>
    <van-swipe class="my-swipe h-[200px]" :loop="false" indicator-color="var(--color-accent)" lazy-render>
        <van-swipe-item>
            <Stepper :stepper="steppers[0]" :right="steppers[1]"></Stepper>
        </van-swipe-item>
        <van-swipe-item>
            <Stepper :stepper="steppers[1]" :left="steppers[0]"></Stepper>
        </van-swipe-item>
    </van-swipe>
</template>
