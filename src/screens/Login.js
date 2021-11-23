import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

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

                {this.props.logueado ? 
                 <Text style={styles.button}> Gracias! Usted ya ha sido logueado </Text> :
            
                 <TouchableOpacity  style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}
                 disabled={this.state.email =='' || this.state.password =='' ? true:false}>
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>
                }

            <Text style={styles.textError}> {this.props.error.message} </Text>
               
            </View>
        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal: 10,
        marginTop: 20,
        paddingHorizontal: 10,
        marginTop: 20,
        width: '50%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginLeft: 300,
    },
    title:{
        fontSize: 22,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600'
    },
    input: {
        height: 20, 
        paddingVertical: 15, 
        paddingHorizontal: 10, 
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        width: '100%',
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 40,
    },
    textButton:{
        color: '#ccc'
    },
    textError:{
        color: 'red'
    },
    


})

export default Login