<script lang="ts" setup>
import { ref, toRefs } from 'vue'
export type StepperItem = {
    unit: string
    value: number
}

type Props = {
    stepper: StepperItem
    left: StepperItem
    right: StepperItem
}

const props = defineProps<Props>()
function decrease() {
    props.stepper.value -= 0.5
}
function increase() {
    props.stepper.value += 0.5
}
const { stepper } = toRefs(props)
</script>

<template>
    <div class="stepper-item">
        <div class="counter flex flex-nowrap gap-1 items-end justify-center">
            <van-button class="stepper-button" plain round icon="minus" @click="decrease"></van-button>
            <p class="text-8xl w-[240px] text-center">{{ stepper.value }}</p>
            <van-button class="stepper-button" plain round icon="plus" @click="increase"></van-button>
        </div>
        <div class="info flex flex-nowrap grow gap-1 items-end justify-center text-center mt-5">
            <div class="left w-[30%] font-thin">
                <p v-if="left">{{ left.value }} {{ left.unit }}</p>
            </div>
            <div class="middle">
                <p class="text-5xl font-light">{{ stepper.unit }}</p>
            </div>
            <div class="right w-[30%] font-thin">
                <p v-if="right">{{ right.value }} {{ right.unit }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.stepper-button {
    @apply w-[50px] h-[50px] rounded-full text-4xl font-semibold border-none;
}
</style>
