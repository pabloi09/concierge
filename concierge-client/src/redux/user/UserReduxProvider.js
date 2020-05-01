import React, { Component } from 'react';
import { Provider} from 'react-redux'
import GlobalState from './reducers'
import { createStore } from 'redux'
import UserApp from "../../components/UserApp"

class UserReduxProvider extends Component {

    constructor(props){
        super(props);
        this.initialState = { 
            loggedIn: false,
            client: {
                dni: "",
                nombre: "",
                afiliado:false,
                puntos:-1,
                claseCliente:"",
                habitacion:{
                    num:-1
                },
                solicitudes:[]
            },
            tours:[],
            hotels:[],
            meals:{},
            bill: {
                total: ""
            }
         };
        this.store = this.configureStore()
    }

    render() {
        return (
        <Provider store={this.store}>
            <UserApp />
        </Provider>
        );
    }

    configureStore(){
        return createStore(GlobalState, this.initialState);
    }


}

export default UserReduxProvider;