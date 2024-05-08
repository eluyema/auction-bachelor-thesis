import { AuctionRound, AuctionRoundStatus, AuctionType } from 'src/entities/auction';
import { VerticalListItemProps } from 'src/shared/ui/VerticalList/VerticalListItem.vue';

class AuctionRoundsMapper {
    static mapToVerticalListItems(
        results: AuctionRound[],
        options = { showLabelForMax: false },
    ): VerticalListItemProps[] {
        return results.map((result) => this.mapRoundToVerticalListItem(result, options));
    }

    private static mapRoundToVerticalListItem(
        result: AuctionRound,
        options = { showLabelForMax: false },
    ): VerticalListItemProps {
        const { showLabelForMax } = options;
        if (!result.announced) {
            return {
                id: result.id,
                iconProps: {
                    iconName: 'circle',
                },
                name: result.name,
                tableData: [],
            };
        }

        const tableData = [{ key: 'Повна ціна, грн:', value: result.fullPrice }];

        if (result.auctionType === AuctionType.NON_PRICE_CRITERIA) {
            tableData.push(
                { key: 'Коефіцієнт: ', value: result.coefficient },
                { key: 'Приведена ціна, грн:', value: result.enteredPrice },
            );
        }

        const labelValue = this.getLabelValue(result, showLabelForMax);
        const iconProps = this.getIconProps(result);
        const bordered = this.getBorderedValue(result);

        return {
            id: result.id,
            iconProps,
            name: result.name,
            tableData,
            labelValue,
            labelProps: { colorVariant: 'primary', textShape: 'contained' },
            bordered,
        };
    }

    private static getLabelValue(
        data: AuctionRound,
        showLabelForMax: boolean,
    ): 'максимум' | 'мінімум' | null {
        if (!data.announced) {
            return null;
        }

        if (showLabelForMax && data.isMax) {
            return 'максимум';
        }

        if (!showLabelForMax && data.isMin) {
            return 'мінімум';
        }

        return null;
    }

    private static getIconProps(data: AuctionRound): VerticalListItemProps['iconProps'] {
        const roundStatus: AuctionRoundStatus = data.status;

        switch (roundStatus) {
            case AuctionRoundStatus.PENDING:
                return {
                    iconName: 'circle',
                };
            case AuctionRoundStatus.ACTIVE_BIDDING:
                return {
                    iconName: 'arrow_circle_down',
                    colorVariant: 'success',
                };
            case AuctionRoundStatus.ABOUT_TO_CLOSE:
                return {
                    iconName: 'schedule',
                    colorVariant: 'primary',
                };
            default:
                return {
                    iconName: 'done',
                    colorVariant: 'success',
                };
        }
    }

    private static getBorderedValue(data: AuctionRound) {
        if (!data.announced) {
            return false;
        }

        if (data.status === AuctionRoundStatus.ABOUT_TO_CLOSE) {
            return true;
        }

        return false;
    }
}

export { AuctionRoundsMapper };
