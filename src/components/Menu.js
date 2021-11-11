import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Register from '../screens/Register';
import Login from '../screens/Login';

const Drawer = createDrawerNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={

        }
    }

    render(){
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={()=><Home />} />
                    <Drawer.Screen name="Registro" component={()=><Register />} />
                    <Drawer.Screen name="Login" component={()=><Login />}/>

                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

export default Menu