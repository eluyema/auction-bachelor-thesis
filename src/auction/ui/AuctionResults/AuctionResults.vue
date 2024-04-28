<template>
<div class='container'>
    <h4 class='title'>Результати</h4>
    <Desktop>
        <DesktopList :list='list'/>
    </Desktop>
    <Mobile>
        <MobileList :list='list' />
    </Mobile>
</div>
</template>

<script setup lang='ts'>
import {AuctionResult} from 'src/entities/auction';
import Desktop from 'src/shared/ui/Desktop/Desktop.vue';
import Mobile from 'src/shared/ui/Mobile/Mobile.vue';
import DesktopList from './DesktopList.vue'
import MobileList from './MobileList.vue'

export type AuctionResultsProps = {
    list: AuctionResult[];
};

const { list } = defineProps<AuctionResultsProps>();

</script>

<style scoped lang='scss'>
@import 'src/app/assets/styles/theme/index.scss';

.title {
    @include font-h2();
    margin-left: var(--spacing-8);
    margin-right: var(--spacing-8);
    margin-bottom: var(--spacing-8);

    @include desktop() {
        margin-left: 0;
        margin-right: 0;
    }
}

.container {
    background: var(--background-color-white);
    padding-top: var(--spacing-16);
    padding-bottom: var(--spacing-16);

    @include desktop() {
        padding: var(--spacing-24);
    }
}
</style>
