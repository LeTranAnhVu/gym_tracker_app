<script setup>
import router from '../router'

const props = defineProps({
    title: String,
})

const createNewWorkout = () => {
    console.log('Create new workout')
    router.push({ name: 'workout', params: { workoutId: 1 } })
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
                    @click="createNewWorkout"
                ></van-button>
            </div>
            <HomeWorkoutItem primary></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
        </div>
    </div>
</template>
