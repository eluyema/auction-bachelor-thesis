<template>
    <form class="form" @submit.prevent="submitLogin">
        <h2 class="title">Реєстрація</h2>
        <div>
            <CustomInput
                :error="!!errorText"
                label="Ваше ім'я / Ім'я юридичної особи"
                class="input"
                type="text"
                hideClearButton
                v-model="formInput.name"
            />
        </div>
        <div>
            <CustomInput
                :error="!!errorText"
                label="Пошта"
                class="input"
                type="email"
                hideClearButton
                v-model="formInput.email"
            />
        </div>
        <div>
            <CustomInput
                :error="!!errorText"
                label="Пароль"
                class="input"
                type="password"
                v-model="formInput.password"
            />
        </div>
        <p class="error-text">
            {{ errorText }}
        </p>
        <CustomButton class="button" type="submit">Створити обліковий запис</CustomButton>
        <p class="another-form-description">
            Перейти до <RouterLink class="link" to="/login">сторінки логіну</RouterLink>
        </p>
    </form>
</template>
<script setup lang="ts">
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { ref, reactive } from 'vue';
import { ValidationError, object, string } from 'yup';

const errorText = ref('');

const emit = defineEmits<{
    (event: 'registration', data: { name: string; email: string; password: string }): void;
}>();

const getFormSchema = () => {
    return object({
        name: string()
            .min(2, `Довжина імені має бути від 2 символів`)
            .max(200, `Довжина імені має бути до 200 символів`)
            .required("Введіть ім'я"),
        email: string().email('Введена пошта не валідна').required('Введіть пошту'),
        password: string()
            .min(8, `Довжина пароля має бути від 8 символів`)
            .max(50, `Довжина пароля має бути до 50 символів`)
            .required('Введіть пароль'),
    });
};

const formSchema = ref(getFormSchema());

const formInput = reactive({
    name: '',
    email: '',
    password: '',
});

const submitLogin = async () => {
    try {
        await formSchema.value.validate(formInput);
        errorText.value = '';

        emit('registration', formInput);
    } catch (error) {
        if (!(error instanceof ValidationError)) {
            return;
        }

        errorText.value = error.message;
    }
};
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.title {
    @include font-h2();
}

.form {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color-white);
    padding: var(--spacing-20);
    border-radius: var(--radius-large);
    width: 100%;
    max-width: 400px;
}

.input {
    width: 100%;
}

.button {
    margin-top: var(--spacing-4);
}

.error-text {
    @include font-text-small();

    height: 20px;
    color: var(--color-stroke-red);

    @include desktop() {
        height: 24px;
    }
}

.another-form-description {
    @include font-text-small();

    margin-top: var(--spacing-8);
}

.link {
    @include link();
}
</style>
