<script setup lang="ts">
import { showToast } from 'vant'
import {ref } from 'vue'
const note = ref('')

function storeWorkout() {
    console.log('storeWorkout', note.value)
    showToast({ type: 'success', message: 'Workout stored' }) 
}
</script>
<template>
    <div class="pt-5 px-5">
        <div class="pb-5">
            <van-nav-bar left-text="Back" left-arrow @click-left="() => console.log('back')">
                <template #left>
                    <van-button
                        round
                        :style="{ height: '50px', width: '50px', background: 'var(--color-bg-secondary)' }"
                        icon="arrow-left"
                    ></van-button>
                </template>
                <template #title>
                    <h1 class="text-2xl">Benchpress (U)</h1>
                </template>
            </van-nav-bar>
        </div>
        <div class="flex flex-col gap-3">
            <div class="mt-8">
                <RepsAndWeightStepper></RepsAndWeightStepper>
            </div>
            <van-field v-model="note" type="textarea" placeholder="Note ..." rows="3" autosize />

            <van-button
                type="primary"
                icon="records-o"
                size="large"
                :style="{ borderRadius: '10px' }"
                @click="storeWorkout"
                >Done</van-button
            >
            <div class="mt-5">
                <ExerciseHistoryTable></ExerciseHistoryTable>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
