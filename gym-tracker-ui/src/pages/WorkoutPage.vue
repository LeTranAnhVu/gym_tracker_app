<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import AddExercise from '../components/AddExercisePopup.vue'
import { showSuccessToast } from 'vant'
import { useRoute } from 'vue-router'
import { WorkoutDetail } from '../lib/models/WorkoutDetail'
import { useApiFetch } from '../main'
import { Exercise } from '../lib/models/Exercise'

function n(num: number, len = 2) {
    return `${num}`.padStart(len, '0')
}

const workoutId = computed(() => useRoute().params.workoutId)
const workout = ref<WorkoutDetail | null>(null)
const assosiatedExercises = ref<Exercise[]>([])
const note = ref('')
const date = ref(new Date().toISOString().substring(0, 10))
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

const openAddWorkout = () => {
    showAddExercisePopup.value = true
}

const showAddExercisePopup = ref(false)
async function addExercise(id: number) {
    await useApiFetch(`workouts/${workoutId.value}/exercises`).post({ exerciseId: id })
    showAddExercisePopup.value = false
    showSuccessToast('Added')
    await loadData()
}

onBeforeUnmount(() => {
    clearInterval(interval)
})

onMounted(async () => {
    await loadData()
})

async function loadData() {
    if (workoutId.value) {
        // load workout data
        const { data } = await useApiFetch(`workouts/${workoutId.value}`).get().json<WorkoutDetail>()
        workout.value = data.value
        if (workout.value) {
            assosiatedExercises.value = workout.value.exercises.map((e) => e.exercise)
        }
    }
}
</script>
<template>
    <div class="px-5">
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
                >Add Exercise</van-button
            >

            <!-- list -->
            <!-- <ExerciseCardList></ExerciseCardList> -->
            <div class="flex flex-col gap-5">
                <ExerciseCard
                    v-for="exercise in assosiatedExercises"
                    :key="exercise.id"
                    :exercise="exercise"
                ></ExerciseCard>
            </div>

            <AddExercisePopup
                v-model:show="showAddExercisePopup"
                :workout-id="workoutId"
                @add-exercise="addExercise"
            ></AddExercisePopup>
        </div>
    </div>
</template>
<style scoped></style>
