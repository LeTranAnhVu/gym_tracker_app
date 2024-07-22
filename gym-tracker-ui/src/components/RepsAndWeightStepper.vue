<script lang="ts" setup>
type Props = {
    weightUnit: string
    repsUnit: string
}

defineProps<Props>()

const weight = defineModel<number | null>('weight')
const reps = defineModel<number | null>('reps')
</script>
<template>
    <van-swipe class="my-swipe h-[200px]" :loop="false" indicator-color="var(--color-accent)" lazy-render>
        <van-swipe-item>
            <Stepper
                v-model:stepper-value="weight"
                :stepper-unit="weightUnit"
                :right="{ unit: repsUnit, value: reps }"
                :step="0.5"
            ></Stepper>
        </van-swipe-item>
        <van-swipe-item>
            <Stepper
                v-model:stepper-value="reps"
                :stepper-unit="repsUnit"
                :left="{ unit: weightUnit, value: weight }"
                :step="1"
            ></Stepper>
        </van-swipe-item>
    </van-swipe>
</template>
