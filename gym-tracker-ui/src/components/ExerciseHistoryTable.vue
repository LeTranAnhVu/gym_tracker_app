<script lang="ts" setup>
const data = [
    { date: '12/02/24', weight: 20.5, reps: 8.1, sets: 4 },
    { date: '12/02/23', weight: 19.7, reps: 7.5, sets: 3 },
    { date: '12/02/22', weight: 21.3, reps: 8.3, sets: 4 },
    { date: '12/02/21', weight: 18.9, reps: 7.9, sets: 3 },
    { date: '12/02/20', weight: 20.1, reps: 8.2, sets: 4 },
    { date: '12/02/19', weight: 19.4, reps: 7.7, sets: 3 },
    { date: '12/02/18', weight: 21.0, reps: 8.0, sets: 4 },
    { date: '12/02/17', weight: 18.6, reps: 7.4, sets: 3 },
    { date: '12/02/16', weight: 20.3, reps: 8.4, sets: 4 },
    { date: '12/02/15', weight: 19.8, reps: 7.8, sets: 3 },
    { date: '12/02/14', weight: 21.2, reps: 8.1, sets: 4 },
    { date: '12/02/13', weight: 18.8, reps: 7.5, sets: 3 },
    { date: '12/02/12', weight: 20.0, reps: 8.3, sets: 4 },
    { date: '12/02/11', weight: 19.3, reps: 7.9, sets: 3 },
    { date: '12/02/10', weight: 21.1, reps: 8.2, sets: 4 },
    { date: '12/02/09', weight: 18.5, reps: 7.7, sets: 3 },
    { date: '12/02/08', weight: 20.2, reps: 8.0, sets: 4 },
    { date: '12/02/07', weight: 19.7, reps: 7.4, sets: 3 },
    { date: '12/02/06', weight: 21.3, reps: 8.4, sets: 4 },
    { date: '12/02/05', weight: 18.9, reps: 7.8, sets: 3 },
    { date: '12/02/04', weight: 20.5, reps: 8.1, sets: 4 },
    { date: '12/02/03', weight: 19.7, reps: 7.5, sets: 3 },
    { date: '12/02/02', weight: 21.3, reps: 8.3, sets: 4 },
    { date: '12/02/01', weight: 18.9, reps: 7.9, sets: 3 },
    { date: '12/01/31', weight: 20.1, reps: 8.2, sets: 4 },
    { date: '12/01/30', weight: 19.4, reps: 7.7, sets: 3 },
    { date: '12/01/29', weight: 21.0, reps: 8.0, sets: 4 },
    { date: '12/01/28', weight: 18.6, reps: 7.4, sets: 3 },
    { date: '12/01/27', weight: 20.3, reps: 8.4, sets: 4 },
    { date: '12/01/26', weight: 19.8, reps: 7.8, sets: 3 },
    { date: '12/01/25', weight: 21.2, reps: 8.1, sets: 4 },
    { date: '12/01/24', weight: 18.8, reps: 7.5, sets: 3 },
    { date: '12/01/23', weight: 20.0, reps: 8.3, sets: 4 },
    { date: '12/01/22', weight: 19.3, reps: 7.9, sets: 3 },
    { date: '12/01/21', weight: 21.1, reps: 8.2, sets: 4 },
    { date: '12/01/20', weight: 18.5, reps: 7.7, sets: 3 },
    { date: '12/01/19', weight: 20.2, reps: 8.0, sets: 4 },
    { date: '12/01/18', weight: 19.7, reps: 7.4, sets: 3 },
    { date: '12/01/17', weight: 21.3, reps: 8.4, sets: 4 },
    { date: '12/01/16', weight: 18.9, reps: 7.8, sets: 3 },
]
</script>

<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>When</th>
                <th>Weight(Kg)</th>
                <th>Reps</th>
                <th>Sets</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, i) in data" :key="i">
                <td>{{ row.date }}</td>
                <td>{{ row.weight }}</td>
                <td>{{ row.reps }}</td>
                <td>{{ row.sets }}</td>
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
