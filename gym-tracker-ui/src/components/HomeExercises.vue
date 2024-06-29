<script setup>
import { ref, defineProps, reactive } from 'vue'
const props = defineProps({
    title: String,
})

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
            <HomeWorkoutItem primary></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
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
