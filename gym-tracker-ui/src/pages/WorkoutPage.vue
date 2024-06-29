<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import AddExercise from '../components/AddExercise.vue'
import { showFailToast, showSuccessToast, showToast } from 'vant'

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

const openAddWorkout = () => {
    showAddExerciseModal.value = true
}

const showAddExerciseModal = ref(false)
function addExercise(id: number) {
    console.log('addExercise', id)
    showAddExerciseModal.value = false
    showSuccessToast('Added')
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
                    <h1 class="text-4xl">Workout</h1>
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
                >Add Exercise</van-button
            >

            <!-- list -->
            <ExerciseCardList></ExerciseCardList>

            <van-popup v-model:show="showAddExerciseModal" position="bottom" round :style="{ height: '85%' }" closeable>
                <div class="mt-5">
                    <AddExercise @add-exercise="addExercise"></AddExercise>
                </div>
            </van-popup>
        </div>
    </div>
</template>
<style scoped></style>
