const BASE_URL="https://webdev-group-sp2101-server.herokuapp.com"

// const BASE_URL="http://localhost:8080"


export const getRecommendedEvents=()=>{
    return(fetch(`${BASE_URL}/events`)
        .then(response=> response.json()));
}

export const getRecommendedEventsOnLocation=(location)=>{
    return(fetch(`${BASE_URL}/events/venue/${location}`)
        .then(response=> response.json()));
}

export const findRecommendationsForUser=(userId)=>
    fetch(`${BASE_URL}/events/recommendations/${userId}`)
        .then(response=>response.json())


