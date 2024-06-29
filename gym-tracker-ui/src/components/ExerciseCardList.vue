<template>
    <div class="flex flex-col gap-2">
        <ExerciseCard v-for="(_, i) in new Array(5)" :key="i"></ExerciseCard>
    </div>
</template>
