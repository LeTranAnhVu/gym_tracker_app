<script lang="ts" setup>
import { toRefs } from 'vue'

export type SideItem = {
    unit: string
    value: number
}

type Props = {
    stepperUnit: string
    left?: SideItem
    right?: SideItem
    step: number
}

const stepperValue = defineModel<number | null>('stepperValue', { required: true })
const props = defineProps<Props>()
const { left, right, step } = toRefs(props)
function decrease() {
    if (stepperValue.value === null) {
        stepperValue.value = 0
    }

    stepperValue.value! -= step.value
}
function increase() {
    if (stepperValue.value === null) {
        stepperValue.value = 0
    }

    stepperValue.value! += step.value
}
</script>

<template>
    <div class="stepper-item">
        <div class="counter flex flex-nowrap gap-1 items-end justify-center">
            <van-button
                class="stepper-button disable-dbl-tap-zoom"
                plain
                round
                icon="minus"
                @click="decrease"
            ></van-button>
            <p class="text-8xl w-[240px] h-[96px] text-center" @click="openNumbKeyboard">{{ stepperValue }}</p>
            <van-button
                class="stepper-button disable-dbl-tap-zoom"
                plain
                round
                icon="plus"
                @click="increase"
            ></van-button>
        </div>
        <div class="info flex flex-nowrap grow gap-1 items-end justify-center text-center mt-5">
            <div class="left w-[30%] font-thin">
                <p v-if="left">{{ left.value }} {{ left.unit }}</p>
            </div>
            <div class="middle">
                <p class="text-5xl font-light">{{ stepperUnit }}</p>
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
