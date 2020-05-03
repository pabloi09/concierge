export default class Communication {
    constructor(){
        this.base_url = "http://localhost:8080"
    }

    createGetUrl(servlet,params){
        var result = this.base_url+servlet
        if(params){
            result += "?"
        }
        var i = 0
        for(var key in params){
            if(i>0) result+="&"
            result += key + "=" +params[key]
            i ++
        }
        return result
    }

    async makeGetRequestISO(servlet,params){
        var url = this.createGetUrl(servlet,params)
        var response = await fetch(url,{
            method: 'GET',
            credentials: "include",
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'

            }
          })
        var buffer = await response.arrayBuffer()
        var dataView = new DataView(buffer)
        var decoder = new TextDecoder("ISO-8859-1")
        response = await JSON.parse(decoder.decode(dataView))
        return response
    }

    async makeGetRequestUTF8(servlet,params){
        var url = this.createGetUrl(servlet,params)
        var response = await fetch(url,{
            method: 'GET',
            credentials: "include",
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'

            }
          })
        response = response.json()
        return response
    }

    createPostUrl(servlet){
        return this.base_url+servlet
    }

    async makePostRequestISO(servlet,params){
        var url = this.createPostUrl(servlet)
        var response = await fetch(url,{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(params), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
          })
        var buffer = await response.arrayBuffer()
        var dataView = new DataView(buffer)
        var decoder = new TextDecoder("ISO-8859-1")
        response = await JSON.parse(decoder.decode(dataView))
        return response
    }

    async makePostRequestUTF8(servlet,params){
        var url = this.createPostUrl(servlet)
        var response = await fetch(url,{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(params), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
          })
        response = response.json()
        return response
    }
}
