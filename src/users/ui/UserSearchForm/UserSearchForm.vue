<template>
    <form class="form" @submit.prevent="submitSearch">
        <CustomInput
            label="Пошта користувача"
            class="search-input"
            type="email"
            hideClearButton
            v-model="email"
        />
        <div class="button-container">
            <CustomButton size="large" class="submit-button" type="submit" :disabled="pendingForm"
                >Пошук</CustomButton
            >
        </div>
    </form>
</template>
<script setup lang="ts">
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { ref } from 'vue';

const email = ref('');

export type UserSearchFormProps = {
    pendingForm: boolean;
};

const props = defineProps<UserSearchFormProps>();

const emit = defineEmits<{
    (event: 'search', data: { email: string }): void;
}>();

const submitSearch = () => {
    if (props.pendingForm) {
        return;
    }
    emit('search', { email: email.value });
};
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.form {
    display: flex;
}

.submit-button {
    height: 100%;
    margin-left: var(--spacing-8);
}

.search-input {
    min-width: 300px;
}

.button-container {
    flex: 1;
    margin-top: var(--spacing-8);
}
</style>
