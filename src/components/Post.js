import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            likes: 0,
            myLike: false,
            showModal: false,
            comment: ''
        }
    }

//componentDidMount(){
   // if (this.props.postData.data.likes.length) {
            
 // }
//}

    darLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( ()=> {
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: true,
            })
        })
    }

    borrarLike(){
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then( ()=> {
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: false
            })
        })
    }
    showModal(){
        this.setState({
            showModal:true,
        })
    }

    hideModal(){
        this.setState({
            showModal:false,
        })
    }

    guardarComentario(){
        console.log('Guardadno comentario...');
        let oneComment = {
            createdAt: Date.now(),
            author: auth.currentUser.email,
            comment: this.state.comment, 
        }
        //identifacar el documento que queremos modificar.
         db.collection('posts').doc(this.props.postData.id).update({
           comments:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })

    }

    render(){
        return(
            <View style={styles.contanier}>
             <Text>Texto del post: {this.props.postData.data.texto}</Text>
             <Text>User: {this.props.postData.data.owner} </Text>  
             <Text> Likes:{this.state.likes} </Text>

            {
                this.state.myLike == false ?
            
            <TouchableOpacity onPress={()=>this.darLike()}>
                 <Text >Me gusta</Text>
            </TouchableOpacity>  :
            
            <TouchableOpacity onPress={()=>this.borrarLike()}>
               <Text >Quitar like</Text>
           </TouchableOpacity>
             
            }
            <TouchableOpacity onPress={()=>this.showModal()}>
                <Text>Ver Comentarios</Text>
            </TouchableOpacity>

            {/* Modal para comentarios */}
            {   this.state.showModal ?
                <Modal
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                >   
                    <TouchableOpacity onPress={()=>this.hideModal()}>
                        <Text>X</Text>
                    </TouchableOpacity> 
                    <Text>Dentro del modal</Text>

                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput placeholder="Comentar..."
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                        />
                        <TouchableOpacity onPress={()=>{this.guardarComentario()}}>
                            <Text>Guadar comentario</Text>
                        </TouchableOpacity>
                    </View>

                </Modal>    :
                <Text></Text>
            } 


            </View>
        )
    }

}
const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
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
    buttonNo:{
        backgroundColor:'red',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },

})

export default Post;
