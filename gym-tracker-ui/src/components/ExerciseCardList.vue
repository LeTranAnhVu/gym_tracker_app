<template>
    <div class="flex flex-col gap-5">
        <ExerciseCard v-for="(_, i) in new Array(5)" :key="i"></ExerciseCard>
    </div>
</template>
