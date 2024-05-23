<template>
    <div class="base-timer">
        <svg
            class="base-timer__svg"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
        >
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path
                    :stroke-dasharray="circleDasharray"
                    class="base-timer__path-remaining"
                    :class="{ 'hide-progress': progressHide }"
                    d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
                ></path>
            </g>
        </svg>
        <span class="base-timer__label">{{ formattedTimeLeft }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

export type TextTimerProps = {
    time?: number;
};

const emit = defineEmits(['timerEnded']);

const props = withDefaults(defineProps<TextTimerProps>(), { time: 60 });

const FULL_DASH_ARRAY = 283;

const timePassed = ref(0);

let timerInterval = ref<null | ReturnType<typeof setTimeout>>(null);

const timeLeft = computed(() => {
    console.log(props.time);
    return props.time - timePassed.value;
});

const timeFraction = computed(() => {
    const rawTimeFraction = timeLeft.value / props.time;
    return rawTimeFraction - (1 / props.time) * (1 - rawTimeFraction);
});

const circleDasharray = computed(() => {
    const rawFractionValue = timeFraction.value * FULL_DASH_ARRAY;

    const fractionValue = rawFractionValue > 0 ? rawFractionValue : 0;

    return `${fractionValue.toFixed(0)} 283`;
});

const progressHide = computed(() => timeFraction.value * FULL_DASH_ARRAY < 0);

const formattedTimeLeft = computed(() => {
    const timeLeftValue = timeLeft.value;
    const minutes = Math.floor(timeLeftValue / 60);
    let seconds: number | string = timeLeftValue % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
});

onMounted(() => {
    startTimer();
});

onUnmounted(() => {
    if (timerInterval.value === null) {
        return;
    }
    clearInterval(timerInterval.value);
});

const onTimesUp = () => {
    if (timerInterval.value === null) {
        return;
    }
    emit('timerEnded');
    clearInterval(timerInterval.value);
};

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        timePassed.value += 1;
        if (timeLeft.value <= 0) onTimesUp();
    }, 1000);
};

watch(
    () => props.time,
    () => {
        if (timerInterval.value !== null) {
            clearInterval(timerInterval.value);
        }
        timePassed.value = 0;
        startTimer();
    },
);
</script>

<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.base-timer {
    position: relative;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__svg {
        transform: scaleX(-1);
    }

    &__circle {
        fill: none;
        stroke: none;
    }

    &__path-elapsed {
        stroke-width: 1px;
        stroke: var(--background-color-dark-grey);
    }

    &__path-remaining {
        stroke-width: 4px;
        stroke-linecap: round;
        scale: -1 1;
        rotate: -90deg;
        transform-origin: center;
        transition-property: stroke;
        transition: 1s linear all;
        fill-rule: nonzero;
        stroke: var(--color-main-blue);
    }

    &__label {
        @include font-text-medium();

        position: absolute;
    }

    .hide-progress {
        transition-delay: 0ms;
        transition-property: opacity;
        transition-duration: unset;
        opacity: 0;
    }
}
</style>
