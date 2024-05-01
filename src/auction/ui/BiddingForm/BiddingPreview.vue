<template>
    <div class="preview-block" v-if="show">
        <span v-if="!Array.isArray(message)" class="message">{{ message }}</span>
        <span v-else v-for="oneMessage of message" :key="oneMessage" class="message">{{
            oneMessage
        }}</span>
        <TextTimer :time="diffInSeconds" @timer-ended="onTimeEnd" />
    </div>
</template>
<script setup lang="ts">
import TextTimer from 'src/shared/ui/Timers/TextTimer/TextTimer.vue'
import { getSecondsBetweenDates } from 'src/shared/utils/getSecondsBetweenDates'
import { computed, ref, watchEffect } from 'vue'

export type BiddingPreviewProps = {
    message: string | string[]
    date: Date
}

const { message, date } = defineProps<BiddingPreviewProps>()

const diffInSeconds = computed(() => getSecondsBetweenDates(date, new Date()))

const show = ref(false)

watchEffect(() => {
    show.value = diffInSeconds.value > 0
})

const onTimeEnd = () => {
    show.value = false
}
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.preview-block {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.message {
    @include font-text-large();

    margin-right: var(--spacing-4);
}
</style>
