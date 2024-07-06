<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useApiFetch } from '../main'
import { showConfirmDialog, showToast } from 'vant'
import router from '../router'
import { Workout } from '../lib/models/Workout'

function pad2(n: number) {
    return n.toString().padStart(2, '0')
}

const newWorkoutName = computed(() => {
    const dateObj = new Date()
    const month = dateObj.getUTCMonth() + 1 // months from 1-12
    const day = dateObj.getUTCDate()
    const year = dateObj.getUTCFullYear()

    return `${pad2(day)}-${pad2(month)}-${year}`
})

const props = defineProps({
    title: String,
})

const selectedWorkout = ref<Workout | null>()
const workouts = ref<Workout[]>([])
const show = ref(false)
const showDetail = ref(false)
onMounted(async () => {
    await loadData()
})

async function loadData() {
    const { data } = await useApiFetch('workouts').get().json<Workout[]>()
    workouts.value = data.value || []
}
function openCreateNewWorkoutPopup() {
    show.value = true
    // router.push({ name: 'workout', params: { workoutId: 1 } })
}

function openWorkoutDetailPopup(workout: Workout) {
    selectedWorkout.value = workout
    showDetail.value = true
}

async function createNewWorkout() {
    const { data } = await useApiFetch('workouts').post({ name: newWorkoutName.value }).json<Workout>()
    if (!data) {
        console.error('Failed to create workout')
        return
    }
    await loadData()
    show.value = false

    showToast({ type: 'success', message: 'Workout created' })
    const ans = await confirmToGoToWorkoutDetail(data.value!)
    if (ans) {
        router.push({ name: 'workout', params: { workoutId: data.value!.id } })
    }
}

async function deleteWorkout(id: number) {
    await useApiFetch(`workouts/${id}`).delete()
    await loadData()
    showDetail.value = false
    showToast({ type: 'success', message: 'Workout deleted' })
}

function confirmToGoToWorkoutDetail(workout: Workout) {
    return new Promise((resolve) => {
        showConfirmDialog({
            title: `Go to workout '${workout.name}' detail?`,
            message: 'Click on confirm to go to workout detail',
        })
            .then(() => {
                resolve(true)
            })
            .catch(() => {
                resolve(false)
            })
    })
}
</script>
<template>
    <div>
        <div class="flex justify-between">
            <h2 class="text-3xl">{{ props.title }}</h2>
            <a class="italic font-extralight" src="#">View all</a>
        </div>
        <div class="flex flex-nowrap gap-3 overflow-x-auto no-scrollbar mt-5">
            <div class="h-[150px] min-w-[130px] w-[130px] rounded-xl flex items-center justify-center">
                <van-button
                    round
                    :style="{ height: '70px', width: '70px', fontSize: '1.5rem', color: '--var(color-accent)' }"
                    type="primary"
                    plain
                    icon="plus"
                    @click="openCreateNewWorkoutPopup"
                ></van-button>
            </div>
            <div
                v-for="(workout, i) in workouts"
                :key="workout.id"
                class="h-[150px] min-w-[130px] w-[130px] rounded-xl py-5 px-2"
                :class="i == 0 ? 'bg-accent' : 'bg-accent-2'"
                @click="openWorkoutDetailPopup(workout)"
            >
                <div class="flex flex-col justify-between h-full" :class="i == 0 ? 'text-white' : ''">
                    <p class="text-xl font-regurlar leading-6">{{ workout.name }}</p>
                    <div class="text-right">
                        <p class="text-lg">5 <span class="text-xs">Exercises</span></p>
                        <p class="text-lg">1 <span class="text-xs">h</span></p>
                        <p class="text-lg">400 <span class="text-xs">Kcal</span></p>
                    </div>
                </div>
            </div>

            <van-popup v-model:show="show" round closeable duration="0.1" :style="{ width: '90%' }">
                <div class="my-5">
                    <h2 class="text-xl text-center">Create Workout</h2>
                    <div class="mt-5">
                        <van-cell-group inset>
                            <van-field
                                v-model="newWorkoutName"
                                disabled
                                label="Name"
                                placeholder="Enter workout name"
                            ></van-field>
                        </van-cell-group>
                    </div>
                    <div class="mt-5 mx-4 flex flex-col gap-1">
                        <van-button type="primary" block @click="createNewWorkout">Save</van-button>
                    </div>
                </div>
            </van-popup>

            <van-popup
                v-if="selectedWorkout"
                v-model:show="showDetail"
                round
                closeable
                duration="0.1"
                :style="{ width: '90%' }"
            >
                <div class="my-5">
                    <h2 class="text-xl text-center">{{ selectedWorkout.name }}</h2>
                    <div class="mt-5 mx-4 flex flex-col gap-1">
                        <van-button
                            type="primary"
                            block
                            @click="router.push({ name: 'workout', params: { workoutId: selectedWorkout.id } })"
                            >Detail</van-button
                        >
                        <van-button type="danger" plain block @click="deleteWorkout(selectedWorkout.id)"
                            >Delete</van-button
                        >
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>
