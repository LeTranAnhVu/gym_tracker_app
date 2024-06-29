<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function startWorkout() {
    console.log('startWorkout')

    router.push({ name: 'exercise', params: { workoutId: 1, exerciseId: 1 } })
}
</script>
<template>
    <div class="card rounded-xl p-5 bg-neutral-1" @click="startWorkout">
        <div class="header flex flex-nowrap items-center justify-between">
            <p class="title text-xl font-regular">Bench Press (Upper)</p>
            <p class="meta text-sm italic font-light bg-accent-2 rounded-full px-3">15/07/24</p>
        </div>
        <div class="body mt-2 flex flex-wrap font-light">
            <p class="w-[50%] text-sm mb-2">Weight: <span>12 | 14 | 16 | 18</span></p>
            <p class="w-[50%] text-sm mb-2">Arg reps: <span>9 | 10 | 5.4 | 5</span></p>
            <p class="w-[50%] text-sm mb-2">Sets: <span>3 | 4 | 5 | 4</span></p>
        </div>
        <p class="text-sm">
            Note:
            <span
                >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text e
            </span>
        </p>
    </div>
</template>
