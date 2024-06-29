<template>
    <div class="rounded-2xl p-7 flex flex-col gap-3" :style="{ background: 'var(--color-bg-secondary)' }">
        <div class="flex flex-initial">
            <div class="text-5xl font-bold flex flex-col justify-center items-center w-[30%]">
                <p>July</p>
                <p>12</p>
            </div>
        </div>
        <div class="flex gap-10">
            <div class="grid grid-cols-7 gap-2 pt-2 w-[30%]">
                <div
                    v-for="(_, i) in new Array(11)"
                    :key="i"
                    class="rounded-full w-[8px] h-[8px]"
                    :style="{ background: 'var(--color-accent)' }"
                ></div>
                <div class="rounded-full w-[8px] h-[8px]" :style="{ background: 'red' }"></div>
                <div
                    v-for="(_, i) in new Array(18)"
                    :key="i"
                    class="rounded-full w-[8px] h-[8px]"
                    :style="{ background: 'var(--color-accent)' }"
                ></div>
            </div>
            <div class="text-3xl font-light">
                <p>Workout: 5</p>
                <p>Total time: 3h</p>
            </div>
        </div>
    </div>
</template>
