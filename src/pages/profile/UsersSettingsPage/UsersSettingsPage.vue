<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <UserSearchForm
            @search="onSearchUser"
            :pendingForm="usersSearchStore.state.searchStatus === LoadingStatuses.PENDING"
        />
        <div class="user-container">
            <div v-if="usersSearchStore.state.isNotFound">
                <span class="not-found-text"
                    >Юзера з поштою "{{ usersSearchStore.state.lastSearchEmail }}" не знайдено</span
                >
            </div>
            <UserEditorForm
                v-else-if="userUpdatedata"
                :user="userUpdatedata"
                @updateUser="onUpdateUser"
                updateError=""
            />
            <CustomLabel
                v-if="usersSearchStore.state.updateStatus === LoadingStatuses.FULFILLED"
                class="success-updated-text"
                colorVariant="success"
                >Користувач успішно оновлений</CustomLabel
            >
        </div>
    </TabsPageWrapper>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store';
import { LoadingStatuses } from 'src/entities/application';
import { selectAvailableTabs, usersSettingsTab } from 'src/entities/profile/tabs';
import { User } from 'src/entities/users/MyUser';
import CustomLabel from 'src/shared/ui/CustomLabel/CustomLabel.vue';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import { useUsersSettingsStore } from 'src/users/store/usersSettingsStore';
import UserEditorForm from 'src/users/ui/UserEditorForm/UserEditorForm.vue';
import UserSearchForm from 'src/users/ui/UserSearchForm/UserSearchForm.vue';
import { computed } from 'vue';

const authStore = useAuthStore();

const usersSearchStore = useUsersSettingsStore();

const onSearchUser = (data: { email: string }) => {
    usersSearchStore.findByEmail(data);
};

const onUpdateUser = (data: Omit<User, 'id'>) => {
    usersSearchStore.updateUser(data);
};

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = usersSettingsTab.name;

const userUpdatedata = computed(() => {
    const user = usersSearchStore.state.user;

    if (!user) {
        return null;
    }
    return {
        name: user.name,
        email: user.email,
        accessLevel: user.accessLevel,
    };
});
</script>
<style lang="scss" scoped>
@import 'src/app/assets/styles/theme/index.scss';

.user-container {
    margin-top: var(--spacing-24);

    & .not-found-text {
        @include font-text-large();
    }
}

.success-updated-text {
    margin-top: var(--spacing-24);
}
</style>
