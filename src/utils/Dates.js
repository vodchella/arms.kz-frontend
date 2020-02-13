import moment from 'moment-timezone'

export const formatDate = (dateString, timeZone) => {
    if (dateString) {
        const date = moment.tz(dateString, timeZone)
        return date.format('DD MMM YYYY')
    }
}
