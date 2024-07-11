<script setup lang="ts">
import { showFailToast, showSuccessToast, showToast } from 'vant'
import { computed, onMounted, ref } from 'vue'
import { useApiFetch } from '../main'
import { useRoute } from 'vue-router'
import { AggregatedExercise } from '../lib/models/AggregatedExercise'
import { transform } from 'typescript'
const note = ref('')
const weight = ref<number | null>(null)
const reps = ref<number | null>(1)
const execiseSets = ref<AggregatedExercise[]>([])
const route = useRoute()
const workoutId = computed(() => route.params.workoutId)
const exerciseId = computed(() => route.params.exerciseId)
const disabled = computed(() => weight.value === null || reps.value === null)
async function createSet() {
    if (weight.value === null || reps.value === null) {
        showToast({ type: 'fail', message: 'Please fill in the weight and reps' })
        return
    }

    const resp = await useApiFetch(`workouts/${workoutId.value}/exercise-sets`).post({
        weight: weight.value.toString(),
        reps: reps.value,
        note: note.value,
        exerciseId: Number(exerciseId.value),
    })

    if (resp.error.value) {
        showFailToast('Failed to store workout')
    } else {
        showSuccessToast('Workout stored successfully')
        await loadData()
    }
}

async function loadData() {
    // load workout data
    const { data } = await useApiFetch(`workouts/${workoutId.value}/exercises/${exerciseId.value}/sets`)
        .get()
        .json<AggregatedExercise[]>()

    execiseSets.value = data.value || []
    setInitialWeightAndReps()
}

function setInitialWeightAndReps() {
    if (execiseSets.value.length > 0) {
        weight.value = Math.round(execiseSets.value[0].avgWeight)
        reps.value = Math.round(execiseSets.value[0].avgReps)
    }
}
onMounted(async () => {
    await loadData()
})
</script>
<template>
    <div class="px-5 flex flex-col gap-3">
        <van-icon :style="{ transform: 'rotate(180deg)' }" name="down"></van-icon>
        <div class="mt-8">
            <RepsAndWeightStepper
                v-model:weight="weight"
                v-model:reps="reps"
                weight-unit="kg"
                reps-unit="reps"
            ></RepsAndWeightStepper>
        </div>

        <van-field v-model="note" type="textarea" placeholder="Note ..." rows="3" autosize />
        <van-button
            :disabled="disabled"
            type="primary"
            icon="records-o"
            size="large"
            :style="{ borderRadius: '10px' }"
            @click="createSet"
            >Done</van-button
        >
    </div>
    <div class="mt-5">
        <ExerciseHistoryTable :rows="execiseSets"></ExerciseHistoryTable>
    </div>
</template>
<style scoped></style>
