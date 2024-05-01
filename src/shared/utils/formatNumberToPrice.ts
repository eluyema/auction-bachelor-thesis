export function formatNumberToPrice(num: number) {
    let formatted = new Intl.NumberFormat('de-DE', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num)

    formatted = formatted.replace(/\./g, ' ')

    return formatted
}
