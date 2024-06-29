<script setup lang="ts">
import { showToast } from 'vant'
import { reactive, ref } from 'vue'

const emit = defineEmits(['add-exercise'])
const search = ref('')
const selectedExercise = ref<number>(-1)

const newExercise = reactive({
    name: '',
    info: '',
})
const showCreateExerciseModal = ref(false)

function openCreateExerciseModal() {
    showCreateExerciseModal.value = true
}
function createNewExercise() {
    console.log('createNewExercise', newExercise)
    showCreateExerciseModal.value = false
    showToast('Created')
}

function addToWorkout() {
    console.log('addToWorkout workout')
    emit('add-exercise', selectedExercise.value)

    // reset
    selectedExercise.value = -1
}

function selectExercise(i: number) {
    selectedExercise.value = i
    console.log('selectExercise workout')
}
</script>

<template>
    <div>
        <h1 class="text-3xl mx-auto text-center mt-2">Add Exercise</h1>
        <div class="mt-2">
            <van-search v-model="search" :style="{ height: '40px', fontSize: '16px' }" placeholder="Workout" />
        </div>
        <div class="mt-4 px-2">
            <div class="flex flex-col gap-2">
                <div class="mt-5">
                    <van-button plain type="primary" icon="plus" block @click="openCreateExerciseModal"
                        >Create new</van-button
                    >
                </div>
                <div
                    v-for="(_, i) in new Array(5)"
                    :key="i"
                    class="card"
                    :class="selectedExercise == i ? 'active' : ''"
                    @click="() => selectExercise(i)"
                >
                    <div class="header">
                        <p class="title">Bench Press (Upper)</p>
                        <p class="meta">15/07/24</p>
                    </div>
                    <div class="body">
                        <p>Last workout: <span>1 day ago</span></p>
                        <p>
                            Description:
                            <span
                                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text e
                            </span>
                        </p>
                    </div>
                </div>
                <ExerciseCard></ExerciseCard>
            </div>
        </div>
        <div v-if="selectedExercise != -1" class="fixed bottom-2 w-[95%] mx-auto left-[50%] translate-x-[-50%]">
            <van-button type="primary" icon="plus" size="large" :style="{ borderRadius: '10px' }" @click="addToWorkout"
                >Select</van-button
            >
        </div>
        <van-popup v-model:show="showCreateExerciseModal" round closeable>
            <div class="my-5">
                <h2 class="text-xl text-center">Create Exercise</h2>
                <div class="mt-5">
                    <van-cell-group inset>
                        <van-field
                            v-model="newExercise.name"
                            label="Name"
                            placeholder="Enter exercise name"
                        ></van-field>
                        <van-field v-model="newExercise.info" label="Info" placeholder="Exercise info"></van-field>
                    </van-cell-group>
                </div>
                <div class="mt-5 mx-4">
                    <van-button type="primary" block @click="createNewExercise">Save</van-button>
                </div>
            </div>
        </van-popup>
    </div>
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
        @apply mt-2 flex flex-wrap font-light;
        p {
            @apply text-sm mb-2;
        }
    }
}

.card.active {
    @apply bg-accent-2;
}
</style>
