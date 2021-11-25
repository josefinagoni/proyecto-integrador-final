import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            error: '',
            userName: '',
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>

                <Text style={styles.title}> Login</Text> 
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder= 'email'
                    keyboardType= 'email-address' />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />

                <Text style={styles.textError}> {this.props.error.message} </Text>

                    { this.state.email =='' || this.state.password =='' || this.state.userName == '' ? 
                <Text style={styles.textCampos}> Recuerde: Debe completar todos los campos </Text> :

                     null
                    }  

            
                 <TouchableOpacity  style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}
                 disabled={this.state.email =='' || this.state.password =='' ? 
                 <Text> </Text> : false}>

                     <Icon style={styles.icon} name="log-in" type="ionicon" size={20} color="black"/>
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>

                   
               
            </View>
        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal:10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: 'pink'
    },
    
    title:{
    fontSize: 22,
    textAlign: 'left',
    color: 'black',
    fontWeight: '600',
    marginTop: 5

    }, 
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        width: '100%',
        borderWidth:1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    icon: {
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    button:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'green',
        marginTop: 30,
        borderRadius: 4,
        marginBottom:500,
        width:'auto',
        height: 30,
        justifyContent:'space-around'
    },
    textButton:{
            color: 'black',
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            width: 'auto',

    },
    textError:{
        color: 'red'
    },
    textCampos:{
        color: 'black'
    }


})

export default Login