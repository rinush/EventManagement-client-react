const LOCATION_API='https://maps.googleapis.com/maps/api/geocode/json?'

export const findLocationService=({latitude,longitude})=>
    fetch(`${LOCATION_API}`+
        new URLSearchParams({
            latlng: `${latitude},${longitude}`,
            key: 'AIzaSyCaByfHciX9BVfm6WHQVUHjBN8_pT4ls2g'
        }),{mode: "cors"})
        .then(response=> {
            console.log(('location',response))
            return(
            response.json())
        })
