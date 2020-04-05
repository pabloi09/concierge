const header = "Como cliente solicito "
export const ways = [
    {
        value: header + "un viaje al aeropuerto desde el hotel ",
        label: "Hotel ➡️➡️ Aeropuerto"
    },
    {
        value: header + "un viaje hotel desde el aeropuerto ",
        label: "Aeropuerto ➡️➡️ Hotel"
    },

]

export const getHours = ()=>{
    var date = new Date()
    date.setTime(date.getTime() + 60 * 60 * 1000)
    date.setMinutes(0)
    var notAllowed = [date.getHours(), date.getHours() + 1, date.getHours() + 2]
    var result = []
    for(var i = 0; i < 24; i++){
        if(! notAllowed.includes(i)){
            date.setHours(i)
            var h = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").substring(0,5)
            result.push({
                value: "a las "+h,
                label: h
            })
        }
    }
    return result
}

