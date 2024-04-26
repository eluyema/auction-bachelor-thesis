import { ref, onMounted, onUnmounted, computed } from 'vue'

export function useDetectBreakpoint(minWidth: number) {
    const desktopVisible = ref(false)
    const mobileVisible = computed(()=> !desktopVisible);

    function updateVisibility() {
        desktopVisible.value = window.innerWidth >= minWidth
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
