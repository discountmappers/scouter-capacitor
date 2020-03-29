// explicit check for different types considered to be empty
export const isEmpty = (value: any) => {
    if (typeof value === 'string') {
        value = value.trim()
    }

    return (
        value === null ||
        value === undefined ||
        value === false ||
        (value.constructor === Array && value.length === 0) ||
        value === '' ||
        (value.constructor === Object && Object.keys(value).length === 0)
    )
}
export enum SearchView {
    LIST = "List", MAP = "Map"
}