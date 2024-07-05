<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect } = useAuth0()
const handleLogin = async () => {
    await loginWithRedirect()
}
</script>

<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <img class="w-1/3 h-[100px] bg-slate-400 rounded-lg" alt="" />
        <div class="text-center mt-10 mb-[90px]">
            <h1 class="text-3xl font-semibold">Welcome to <span class="font-bold">GymloG</span></h1>
            <p class="text-slate-500">Build your target, get your dream</p>
        </div>
        <div class="w-full px-9">
            <van-button type="primary" plain size="large" :style="{ borderRadius: '10px' }" @click="handleLogin"
                >Login</van-button
            >
        </div>
    </div>
</template>
