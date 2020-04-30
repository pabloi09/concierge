const header = "Como cliente solicito la compra de "
export const getJson = (values)=>{
    return {
        mensaje: header + values.item + " \nComentarios: " + values.comment,
        titulo: "compra de " + values.item
    } 
}

export const available_products = [
    'Flores',
    'Bombones',
    'Aspirinas',
    'Masaje',
    'Alquiler de coche',
    'Billetes de avión',
    'Billetes de tren',
    'Vestuario',
    'Regalo',
    'Souvenir',
    'Otros (especificar)'
]
