<template>
    <form class="form" @submit.prevent="submitUpdate">
        <h2 class="title">Редагування рівня доступу користувача</h2>
        <div>
            <CustomInput
                :error="!!errorText"
                disabled
                label="Ім'я користувача / Ім'я юридичної особи"
                class="input"
                type="text"
                hideClearButton
                v-model="formInput.name"
            />
        </div>
        <div>
            <CustomInput
                :error="!!errorText"
                disabled
                label="Пошта"
                class="input"
                type="email"
                hideClearButton
                v-model="formInput.email"
            />
        </div>
        <div>
            <select class="select" v-model="formInput.accessLevel">
                <option :value="AccessLevel.REGULAR">Звичайний</option>
                <option :value="AccessLevel.MANAGER">Менеджер</option>
                <option :value="AccessLevel.ADMIN">Адміністратор</option>
            </select>
        </div>
        <p class="error-text">
            {{ errorText || updateError }}
        </p>
        <CustomButton class="button" type="submit">Оновити обліковий запис</CustomButton>
    </form>
</template>
<script setup lang="ts">
import { AccessLevel, AccessLevelType } from 'src/entities/users/MyUser';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import { ref, reactive } from 'vue';
import { ValidationError, mixed, object, string } from 'yup';

const errorText = ref('');

export type UsersEditorFormProps = {
    user: {
        email: string;
        name: string;
        accessLevel: AccessLevelType;
    };
    updateError: string;
};

const props = defineProps<UsersEditorFormProps>();

const emit = defineEmits<{
    (
        event: 'updateUser',
        data: { name: string; email: string; accessLevel: AccessLevelType },
    ): void;
}>();

const getFormSchema = () => {
    return object({
        name: string()
            .min(2, `Довжина імені має бути від 2 символів`)
            .max(200, `Довжина імені має бути до 200 символів`)
            .required("Введіть ім'я"),
        email: string().email('Введена пошта не валідна').required('Введіть пошту'),
        accessLevel: mixed().oneOf(Object.keys(AccessLevel)).required('Введіть рівень доступу'),
    });
};

const formSchema = ref(getFormSchema());

const formInput = reactive({
    name: props.user.name,
    email: props.user.email,
    accessLevel: props.user.accessLevel,
});

const submitUpdate = async () => {
    try {
        await formSchema.value.validate(formInput);
        errorText.value = '';

        const updatedUser = {
            name: formInput.name,
            email: formInput.email,
            accessLevel: formInput.accessLevel,
        };
        emit('updateUser', updatedUser);
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
    @include font-text-large();

    margin-bottom: var(--spacing-12);
}

.form {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color-white);
    padding: var(--spacing-20);
    border-radius: var(--radius-large);
    width: 100%;
    max-width: 430px;
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

.select {
    border: 1px solid var(--color-stroke-grey);
    padding: var(--spacing-8) var(--spacing-12);

    &:focus {
        border-color: var(--color-stroke-green);
        outline: none;
    }
}
</style>
