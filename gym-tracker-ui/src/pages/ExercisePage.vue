<script setup lang="ts">
import { showFailToast, showSuccessToast, showToast } from 'vant'
import { computed, ref } from 'vue'
import { useApiFetch } from '../main'
import { useRoute } from 'vue-router'
const note = ref('')
const weight = ref<number | null>(null)
const reps = ref<number | null>(null)
const route = useRoute()
const workoutId = computed(() => route.params.workoutId)
const exerciseId = computed(() => route.params.exerciseId)
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
    }
}
</script>
<template>
    <div class="px-5 flex flex-col gap-3">
        <div class="mt-8">
            <RepsAndWeightStepper
                v-model:weight="weight"
                v-model:reps="reps"
                weight-unit="kg"
                reps-unit="reps"
            ></RepsAndWeightStepper>
        </div>

        <van-field v-model="note" type="textarea" placeholder="Note ..." rows="3" autosize />
        <van-button type="primary" icon="records-o" size="large" :style="{ borderRadius: '10px' }" @click="createSet"
            >Done</van-button
        >
    </div>
    <div class="mt-5">
        <ExerciseHistoryTable></ExerciseHistoryTable>
    </div>
</template>
<style scoped></style>
