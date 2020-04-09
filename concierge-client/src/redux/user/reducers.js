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
    client
})
export default appData