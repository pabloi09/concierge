import { combineReducers } from "redux"

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

const bill = (state = [],action) =>{
    switch(action.type){
        case "RESOURCES":
            return action.json["bill"] ?  action.json["bill"]:state
        case "LOGOUT":
            return {}
        default:
            return state
    }
}

const appData = combineReducers({
    loggedIn,
    client,
    tours,
    hotels,
    meals,
    bill
})
export default appData