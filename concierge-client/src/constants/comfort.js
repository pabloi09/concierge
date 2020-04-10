const header = "Como cliente solicito "
export const comfort = [
    {
        value: header + "una almohada extra",
        label: "Almohada extra"
    },
    {
        value: header + "una toalla de ducha",
        label: "Toalla de ducha"
    },
    {
        value: header + "un kit de higiene",
        label: "Champú, gel, pasta de dientes..."
    },
    {
        value: header + "una manta extra",
        label: "Manta extra"
    },
    {
        value: header + "un tomacorrientes universal",
        label: "Tomacorrientes universal"
    },
    {
        value: header + "un kit de costura",
        label: "Kit de costura"
    },
    {
        value: header + "material de escritorio",
        label: "Papel, bolígrafo, sobres de carta..."
    },
    {
        value: header + "un secador",
        label: "Secador"
    },
    {
        value: header + "una placha y una tabla de planchar",
        label: "Plancha y tabla de planchar"
    },
    {
        value: header + "la prensa del día",
        label: "Prensa del día"
    },
    {
        value: header + "un cargador de móvil",
        label: "Cargador de móvil"
    },
]

export const getJson = (values)=>{
    return {mensaje: values.element + ".\n" + values.comment}
}