const header = "Como cliente solicito "
export const incidents = [
    {
        value: header + "arreglar las ventanas",
        label: "Ventanas"
    },
    {
        value: header + "arreglar la ducha",
        label: "Ducha"
    },
    {
        value: header + "arreglar el grifo",
        label: "Grifo"
    },
    {
        value: header + "arreglar la caja fuerte",
        label: "Caja fuerte"
    },
    {
        value: header + "arreglar la puerta",
        label: "Puerta"
    },
    {
        value: header + "arreglar la iluminación",
        label: "Iluminación"
    },
    {
        value: header + "arreglar la cama",
        label: "Cama"
    },
    {
        value: header + "arreglar el inodoro",
        label: "Inodoro"
    },
    {
        value: header + "ver descipción",
        label: "Otro"
    },
]

export const getJson = (values)=>{
    return {mensaje: values.element + ".\n" + values.comment, titulo: "Incidencias"}
}