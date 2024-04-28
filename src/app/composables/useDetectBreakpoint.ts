import { ref, onMounted, onUnmounted, computed } from 'vue'
import { config } from 'src/config';

export function useDetectBreakpoint() {
    const desktopVisible = ref(false)
    const mobileVisible = computed(()=> !desktopVisible.value);

    function updateVisibility() {
        desktopVisible.value = window.innerWidth >= config.theme.breakpoints.minDesktopWidth;
    }

    onMounted(() => {
        updateVisibility();
        window.addEventListener('resize', updateVisibility);
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateVisibility);
    })

    return { desktopVisible, mobileVisible }
}
