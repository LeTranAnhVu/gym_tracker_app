<script lang="ts" setup>
defineProps<{
    month: string
    day: string
}>()

import { showConfirmDialog } from 'vant'
import { onBeforeUnmount, ref, watch } from 'vue'

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
    <div class="rounded-2xl p-7 flex flex-col gap-5 bg-accent text-neutral-1">
        <div class="flex flex-nowrap items-start">
            <div class="text-5xl font-medium flex flex-col gap-5 justify-center items-center w-[30%]">
                <p>{{ month }}</p>
                <p>{{ day }}</p>
            </div>
            <Timer></Timer>
        </div>
        <div>
            <van-skeleton title :row="2" />
        </div>
    </div>
</template>
