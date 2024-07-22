<script lang="ts" setup>
defineProps<{
    month: string
    day: string
    workoutId: number
}>()
</script>
<template>
    <div class="rounded-2xl p-7 flex flex-col gap-5 bg-accent text-neutral-1">
        <div class="flex flex-nowrap items-start">
            <div class="text-5xl font-medium flex flex-col gap-5 justify-center items-center w-[30%]">
                <p>{{ month }}</p>
                <p>{{ day }}</p>
            </div>
            <Timer></Timer>
        </div>
        <div>
            <van-skeleton title :row="2" />
        </div>
    </div>
</template>
