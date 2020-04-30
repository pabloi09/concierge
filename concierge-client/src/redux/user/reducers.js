import { combineReducers } from "redux"
 //TODO
//  const reducerName = (state = [], action) => {
//     switch (action.type) {
//         case "TYPE":
//             return action.data ......
//         default:
//             return state
const loggedIn = (state = [], action) => {
    switch (action.type) {
        case "LOGIN":
            return true
        case "LOGOUT":
            return false
        default:
            return state
    }
}

const client = (state = [],action) =>{
    switch(action.type){
        case "LOGIN":
            return action.json["cliente"]
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

const tours = (state = [],action) =>{
    switch(action.type){
        case "RESOURCES":
            return action.json["tours"] ?  action.json["tours"]:state
        case "LOGOUT":
            return []
        default:
            return state
    }
}

const hotels = (state = [],action) =>{
    switch(action.type){
        case "RESOURCES":
            return action.json["hotels"] ? action.json["hotels"]:state
        case "LOGOUT":
            return []
        default:
            return state
    }
}
const meals = (state = [],action) =>{
    switch(action.type){
        case "RESOURCES":
            return action.json["meals"] ?  action.json["meals"]:state
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

// const appData = combineReducers({
//     reducerName,
//     otherReducer,
// })
const appData = combineReducers({
    loggedIn,
    client,
    tours,
    hotels,meals
})
export default appData