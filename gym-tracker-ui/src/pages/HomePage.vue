<script setup lang="ts">
</script>
<template>
    <div class="pt-5 px-5">
        <!-- Header -->
        <div class="pb-5">
            <van-nav-bar title="GymLog" left-text="Back" left-arrow @click-left="() => console.log('back')">
                <template #left>
                    <van-image
                        round
                        width="60px"
                        height="60px"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                </template>
                <template #title>
                    <h1 class="text-4xl">GymLog</h1>
                </template>
                <template #right>
                    <div
                        class="rounded-full h-[60px] w-[60px] flex items-center justify-center..."
                        :style="{ background: 'var(--color-accent)' }"
                    >
                        ----
                    </div>
                </template>
            </van-nav-bar>
        </div>

        <!-- end header -->

        <!-- main card -->
        <Card1></Card1>
        <!-- end main card -->
        <div class="mt-10">
            <HomeWorkouts title="Workouts"></HomeWorkouts>
        </div>
        <div class="mt-10">
            <HomeWorkouts title="Exercises"></HomeWorkouts>
        </div>
    </div>
</template>
