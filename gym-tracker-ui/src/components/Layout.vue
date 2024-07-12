<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const activeHam = ref(false)
const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta.title)
function goBack() {
    router.back()
}
const auth0 = useAuth0()
const isAuthenticated = computed(() => auth0.isAuthenticated.value)
const isLoadding = computed(() => auth0.isLoading.value)
const isWorkoutPage = computed(() => route.name === 'workout')
function toggleHam() {
    activeHam.value = !activeHam.value
}

watch(
    [isAuthenticated, isLoadding],
    async () => {
        if (!isAuthenticated.value && !isLoadding.value) {
            await auth0.loginWithRedirect()
        }
    },
    { immediate: true },
)
</script>
<template>
    <div v-if="isAuthenticated && !isLoadding">
        <div class="pb-0 relative bg-white shadow-sm">
            <van-nav-bar left-text="Back" left-arrow @click-left="goBack">
                <template #left>
                    <van-image
                        v-if="route.name === 'home'"
                        round
                        width="60px"
                        height="60px"
                        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                    />
                    <van-button
                        v-else
                        round
                        :style="{ height: '30px', width: '30px', fontSize: '1.3rem', border: 'none' }"
                        icon="arrow-left"
                    ></van-button>
                </template>
                <template #title>
                    <h1 class="text-2xl">{{ title }}</h1>
                    <div
                        v-if="!isWorkoutPage"
                        class="rounded-b-xl px-6 pb-1 flex flex-col text-accent absolute bg-white translate-y-[100%] bottom-[1px] left-[50%] translate-x-[-50%] shadow-lg z-10"
                    >
                        <Timer dense></Timer>
                    </div>
                </template>
                <template #right>
                    <div
                        class="tham tham-e-squeeze tham-w-6"
                        :class="activeHam ? 'tham-active' : ''"
                        @click="toggleHam"
                    >
                        <div class="tham-box">
                            <div class="tham-inner" />
                        </div>
                    </div>
                </template>
            </van-nav-bar>
        </div>
        <main>
            <router-view />
        </main>
    </div>
</template>
