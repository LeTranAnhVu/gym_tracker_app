<script setup lang="ts">
import { showToast } from 'vant'
import { ref } from 'vue'
const note = ref('')

function storeWorkout() {
    console.log('storeWorkout', note.value)
    showToast({ type: 'success', message: 'Workout stored' })
}
</script>
<template>
    <div class="px-5 flex flex-col gap-3">
        <div class="mt-8">
            <RepsAndWeightStepper></RepsAndWeightStepper>
        </div>
        <van-field v-model="note" type="textarea" placeholder="Note ..." rows="3" autosize />

        <van-button type="primary" icon="records-o" size="large" :style="{ borderRadius: '10px' }" @click="storeWorkout"
            >Done</van-button
        >
    </div>
    <div class="mt-5">
        <ExerciseHistoryTable></ExerciseHistoryTable>
    </div>
</template>
<style scoped></style>
