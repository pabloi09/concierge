// TODO 
// export function <theFunction>(...args){
//     return {type: "TYPE", ...args}
// }
export function login(json){
    return {type: "LOGIN", json}
}

export function logout(){
    return {type: "LOGOUT"}
}

export function setResources(json){
    return {type: "RESOURCES",json}
}