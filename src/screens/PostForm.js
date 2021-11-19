import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from "../components/myCamera";

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost: '',
            postSubido: false
            
        }
    };

    submitPost(){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            textoPost: this.state.textoPost
        })
        .then(() => {
            this.props.drawerProps.navigation.navigate("Home"),
            console.log("Documento subido!");
        })
        .catch((error) => {
            console.error("Error escribiendo el documento: ", error);
        });
    }
  ;

    onImageUpload(url){
        this.setState({
            showCamera: false,
            url: url
        })
    }


    render(){
        return(
            <View style={styles.formContainer}>
                {
                    this.state.showCamera ?
                    <MyCamera onImageUpload={(url)=>{this.onImageUpload(url)}}/>:

              <View style={styles.formContainer}>
                <TextInput 
                    style={styles.input}
                    onChangeText={(text)=> this.setState({textoPost: text})}
                    placeholder= 'Escribí aquí'
                    keyboardType='default'
                    multiline
                    value={this.state.textoPost}
                />

                {this.state.postSubido ? 
                <Text style={styles.textButton}> Gracias su posteo ha sido creado</Text> :
                
                <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                    <Text style={styles.textButton}> Subir Post</Text>
                </TouchableOpacity>
                }
               </View> 
            }  
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
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
    }

})

export default PostForm;