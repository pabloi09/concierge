export default class Communication {
    constructor(){
        this.base_url = "http://localhost:8080/concierge_server_war_exploded/"
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

    async makeGetRequest(servlet,params){
        var url = this.createGetUrl(servlet,params)
        var response = await fetch(url,{
            method: 'GET',
            credentials: "include",
          })
        response = await response.json()
        return response
    }

    createPostUrl(servlet){
        return this.base_url+servlet
    }

    async makePostRequest(servlet,params){
        var url = this.createPostUrl(servlet)
        var response = await fetch(url,{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(params), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
          })
        response = await response.json()
        return response
    }
}