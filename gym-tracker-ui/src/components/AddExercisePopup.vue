<script setup lang="ts">
import { showFailToast } from 'vant'
import { onMounted, reactive, ref } from 'vue'
import { useApiFetch } from '../main'
import { Exercise } from '../lib/models/Exercise'

const emit = defineEmits(['add-exercise'])

const show = defineModel<boolean>('show')

const search = ref('')
const selectedExerciseId = ref<number | null>(null)

const newExercise = reactive({
    name: '',
    info: '',
})
const showCreateExercisePopup = ref(false)

function openCreateExercisePopup() {
    showCreateExercisePopup.value = true
}

function addToWorkout() {
    emit('add-exercise', selectedExerciseId.value)

    // reset
    selectedExerciseId.value = null
}

function selectExercise(id: number) {
    selectedExerciseId.value = id
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

    // reset
    newExercise.name = ''
    newExercise.info = ''
}

const exercises = ref<Exercise[]>([])
async function loadData() {
    const { data } = await useApiFetch('exercises').get().json<Exercise[]>()
    exercises.value = data.value || []
}

onMounted(async () => {
    await loadData()
})
</script>

<template>
    <van-popup v-model:show="show" position="bottom" round :style="{ height: '85%' }" closeable>
        <div class="mt-5">
            <h1 class="text-3xl mx-auto text-center mt-2">Add Exercise</h1>
            <div class="mt-2">
                <van-search v-model="search" :style="{ height: '40px', fontSize: '16px' }" placeholder="Workout" />
            </div>
            <div class="mt-4 px-2">
                <div class="flex flex-col gap-2 mb-16">
                    <div class="mt-5">
                        <van-button plain type="primary" icon="plus" block @click="openCreateExercisePopup"
                            >Create new</van-button
                        >
                    </div>
                    <div
                        v-for="exercise in exercises"
                        :key="exercise.id"
                        class="card"
                        :class="selectedExerciseId == exercise.id ? 'active' : ''"
                        @click="() => selectExercise(exercise.id)"
                    >
                        <div class="header">
                            <p class="title">{{ exercise.name }}</p>
                            <p class="meta">##/##/24</p>
                        </div>
                        <div class="body">
                            <p>Last workout: <span># day ago</span></p>
                            <p>
                                Info:
                                <span>{{ exercise.info || 'No Information' }} </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedExerciseId" class="fixed bottom-2 w-[95%] mx-auto left-[50%] translate-x-[-50%]">
                <van-button
                    type="primary"
                    icon="plus"
                    size="large"
                    :style="{ borderRadius: '10px' }"
                    @click="addToWorkout"
                    >Select</van-button
                >
            </div>
            <UpsertExercisePopup
                v-model:exercise="newExercise"
                v-model:show="showCreateExercisePopup"
                @save="createNewExercise"
            ></UpsertExercisePopup>
        </div>
    </van-popup>
</template>
<style scoped>
.card {
    @apply rounded-xl p-5 bg-neutral-1;
    .header {
        @apply flex flex-nowrap items-center justify-between;

        .title {
            @apply text-xl font-medium;
        }
        .meta {
            @apply text-sm italic font-light bg-accent-2 rounded-full px-3;
        }
    }
    .body {
        @apply mt-2 font-light;
        p {
            @apply text-sm mb-2;
        }
    }
}

.card.active {
    @apply bg-accent-2;
}
</style>
