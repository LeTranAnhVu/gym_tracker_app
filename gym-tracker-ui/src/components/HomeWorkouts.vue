<script setup>
const props = defineProps({
    title: String,
})
</script>
<template>
    <div>
        <div class="flex justify-between">
            <h2 class="text-3xl">{{ props.title }}</h2>
            <a class="italic font-extralight" src="#">View all</a>
        </div>
        <div class="flex flex-nowrap gap-3 overflow-x-auto no-scrollbar mt-5">
            <HomeAddWorkoutItem></HomeAddWorkoutItem>
            <HomeWorkoutItem primary></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
            <HomeWorkoutItem></HomeWorkoutItem>
        </div>
    </div>
</template>
