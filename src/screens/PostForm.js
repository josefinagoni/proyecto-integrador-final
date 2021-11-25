import { NavigationRouteContext } from "@react-navigation/native";
import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';
import MyCamera from "../components/myCamera";
import { Icon } from 'react-native-elements';

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state={
            textoPost: '',
            postSubido: false,
            showCamera: true,
            url:''
            
        }
    };

    

    submitPost(){
        db.collection("posts").add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            texto: this.state.textoPost,
            foto: this.state.url,
           
        })
        .then(() => {
            this.setState({
                textoPost:'',
                showCamera: true,
                url:''
            })
            this.props.drawerProps.navigation.navigate("Home");
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


                { this.state.postSubido ? 
                <Text style={styles.textButton}> Gracias su posteo ha sido creado </Text> : 
                
                <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                    <Icon style={styles.icon} name="duplicate" type="ionicon" size={20} color="black"/>
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
        padding: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'pink'
        
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
        width: '100%'
    },
    icon: {
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
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
        width: '35%',
        justifyContent: 'space-around',
        marginBottom: 5,
        marginTop: 10,
    },
    textButton:{
            color: 'black',
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            width: 'auto',

    },

})

export default PostForm;