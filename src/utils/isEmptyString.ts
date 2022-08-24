export default function isEmptyString(value: any) {
    return typeof value === 'string' && value === '';
}