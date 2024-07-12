<script lang="ts" setup>
import { showConfirmDialog } from 'vant'
import { onBeforeUnmount, ref, watch } from 'vue'
import { pad2 } from '../lib/helpers/pad2'

defineProps<{
    dense: boolean
}>()

// Counter
const countMiliSeconds = ref(0)
const countSeconds = ref(0)
const countMinutes = ref(0)
const countHours = ref(0)

const isCounting = ref(false)
function startCounting() {
    isCounting.value = true
}

let interval: number | null = null

watch(isCounting, (val: boolean) => {
    if (val) {
        interval = setInterval(() => {
            countMiliSeconds.value++
            if (countMiliSeconds.value === 100) {
                countMiliSeconds.value = 0
                countSeconds.value++
            }
            if (countSeconds.value === 60) {
                countSeconds.value = 0
                countMinutes.value++
            }
            if (countMinutes.value === 60) {
                countMinutes.value = 0
                countHours.value++
            }
        }, 10)
    } else {
        if (interval) {
            clearInterval(interval)
        }
    }
})

function pauseCounting() {
    isCounting.value = false
}

async function resetCount() {
    const confirm = await confirmPopup()
    if (confirm) {
        countMiliSeconds.value = 0
        countSeconds.value = 0
        countMinutes.value = 0
        countHours.value = 0
    }
}
function confirmPopup() {
    // open the confirm popup
    return new Promise((resolve, _) => {
        showConfirmDialog({
            title: 'Reset the counter?',
            message: 'It will reset all your the progress in this workout',
        })
            .then(() => {
                // reset the counter
                resolve(true)
            })
            .catch(() => {
                resolve(false)
            })
    })
}

onBeforeUnmount(() => {
    if (interval) {
        clearInterval(interval)
    }
})
</script>
<template>
    <div v-if="dense" class="flex flex-nowrap gap-10 grow items-center justify-center">
        <div class="font-light">
            <p class="text-xl font-thin flex flex-nowrap items-end">
                <span class="w-[25px]">{{ pad2(countHours) }}</span>
                <span>:</span>
                <span class="w-[25px]">{{ pad2(countMinutes) }}</span>
                <span>:</span>
                <span class="w-[25px]">{{ pad2(countSeconds) }}</span>
                <span class="text-sm w-[10px] ml-1">{{ pad2(countMiliSeconds) }}</span>
            </p>
        </div>
        <div class="flex gap-5">
            <van-button v-if="!isCounting" class="btn sm" icon="play-circle-o" @click="startCounting"></van-button>
            <van-button v-if="isCounting" class="btn sm" icon="pause-circle-o" @click="pauseCounting"></van-button>
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
                <span class="text-sm w-[10px]">{{ pad2(countMiliSeconds) }}</span>
            </p>
        </div>
        <div class="flex gap-4">
            <van-button v-if="!isCounting" class="btn" icon="play-circle-o" @click="startCounting"></van-button>
            <van-button v-if="isCounting" class="btn" icon="pause-circle-o" @click="pauseCounting"></van-button>
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
