import {findLocationService} from '../services/navBar-service'
import _ from 'lodash'
export const GET_LOCATION="GET_LOCATION";
export const SET_LOADING="SET_LOADING"

export const findLocation=(dispatch,location)=>{
    findLocationService(location)
        .then(response=>dispatch({
            type: GET_LOCATION,
            location: _.trim(_.split((response.results[0].formatted_address),',')[1],' ')
        }))
}

export const setLoading=(dispatch,loading)=>{
    dispatch({
        type: SET_LOADING,
        loading
    })
}