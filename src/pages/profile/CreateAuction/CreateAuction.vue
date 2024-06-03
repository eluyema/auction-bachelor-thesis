<template>
    <TabsPageWrapper :tabs="tabs" :activeTabName="activeTabName">
        <RouterLink to="/profile/auctions">
            <CustomButton>Повернутись до списку аукціонів</CustomButton>
        </RouterLink>
        <h2 class="title">Створити аукціон</h2>
        <form class="create-auction-form" @submit.prevent="validateAndCreateAuction">
            <div class="field">
                <textarea
                    class="field-textarea"
                    placeholder="Назва аукціона"
                    v-model="formInput.name"
                />
            </div>
            <div class="field">
                <CustomInput
                    class="field-input"
                    v-model="formInput.customerName"
                    label="Замовник"
                />
            </div>
            <div class="field">
                <CustomInput
                    class="field-input"
                    v-model="formInput.purchaseCode"
                    label="Номер закупівлі"
                />
            </div>
            <div class="field">
                <select class="select" v-model="formInput.auctionType">
                    <option :value="AuctionType.DEFAULT">Звичайний аукціон</option>
                    <option :value="AuctionType.ESCO">ЕСКО аукціон</option>
                    <option :value="AuctionType.NON_PRICE_CRITERIA">
                        Аукціон з неціновими критеріями
                    </option>
                </select>
            </div>
            <div class="field" v-if="formInput.auctionType === AuctionType.ESCO">
                <CustomInput
                    class="field-input"
                    v-model="formInput.cashFlow"
                    label="Грошовий потік за рік"
                />
            </div>
            <div class="field">
                <CustomInput
                    class="field-input"
                    v-model="formInput.expectedCost"
                    label="Очікувана вартість"
                />
            </div>
            <div class="field">
                <CustomInput
                    class="field-input"
                    v-model="formInput.decreaseStep"
                    label="Крок зменшення"
                />
            </div>
            <div class="field">
                <CustomInput
                    v-model="formInput.timeForRoundInSecs"
                    class="field-input"
                    label="Кількість секунд на хід"
                />
            </div>
            <div class="field">
                <VueDatePicker
                    placeholder="Час початку аукціона"
                    v-model="formInput.auctionStartAt"
                />
            </div>
            <div class="field">
                <VueDatePicker
                    placeholder="Час першого раунду"
                    v-model="formInput.firstRoundStartAt"
                />
            </div>
            <p class="error-text" v-if="isError">
                Некоректно заповнені дані в формах. Перевірте чи всі поля заповнені
            </p>
            <CustomButton type="sumbit" class="submit-button"> Створити аукціон </CustomButton>
        </form>
    </TabsPageWrapper>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/auth/store/useAuthStore';
import { AuctionType } from 'src/entities/auction';
import { myAuctionsTab, selectAvailableTabs } from 'src/entities/profile/tabs';
import CustomInput from 'src/shared/ui/CustomInput/CustomInput.vue';
import TabsPageWrapper from 'src/shared/ui/TabsPageWrapper/TabsPageWrapper.vue';
import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
import { date, number, object, string } from 'yup';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CustomButton from 'src/shared/ui/CustomButton/CustomButton.vue';
import { CreateAuctionDto } from 'src/auction/services/dto/createAuctionDto';
import { useManagerAuctionStore } from 'src/auction/store/managerAuctionStore';
import { LoadingStatuses } from 'src/entities/application';
import { RouterLink, useRouter } from 'vue-router';

const authStore = useAuthStore();
const managerAuctionStore = useManagerAuctionStore();
const router = useRouter();

const tabs = computed(() => {
    const user = authStore.state.user;

    if (!user) {
        return [];
    }

    return selectAvailableTabs(user.accessLevel);
});

const activeTabName = myAuctionsTab.name;

