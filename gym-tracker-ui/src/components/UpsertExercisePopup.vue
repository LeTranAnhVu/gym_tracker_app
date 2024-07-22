<script lang="ts" setup>
import { Exercise } from '../lib/models/Exercise'

defineProps({
    update: Boolean,
})
const emit = defineEmits(['save', 'delete'])
const show = defineModel<boolean>('show')
const exercise = defineModel<Exercise>('exercise', { required: true })
</script>

<template>
    <van-popup v-model:show="show" round closeable duration="0.1" :style="{ width: '90%' }">
        <div class="my-5">
            <h2 class="text-xl text-center">Create Exercise</h2>
            <div class="mt-5">
                <van-cell-group inset>
                    <van-field v-model="exercise.name" label="Name" placeholder="Enter exercise name"></van-field>
                    <van-field
                        v-model="exercise.info"
                        rows="5"
                        type="textarea"
                        label="Info"
                        placeholder="Exercise info"
                    ></van-field>
                </van-cell-group>
            </div>
            <div class="mt-5 mx-4 flex flex-col gap-1">
                <van-button type="primary" block @click="emit('save')">Save</van-button>
                <van-button v-if="update" plain type="danger" block @click="emit('delete')">Delete</van-button>
            </div>
        </div>
    </van-popup>
</template>
