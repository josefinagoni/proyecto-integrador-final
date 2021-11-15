import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            error: '',
        }
    }

    render(){
        return(
            <View style={styles.formContainer}>
                <Text> SOY EL lOGIN</Text> 
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
                <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal: 10,
        marginTop: 20,
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
    },
    textButton:{
        color: '#ccc'
    }
})

export default Login