const getFormSchema = (auctionType: AuctionType) => {
    if (auctionType === AuctionType.ESCO) {
        return object({
            name: string().required(),
            auctionType: string()
                .oneOf([AuctionType.DEFAULT, AuctionType.ESCO, AuctionType.NON_PRICE_CRITERIA])
                .required(),
            purchaseCode: string().required(),
            customerName: string().required(),
            cashFlow: number().required(),
            expectedCost: number().integer().required(),
            decreaseStep: number().integer().required(),
            auctionStartAt: date().required(),
            firstRoundStartAt: date().required(),
            timeForRoundInSecs: number().min(0).integer().required(),
        });
    }

    return object({
        name: string().required(),
        auctionType: string()
            .oneOf([AuctionType.DEFAULT, AuctionType.ESCO, AuctionType.NON_PRICE_CRITERIA])
            .required(),
        purchaseCode: string().required(),
        customerName: string().required(),
        expectedCost: number().integer().required(),
        decreaseStep: number().integer().required(),
        auctionStartAt: date().required(),
        firstRoundStartAt: date().required(),
        timeForRoundInSecs: number().min(0).integer().required(),
    });
};

const formInput = reactive({
    name: '',
    auctionType: AuctionType.DEFAULT,
    purchaseCode: '',
    customerName: '',
    cashFlow: '',
    expectedCost: '',
    decreaseStep: '',
    auctionStartAt: '',
    firstRoundStartAt: '',
    timeForRoundInSecs: '40',
});

const formSchema = computed(() => {
    return getFormSchema(formInput.auctionType);
});

const isError = ref(false);

const validateAndCreateAuction = async () => {
    try {
        await formSchema.value.validate(formInput);

        isError.value = false;
        if (formInput.auctionType === AuctionType.ESCO) {
            const dto: CreateAuctionDto = {
                name: formInput.name,
                auctionType: formInput.auctionType,
                purchaseCode: formInput.purchaseCode,
                customerName: formInput.customerName,
                cashFlow: Number(formInput.cashFlow),
                expectedCost: Number(formInput.expectedCost),
                decreaseStep: Number(formInput.decreaseStep),
                auctionStartAt: new Date(formInput.auctionStartAt).toJSON(),
                firstRoundStartAt: new Date(formInput.firstRoundStartAt).toJSON(),
                timeForRoundInSecs: Number(formInput.timeForRoundInSecs),
            };

            managerAuctionStore.createAuction(dto);
        } else {
            const dto: CreateAuctionDto = {
                name: formInput.name,
                auctionType: formInput.auctionType,
                purchaseCode: formInput.purchaseCode,
                customerName: formInput.customerName,
                expectedCost: Number(formInput.expectedCost),
                decreaseStep: Number(formInput.decreaseStep),
                auctionStartAt: new Date(formInput.auctionStartAt).toJSON(),
                firstRoundStartAt: new Date(formInput.firstRoundStartAt).toJSON(),
                timeForRoundInSecs: Number(formInput.timeForRoundInSecs),
            };

            managerAuctionStore.createAuction(dto);
        }
    } catch (error) {
        isError.value = true;
        console.error('Validation error:', error);
    }
};

watch(
    () => managerAuctionStore.state.createAuctionStatus,
    () => {
        if (managerAuctionStore.state.createAuctionStatus !== LoadingStatuses.FULFILLED) {
            return;
        }

        router.push('/profile/auctions');
    },
);

onBeforeMount(() => {
    managerAuctionStore.state.createAuctionStatus = LoadingStatuses.IDLE;
});
</script>
<style scoped lang="scss">
@import 'src/app/assets/styles/theme/index.scss';

.title {
    @include font-h1();
    margin-top: var(--spacing-16);
}

.create-auction-form {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-top: var(--spacing-12);
}

.select {
    border: 1px solid var(--color-stroke-grey);
    padding: var(--spacing-8) var(--spacing-12);

    &:focus {
        border-color: var(--color-stroke-green);
        outline: none;
    }
}

.submit-button {
    margin-top: var(--spacing-12);
}

.field {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-bottom: var(--spacing-4);
}

.field-input {
    min-width: 350px;
}

.field-textarea {
    border: 1px solid var(--color-stroke-grey);
    padding: var(--spacing-8) var(--spacing-12);
    flex: 1;
    min-height: 100px;
    min-width: 600px;
}

.error-text {
    margin-top: var(--spacing-8);
    color: var(--color-stroke-red);
}
</style>
