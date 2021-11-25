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
                
                
            
                <TouchableOpacity style={styles.button} onPress={()=>this.props.register(this.state.email, this.state.password)}
                disabled={this.state.email =='' || this.state.password =='' || this.state.userName == '' ? <Text> </Text> :false} >
                    <Icon style={styles.icon} name="log-in" type="ionicon" size={20} color="black"/>
                    <Text style={styles.textButton}>Registrarse</Text> 
                </TouchableOpacity>
           
                <Text style={styles.textError}> {this.props.error.message} </Text>

                { this.state.email =='' || this.state.password =='' || this.state.userName == '' ? 
                <Text style={styles.textCampos}> Recuerde: Debe completar todos los campos </Text> :

                null
                }     

               

               
            
            </View>
            
        )
    }


}

const styles = StyleSheet.create({
    formContainer:{
        padding: 10,
        marginTop: 20,
        width: '98%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginLeft: 4, 
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
    fontWeight: '600'
    }, 
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        width: '100%',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        padding: 5,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '40%',
        justifyContent: 'space-around',
        marginBottom: 5,
        marginTop: 10,
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
