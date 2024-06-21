<script setup lang="ts"></script>
<template>
    <div class="pt-5">
        <!-- Header -->
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
                <h1>GymLog</h1>
            </template>
        </van-nav-bar>
        <!-- end header -->
    </div>
</template>
