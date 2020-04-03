import { Deal, isEmpty } from "./general"

export const BASE_GEOCODE_API = 'https://maps.googleapis.com/maps/api/geocode/json'
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || ''


// google photo urls only are good for 1 or 2 days so dynamically fetch them
export const processImageUrls = async (data: Array<Deal>) => {
    const placeIds = data.map((item: Deal) => item.placeId)

    // get all of the photo's associated with the places
    const promises: Array<Promise<string>> = placeIds.map((place: string) => {
        if (!isEmpty(place)) {
            var request: any = {
                placeId: place
            };
            const service = new google.maps.places.PlacesService(
                document.createElement("div")
            );
            return new Promise(function (resolve, reject) {

                service.getDetails(request, function (response: any, status: any) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        resolve(response.photos[0].getUrl());
                    } else {
                        // reject status upon un-successful status
                        reject(status);
                    }
                })


            })

        }

    })
    const responses: Array<string> = await Promise.all(promises)
    // add image url with reference
    data.forEach((deal: Deal, idx: number) => {
        deal.imageUrl = isEmpty(responses[idx]) ? deal.imageUrl : responses[idx]
    })
}