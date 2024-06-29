<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta.title)
function goBack() {
    console.log('back')
    router.back()
}
</script>
<template>
    <div>
        <div class="pb-5">
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
        <main>
            <router-view />
        </main>
    </div>
</template>
