<template>
    <div class="simple-timer">
        <span class="simple-timer__label">{{ formattedTimeLeft }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

export type TextTimerProps = {
    time?: number
}

const emit = defineEmits(['timerEnded'])

const props = withDefaults(defineProps<TextTimerProps>(), {
    time: 86400
})

const timePassed = ref(0)
let timerInterval = ref<null | ReturnType<typeof setTimeout>>(null)

const timeLeftInSeconds = computed(() => {
    return props.time - timePassed.value
})

const formattedTimeLeft = computed(() => {
    const timeLeftValue = timeLeftInSeconds.value
    const days = Math.floor(timeLeftValue / (60 * 60 * 24))
    const hours = Math.floor((timeLeftValue % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((timeLeftValue % (60 * 60)) / 60)
    const seconds = timeLeftValue % 60

    let formattedString = ''

    if (days > 0) {
        formattedString += `${days}дн `
    }
    if (hours > 0 || days > 0) {
        formattedString += `${hours}год `

        if (formattedString.split(' ').length > 2) {
            return formattedString.trim()
        }
    }
    if (minutes > 0 || hours > 0) {
        formattedString += `${minutes}хв `

        if (formattedString.split(' ').length > 2) {
            return formattedString.trim()
        }
    }
    if (seconds > 0 || minutes > 0 || formattedString.length === 0) {
        formattedString += `${seconds}сек`

        if (formattedString.split(' ').length > 2) {
            return formattedString.trim()
        }
    }

    return formattedString.trim()
})

onMounted(() => {
    startTimer()
})

watch(
    () => props.time,
    () => {
        if (timerInterval.value !== null) {
            clearInterval(timerInterval.value)
        }
        timePassed.value = 0
        startTimer()
    }
)

onUnmounted(() => {
    if (timerInterval.value === null) {
        return
    }
    clearInterval(timerInterval.value)
})

const onTimesUp = () => {
    if (timerInterval.value === null) {
        return
    }
    emit('timerEnded')
    clearInterval(timerInterval.value)
}

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        timePassed.value += 1
        if (timeLeftInSeconds.value <= 0) onTimesUp()
    }, 1000)
}
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.simple-timer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.simple-timer__label {
    @include font-text-large-bold();
}
</style>
