<script lang="ts" setup>
import { computed } from 'vue'
import { pad2 } from '../lib/helpers/pad2'
import { useTimerStore } from '../lib/stores/useTimerStore'

defineProps<{
    dense: boolean
}>()

const { startCounting, pauseCounting, stopCounting, resetCount } = useTimerStore()
const countHours = computed(() => useTimerStore().countHours)
const countMinutes = computed(() => useTimerStore().countMinutes)
const countSeconds = computed(() => useTimerStore().countSeconds)
const countCentiseconds = computed(() => Math.floor(useTimerStore().countMiliSeconds / 10))
const isCounting = computed(() => useTimerStore().isCounting)
const isFinished = computed(() => useTimerStore().isFinished)
</script>
<template>
    <div v-if="dense" class="flex flex-nowrap gap-10 grow items-center justify-center">
        <span class="relative flex h-3 w-3">
            <span
                v-if="isCounting"
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
            ></span>
            <span
                class="relative inline-flex rounded-full h-3 w-3 bg-accent"
                :class="isCounting ? 'opacity-100' : 'opacity-20'"
            ></span>
        </span>
        <div class="font-light">
            <p class="text-xl font-thin flex flex-nowrap items-end">
                <span class="w-[25px]">{{ pad2(countHours) }}</span>
                <span>:</span>
                <span class="w-[25px]">{{ pad2(countMinutes) }}</span>
                <span>:</span>
                <span class="w-[25px]">{{ pad2(countSeconds) }}</span>
                <span class="text-sm w-[10px] ml-1">{{ pad2(countCentiseconds) }}</span>
            </p>
        </div>
        <div class="flex gap-5">
            <van-button v-if="!isCounting" class="btn sm" icon="play-circle-o" @click="startCounting"></van-button>
            <van-button v-if="isCounting" class="btn sm" icon="pause-circle-o" @click="pauseCounting"></van-button>
            <van-button
                class="btn sm"
                icon="stop-circle-o"
                :disabled="isCounting || isFinished !== false"
                @click="stopCounting"
            ></van-button>
            <van-button class="btn sm" icon="replay" :disabled="isCounting" @click="resetCount"></van-button>
        </div>
    </div>
    <div v-else class="flex gap-5 grow flex-col items-end">
        <div class="text-3xl font-light">
            <p class="text-5xl font-thin flex flex-nowrap items-end">
                <span class="w-[60px]">{{ pad2(countHours) }}</span>
                <span>:</span>
                <span class="w-[60px]">{{ pad2(countMinutes) }}</span>
                <span>:</span>
                <span class="w-[60px]">{{ pad2(countSeconds) }}</span>
                <span class="text-sm w-[10px]">{{ pad2(countCentiseconds) }}</span>
            </p>
        </div>
        <div class="flex gap-4">
            <van-button v-if="!isCounting" class="btn" icon="play-circle-o" @click="() => startCounting()"></van-button>
            <van-button v-if="isCounting" class="btn" icon="pause-circle-o" @click="pauseCounting"></van-button>
            <van-button
                class="btn"
                icon="stop-circle-o"
                :disabled="isCounting || isFinished !== false"
                @click="stopCounting"
            ></van-button>
            <van-button class="btn" icon="replay" :disabled="isCounting" @click="resetCount"></van-button>
        </div>
    </div>
</template>

// TODO move this button to a component
<style scoped>
.btn {
    @apply w-[50px] h-[50px] text-4xl rounded-full font-semibold border-none bg-transparent text-white;
    &.sm {
        @apply w-[30px] h-[30px] text-xl;
    }
}
</style>
