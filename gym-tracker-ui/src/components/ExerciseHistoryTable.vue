<script lang="ts" setup>
import { AggregatedExercise } from '../lib/models/AggregatedExercise'
type Props = {
    rows: AggregatedExercise[]
}

defineProps<Props>()
</script>

<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>When</th>
                <th>Weight(Kg)</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Progress</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in rows" :key="i" class="border-b border-slate-100">
                <td>{{ row.date }}</td>
                <td>{{ row.avgWeight }}</td>
                <td>{{ row.totalReps }}</td>
                <td>{{ row.sets }}</td>
                <td>
                    <van-icon v-if="row.progress == 'best'" color="red" name="fire"></van-icon>
                    <van-icon
                        v-if="row.progress == 'up'"
                        color="red"
                        name="down"
                        :style="{ transform: 'rotate(180deg)' }"
                    ></van-icon>
                    <van-icon v-else-if="row.progress == 'neutral'" name="minus"></van-icon>
                    <van-icon v-else-if="row.progress == 'down'" name="down"></van-icon>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<style scoped>
table {
    @apply w-full;
    th {
        @apply text-center sticky top-0 font-medium py-4 px-1 bg-slate-50;
    }
    td {
        @apply text-center font-thin py-3;
    }
}
</style>
