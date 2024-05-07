<template>
    <table>
        <tr class="row">
            <th class="head-cell">Ім'я</th>
            <td class="data-cell">{{ user.name }}</td>
        </tr>
        <tr class="row">
            <th class="head-cell">Пошта</th>
            <td class="data-cell">{{ user.email }}</td>
        </tr>
        <tr class="row">
            <th class="head-cell">Рівень доступа</th>
            <td class="data-cell">{{ accessLevelMap[user.accessLevel] }}</td>
        </tr>
    </table>
</template>
<script setup lang="ts">
import { AccessLevelType, MyUser } from 'src/entities/users/MyUser';

export type UserInfoProps = {
    user: MyUser;
};

const accessLevelMap: Record<AccessLevelType, string> = {
    REGULAR: 'Звичайний',
    MANAGER: 'Менеджер',
    ADMIN: 'Адміністратор',
};

defineProps<UserInfoProps>();
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.row {
    height: 32px;
}

.head-cell {
    @include font-text-small-semibold();

    text-align: start;
}

.data-cell {
    @include font-text-medium();

    padding-left: var(--spacing-20);
}
</style>
