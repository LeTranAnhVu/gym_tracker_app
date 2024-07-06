<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { Exercise } from '../lib/models/Exercise'
import { toRefs } from 'vue'
type Props = {
    exercise: Exercise
    workoutId: number
}

const props = defineProps<Props>()
const { exercise, workoutId } = toRefs(props)
const router = useRouter()
function startWorkout() {
    console.log('startWorkout')

    router.push({ name: 'exercise', params: { workoutId: workoutId.value, exerciseId: exercise.value.id } })
}
</script>
<template>
    <div class="card rounded-xl p-5 bg-neutral-1" @click="startWorkout">
        <div class="header flex flex-nowrap items-center justify-between">
            <p class="title text-xl font-regular">{{ exercise.name }}</p>
            <p class="meta text-sm italic font-light bg-accent-2 rounded-full px-3">#####</p>
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
