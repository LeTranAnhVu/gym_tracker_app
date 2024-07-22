<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import { useRoute } from 'vue-router'
import { WorkoutDetail } from '../lib/models/WorkoutDetail'
import { useApiFetch } from '../main'
import { Exercise } from '../lib/models/Exercise'
import { pad2 } from '../lib/helpers/pad2'
import { useTimerStore } from '../lib/stores/useTimerStore'

const workoutId = computed(() => Number(useRoute().params.workoutId))
const workout = ref<WorkoutDetail | null>(null)
const assosiatedExercises = ref<Exercise[]>([])
const workoutMonth = computed(() => {
    if (workout.value?.createdAt) {
        return new Date(workout.value.createdAt).toLocaleString('default', { month: 'short' })
    }
    return ''
})

const workoutDay = computed(() => {
    if (workout.value?.createdAt) {
        return pad2(new Date(workout.value.createdAt).getDate())
    }
    return ''
})

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
async function deleteExercise(workoutId: number, id: number) {
    const resp = await useApiFetch(`workouts/${workoutId}/exercises/${id}`).delete()
    if (!resp.error.value) {
        showSuccessToast(`Removed exercise ${id} from workout`)
        await loadData()
    } else {
        showFailToast(`${resp.error.value}`)
    }
}

watch(
    workoutId,
    async () => {
        useTimerStore().workoutId = workoutId.value
        await loadData()
    },
    { immediate: true },
)
</script>
<template>
    <div class="px-5">
        <div class="flex flex-col gap-3">
            <!-- card -->
            <WorkoutMainCard
                class="mt-5"
                :month="workoutMonth"
                :day="workoutDay"
                :workout-id="workoutId"
            ></WorkoutMainCard>
            <van-button
                type="primary"
                icon="plus"
                size="large"
                :style="{ borderRadius: '10px' }"
                @click="openAddWorkout"
                >Add Exercise</van-button
            >

            <div class="flex flex-col gap-5">
                <ExerciseCard
                    v-for="exercise in assosiatedExercises"
                    :key="exercise.id"
                    :exercise="exercise"
                    :workout-id="workoutId"
                    @delete-exercise="deleteExercise"
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
