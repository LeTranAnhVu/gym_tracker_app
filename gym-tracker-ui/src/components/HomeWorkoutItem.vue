<script lang="ts" setup>
type Props = {
    primary?: boolean
}
const props = defineProps<Props>()
</script>
<template>
    <div
        class="h-[150px] min-w-[130px] w-[130px] rounded-xl"
        :class="props.primary ? 'bg-accent' : 'bg-accent-2'"
    ></div>
</template>
