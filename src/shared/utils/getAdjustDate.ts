export const getAdjustDate = ({
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
}) => {
    const currentDate = new Date()

    currentDate.setFullYear(currentDate.getFullYear() + years)
    currentDate.setMonth(currentDate.getMonth() + months)
    currentDate.setDate(currentDate.getDate() + days)
    currentDate.setHours(currentDate.getHours() + hours)
    currentDate.setMinutes(currentDate.getMinutes() + minutes)
    currentDate.setSeconds(currentDate.getSeconds() + seconds)

    return currentDate
}
