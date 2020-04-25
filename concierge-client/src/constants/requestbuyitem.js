const header = "Como cliente solicito la compra de "
export const getJson = (values)=>{
    return {
        mensaje: header + values.item + " \nComentarios: " + values.comment,
        titulo: "compra de artículo(s)"
    } 
}

export const available_products = [
    'Flores',
    'Bombones',
    'Aspirinas',
    'Otros (especificar)'
]
