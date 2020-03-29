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

export const mockResults = [
    {

        "name": "Talia's Steakhouse and Bar",
        "dealDesc": "20% off lunch",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 40.791929,
        "lng": -73.972145,
        "address": '668 Amsterdam Avenue, New York',
        "category": 'Food',
    },
    {

        "name": "Starbucks Deal",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Coffee',
    },
    {

        "name": "Peacefood Cafe",
        "dealDesc": "20% off Venti Americano",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 40.785275,
        "lng": -73.977012,
        "address": '460 Amsterdam Avenue, New York',
        "category": 'Food',
    },
    {

        "name": "Amsterdam Ale House",
        "dealDesc": "Buy one get one",
        "notes": "7 days a week",
        "lat": 40.7814218,
        "lng": -73.97995449999999,
        "address": '340 Amsterdam Avenue, New York',
        "category": 'Food',
    },
    {

        "name": "The Carlyle",
        "dealDesc": "5% off",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 40.774416,
        "lng": -73.96315589999999,
        "address": '35 East 76th Street, New York',
        "category": 'Services',
    },
    {

        "name": "Applebees",
        "dealDesc": "20% off apps",
        "notes": "Onle applicable in Union Square Stores",
        "lat": 89,
        "lng": 90,
        "address": '146 forest',
        "category": 'Food',
    }
]
