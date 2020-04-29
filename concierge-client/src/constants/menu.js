import carta from "./carta.json"
const header = "Como cliente solicito: \n"
var array = []
Object.keys(carta).forEach((key)=>{
    array.push({title:key,meals:carta[key]})
})
export const menu = array.map(section=>{
    section.meals = section.meals.map(meal=>{
        meal.value = meal.descripcion
        return meal
    })
    return section
})


export const getJson = (values)=>{
    return {mensaje: getItems(values.menu) + "\n" + values.comment, titulo: "Productos de la carta"}
}

function getItems(items){
    var result = header + ""
    items.forEach(item=>{
        result += "- " + item.number + " de " + item.item.descripcion + "\n" 
    })
    return result
}