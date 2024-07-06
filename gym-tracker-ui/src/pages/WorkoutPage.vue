<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import AddExercise from '../components/AddExercisePopup.vue'
import { showSuccessToast } from 'vant'

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
    showAddExercisePopup.value = true
}

const showAddExercisePopup = ref(false)
function addExercise(id: number) {
    console.log('addExercise', id)
    showAddExercisePopup.value = false
    showSuccessToast('Added')
}

onBeforeUnmount(() => {
    clearInterval(interval)
})
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

            <AddExercisePopup v-model:show="showAddExercisePopup" @add-exercise="addExercise"></AddExercisePopup>
        </div>
    </div>
</template>
<style scoped></style>
