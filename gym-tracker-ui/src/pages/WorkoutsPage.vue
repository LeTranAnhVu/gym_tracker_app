<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'

function n(num: number, len = 2) {
    return `${num}`.padStart(len, '0')
}

const note = ref('')
const date = ref('15/07/2024')
const countSeconds = ref(0)
const countMinutes = ref(0)
const countHours = ref(0)
const duration = computed(() => {
    return `${n(countHours.value)}:${n(countMinutes.value)}:${n(countSeconds.value)}`
})

const interval = setInterval(() => {
    countSeconds.value++
    if (countSeconds.value === 60) {
        countSeconds.value = 0
        countMinutes.value++
    }
    if (countMinutes.value === 60) {
        countMinutes.value = 0
        countHours.value++
    }
}, 1000)
const floatingHeight = ref(0)
const currentHeight = ref(0)
const openAddWorkout = () => {
    currentHeight.value = 100
    floatingHeight.value = 100
}
const closeAddWorkout = () => {
    floatingHeight.value = 0
}

const changeHeight = ({ height }: { height: number }) => {
    currentHeight.value = height
}

onBeforeUnmount(() => {
    clearInterval(interval)
})
</script>
<template>
    <div class="pt-5 px-5">
        <div class="pb-5">
            <van-nav-bar title="GymLog" left-text="Back" left-arrow @click-left="() => console.log('back')">
                <template #left>
                    <van-button
                        round
                        :style="{ height: '50px', width: '50px', background: 'var(--color-bg-secondary)' }"
                        icon="arrow-left"
                    ></van-button>
                </template>
                <template #title>
                    <h1 class="text-4xl">Workouts</h1>
                </template>
            </van-nav-bar>
        </div>
        <div class="flex flex-col gap-3">
            <van-cell-group inset :style="{ margin: 0 }">
                <van-field v-model="duration" label="Duration" readonly />
                <van-field v-model="date" label="Date" readonly />
                <van-field v-model="note" type="textarea" placeholder="Note ..." rows="2" autosize />
            </van-cell-group>
            <van-button
                type="primary"
                icon="plus"
                size="large"
                :style="{ borderRadius: '10px' }"
                @click="openAddWorkout"
            ></van-button>

            <!-- list -->
            <div v-for="(_, i) in new Array(5)" :key="i" class="card rounded-xl p-5 bg-neutral-1">
                <div class="header flex flex-nowrap items-center justify-between">
                    <p class="title text-2xl font-regular">Bench Press (Upper)</p>
                    <p class="meta text-sm italic font-light bg-accent-2 rounded-full px-3">15/07/24</p>
                </div>
                <div class="body mt-2 flex flex-wrap font-light">
                    <p class="w-[50%] text-sm mb-2">Weight: <span>12 | 14 | 16 | 18</span></p>
                    <p class="w-[50%] text-sm mb-2">Arg reps: <span>9 | 10 | 5.4 | 5</span></p>
                    <p class="w-[50%] text-sm mb-2">Sets: <span>3 | 4 | 5 | 4</span></p>
                </div>
                <p>
                    Note:
                    <span
                        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text e
                    </span>
                </p>
            </div>

            <van-floating-panel :anchors="[floatingHeight, 900 * 0.8]" @height-change="changeHeight">
                <template #header>
                    <div class="flex items-center justify-center p-5 relative rounded-t-lg bg-gray-200">
                        <div class="van-floating-panel__header-bar"></div>
                        <van-button
                            v-if="currentHeight === 100"
                            icon="cross"
                            round
                            :style="{ right: '5px', position: 'absolute', background: 'none', border: 'none' }"
                            @click="closeAddWorkout"
                        ></van-button>
                    </div>
                </template>
                <van-cell-group>
                    <van-cell v-for="i in 26" :key="i" :title="String.fromCharCode(i + 64)" size="large" />
                    />
                </van-cell-group>
            </van-floating-panel>
        </div>
    </div>
</template>
<style scoped></style>
