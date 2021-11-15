import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';
import PostForm from '../screens/postForm';
import { auth } from '../firebase/config';



const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={
            registrado: false,
            error: '',
            loggedIn: false,
            user: '',

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
            .then( (response) => {
                this.setState({
                    registrado: true
                })
            }
            )
            .catch( error => {
               this.setState({
                   error: error
               });
            })
    }

    render(){
        return(
            <NavigationContainer>
                {this.state.loggedIn == false ? 
            <Drawer.Navigator>
                <Drawer.Screen name="Registro" component={()=><Register register={(email, pass)=>this.register(email, pass)} registrado={this.state.registrado} error={this.state.error}/>} />
                <Drawer.Screen name="Login" component={()=><Login />}/>
            </Drawer.Navigator> :

            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={()=><Home />} />
                <Drawer.Screen name ="New Post" component={(drawerProps)=><PostForm drawerProps={drawerProps}/>}/>
            </Drawer.Navigator> }
            
            </NavigationContainer>
        )
    }
}

export default Menu