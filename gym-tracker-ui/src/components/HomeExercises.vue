<script lang="ts" setup>
import { ref, defineProps, onMounted, reactive } from 'vue'
import { useApiFetch } from '../main'
import { showFailToast } from 'vant'
import { Exercise } from '../lib/models/Exercise'

const props = defineProps({
    title: String,
})

const exercises = ref<Exercise[]>([])
const showCreateExercisePopup = ref(false)
const showUpdateExercisePopup = ref(false)
const updatedExercise = ref<Exercise | null>()
const newExercise = reactive({
    name: '',
    info: '',
})

function openCreateExerciseModal() {
    showCreateExercisePopup.value = true
}

async function loadData() {
    const { data } = await useApiFetch('exercises').get().json<Exercise[]>()
    exercises.value = data.value || []
}

function validate(): [boolean, string?] {
    if (!newExercise.name) {
        return [false, 'Name is required']
    }

    return [true]
}

async function createNewExercise() {
    const [isValid, error] = validate()
    if (!isValid) {
        showFailToast(error || 'Invalid input')
        return
    }

    await useApiFetch('exercises').post(newExercise)
    showCreateExercisePopup.value = false
    await loadData()
}

async function updateExercise() {
    await useApiFetch(`exercises/${updatedExercise.value?.id}`).patch(updatedExercise.value)
    showUpdateExercisePopup.value = false
    updatedExercise.value = null

    await loadData()
}

function openUpdateExerciseModal(exercise: Exercise) {
    console.log('openUpdateExerciseModal', exercise)
    updatedExercise.value = exercise
    showUpdateExercisePopup.value = true
}

async function deleteExercise() {
    if (!updatedExercise.value) {
        return
    }

    await useApiFetch(`exercises/${updatedExercise.value.id}`).delete()
    showUpdateExercisePopup.value = false
    updatedExercise.value = null
    await loadData()
}

onMounted(async () => {
    await loadData()
})
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
                    @click="openCreateExerciseModal"
                ></van-button>
            </div>
            <div
                v-for="(exercise, i) in exercises"
                :key="exercise.id"
                class="h-[150px] min-w-[130px] w-[130px] rounded-xl py-5 px-2"
                :class="i == 0 ? 'bg-accent' : 'bg-accent-2'"
                @click="openUpdateExerciseModal(exercise)"
            >
                <div class="flex flex-col justify-between h-full" :class="i == 0 ? 'text-white' : ''">
                    <p class="text-xl font-regurlar leading-6">{{ exercise.name }}</p>
                    <div class="text-right">
                        <p class="text-lg">100 <span class="text-xs">sets</span></p>
                        <p class="text-lg">1K <span class="text-xs">reps</span></p>
                    </div>
                </div>
            </div>
        </div>

        <UpsertExercisePopup
            v-if="updatedExercise"
            v-model:exercise="updatedExercise"
            v-model:show="showUpdateExercisePopup"
            update
            @save="updateExercise"
            @delete="deleteExercise"
        ></UpsertExercisePopup>

        <UpsertExercisePopup
            v-model:exercise="newExercise"
            v-model:show="showCreateExercisePopup"
            @save="createNewExercise"
        ></UpsertExercisePopup>
    </div>
</template>
