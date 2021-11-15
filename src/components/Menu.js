import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { auth } from '../firebase/config';



const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn:true,
                    user: user,
                })
            }
        })
    }

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
            .then( response => {
                this.setState({
                    loggedIn: true,
                    user:response.user,
                })
            })
            .catch(e => console.log(e))
    }

    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
            .then( ()=>{
                console.log('Registrado');
            })
            .catch( error => {
                console.log(error);
            })
    }

    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={()=><Home />} />
                    <Drawer.Screen name="Registro" component={()=><Register register={(email, pass)=>this.register(email, pass)}/>} />
                    <Drawer.Screen name="Login" component={()=><Login />}/>

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu