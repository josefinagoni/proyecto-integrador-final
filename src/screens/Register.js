import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

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
                <Text> Registro </Text>
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
                
                {this.props.registrado ? 
                <Text style={styles.button}> Gracias! Usted ya ha sido registrado </Text> :
            
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)}
                disabled={this.state.email =='' || this.state.password =='' || this.state.userName == '' ? true:false} >
                    <Text style={styles.textButton}>Registrarse</Text>      
                </TouchableOpacity>
            }
                <Text style={styles.textError}> Error: {this.props.error} </Text>
            
            </View>
            
        )
    }


}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal: 10,
        marginTop: 20,
        
        
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    },
    textError:{
        color: 'red'
    }
})
export default Register;
