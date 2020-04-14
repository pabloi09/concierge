const header = "Como cliente solicito "
export const ways = [
    {
        value: header + "un viaje al aeropuerto desde el hotel el ",
        label: "Hotel ➡️➡️ Aeropuerto"
    },
    {
        value: header + "un viaje hotel desde el aeropuerto el ",
        label: "Aeropuerto ➡️➡️ Hotel"
    },

]

export const transformDate = (date) =>{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour:"numeric", minute:"numeric"};
    return date.toLocaleDateString("es-ES",options)
}

export const getJson = (values)=>{
    return {mensaje: values.way + transformDate(values.hour) + ".\n" + values.comment, titulo: "Shuttle"} 

}
