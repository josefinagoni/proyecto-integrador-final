import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { Icon } from 'react-native-elements';

class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            userName: '',
            password: '',
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.title}> Registro </Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Ingrese su email'
                    keyboardType='email-address'/>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='Ingrese su usuario'
                    keyboardType='default'/>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text)=>this.setState({password: text})}
                    placeholder='Ingrese su contraseña'
                    keyboardType='email-addres'
                    secureTextEntry={true}/>
                
                <Text style={styles.textError}> {this.props.error.message} </Text>

                { this.state.email =='' || this.state.password =='' || this.state.userName == '' ? 
                <Text style={styles.textCampos}> Recuerde: Debe completar todos los campos </Text> :

                null
                }     
            
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)}
                disabled={this.state.email =='' || this.state.password =='' || this.state.userName == '' ? <Text> </Text> :false} >
                    <Icon style={styles.icon} name="log-in" type="ionicon" size={20} color="black"/>
                    <Text style={styles.textButton}>Registrarse</Text> 
                </TouchableOpacity>

               

               
            
            </View>
            
        )
    }


}

const styles = StyleSheet.create({
    formContainer:{
        marginLeft:1,
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: 'pink'
    },
    icon: {
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
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
        borderColor: 'negro',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom:500,
        width:'auto%',
        height:20,
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
export default Register;
