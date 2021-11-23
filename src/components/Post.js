import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image,} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            likes: 0,
            myLike: false,
            showModal: false,
            comment: '',
            comentarios: [],
            cantComments: 0,
            
            
        }
    }


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
           comment:firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then( res =>{
            this.setState({
                comment:'',
                cantComments: this.state.cantComments + 1
            })
        })
        .catch(e => console.log(e))

    }

    removePost() {
      db.collection('posts').doc(this.props.postData.id).delete()
      .then(()=>{
          console.log('borrado')
      })   
      }


    render(){
        return(
            <View style={styles.contanier}>
             <Image style={styles.imagen} source={{uri: this.props.postData.data.foto}}/>

             <Text style={styles.infoPost}>Texto del post: {this.props.postData.data.texto}</Text>
             <Text style={styles.infoPost}>User: {this.props.postData.data.owner} </Text>  
             <Text style={styles.infoPost}> Likes:{this.state.likes} </Text>
             <Text style={styles.infoPost}> Comentarios: {this.state.cantComments} </Text>
             
            {this.props.postData.data.owner == auth.currentUser.email ? (
                 <TouchableOpacity onPress={()=> this.removePost()}> 
                 <Text style={styles.infoPost}> Borrar Posteo</Text>
             </TouchableOpacity> 
            ):(
                <Text></Text>
            )} 
           

            {
                this.state.myLike == false ?
            
            <TouchableOpacity style={styles.likeSection}  onPress={()=>this.darLike()}>
                 <Icon style={styles.heartIcon} name="heart-outline" type="ionicon" size={20} color="#000"/>
                 <Text > Me gusta</Text>
            </TouchableOpacity>  :
            
            <TouchableOpacity  style={styles.likeSection} onPress={()=>this.borrarLike()}>
               <Icon style={styles.heartIcon} name="heart" type="ionicon" size={20} color="red"/>
               <Text >Quitar like</Text>
           </TouchableOpacity>
             
            }

            <TouchableOpacity onPress={()=>this.showModal()}>
                <Text style={styles.infoPost} >Ver Comentarios</Text>
            </TouchableOpacity>

            {/* Modal para comentarios */}
            {   this.state.showModal ?
                <Modal
                    visible={this.state.showModal}
                    animationType='slide'
                    transparent={false}
                    
                >   

                <View style={styles.modal}>

                    <TouchableOpacity onPress={()=>this.hideModal()}>
                        <Text style={styles.borrarC}>X</Text>
                    </TouchableOpacity> 

                    <Text style={styles.title}>Comentarios</Text>
                    
                    {/* Lista de comentarios */}
                    {this.props.postData.data.comment && this.props.postData.data.comment.length > 0 ?
                    <FlatList 
                    data= {this.props.postData.data.comment}
                    keyExtractor = { oneComment => oneComment.id}
                    renderItem = { ({item}) => <Text> @{item.author}: {item.comment}</Text> } 
                    style={styles.cadaComment}
                    // //Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
                />
                :
                <Text> Todavia no hay comentarios. Se el primero en comentar </Text> 
                }
                    


                    {/* Formulario para nuevo comentarios */}
                    <View>
                        <TextInput placeholder="Escribe tu comentario"
                            keyboardType="default"
                            multiline
                            onChangeText={text => this.setState({comment: text})}
                            value={this.state.comment}
                            style={styles.comentar}
                        />
                        <TouchableOpacity style={styles.button} onPress={()=>{this.guardarComentario()}}
                        disabled={this.state.comment =='' ? true:false}>
                            <Text style={styles.textButton}>Comentar</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor:'#7b68ee',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#7b68ee',
        marginTop: 20,
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
    textButton:{
        color: '#ccc'
    },
    modal:{
       flex: 2,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
        backgroundColor: '#48d1cc',
        width: 300,
        height: 100,
       
    },
    borrarC:{
        textAlign: 'left',
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'black'
    },
    comentar:{
        height: 20, 
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
  
    },
    cadaComment:{
        marginTop: 20,
        marginBottom: 20,
    },
    title:{
        fontSize: 22,
        textAlign: 'left',
        color: 'black',
        fontWeight: '600'
    },
    likeSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        
      
    },
    heartIcon: {
        padding: 10,
    },
    infoPost:{
        padding: 10,

    },
    imagen:{
        height: 200,
    }

})


export default Post;
