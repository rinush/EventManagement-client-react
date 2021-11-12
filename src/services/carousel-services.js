const BASE_URL="https://webdev-group-sp2101-server.herokuapp.com"
// const BASE_URL="http://localhost:8080"

export const getTrendingEvents=()=>{
    return(fetch(`${BASE_URL}/events/trending`)
        .then(response=> response.json()));
}

