import moment from 'moment'

export { trim } from '@/utils'

export function format(date, fmt) {
    return date ? moment(date).format(fmt) : '';
}