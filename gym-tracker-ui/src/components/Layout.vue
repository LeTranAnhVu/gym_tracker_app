<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const activeHam = ref(false)
const router = useRouter()
const route = useRoute()
const title = computed(() => route.meta.title)
function goBack() {
    console.log('back')
    router.back()
}

function toggleHam() {
    activeHam.value = !activeHam.value
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
