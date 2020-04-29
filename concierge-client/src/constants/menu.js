import carta from "./carta.json"
const header = "Como cliente solicito un/una "
var array = []
Object.keys(carta).forEach((key)=>{
    array.push({title:key,meals:carta[key]})
})
export const menu = array.map(section=>{
    section.meals = section.meals.map(meal=>{
        meal.value = header + meal.descripcion
        return meal
    })
    return section
})


export const getJson = (values)=>{
    return {mensaje: values.element + ".\n" + values.comment, titulo: "Productos de la carta"}
}