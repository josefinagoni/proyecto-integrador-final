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

    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
            likes:this.props.postData.data.likes.length,
            myLike: this.props.postData.data.likes.includes(auth.currentUser.email),  
        })
        }

        if(this.props.postData.data.cantComments){
            this.setState({
            cantComments:this.props.postData.data.cantComments.length,  
        })
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
                cantComments: this.props.postData.data.cantComments.length + 1
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

                <View style={styles.primerColumna}>
                <Icon style={styles.userIcon} name="person-circle" type="ionicon" size={20} color="#000"/>
            <Text style={styles.infoUser}>{this.props.postData.data.owner} </Text> 
                
                {this.props.postData.data.owner == auth.currentUser.email ? (
                 <TouchableOpacity style={styles.borrarSection} onPress={()=> this.removePost()}> 
                 <Icon style={styles.heartIcon} name="trash" type="ionicon" size={20} color="#000"/>

             </TouchableOpacity> 
            ):(
                <Text></Text>
            )} 
            </View>

             <Image style={styles.imagen} source={{uri: this.props.postData.data.foto}}/>

                <View style={styles.rows}>
                <Text style={styles.infolike}> {this.state.likes} </Text>
                {
                this.state.myLike == false ?
            
            <TouchableOpacity  style={styles.likeSection}   onPress={()=>this.darLike()}>
                 <Icon style={styles.heartIcon} name="heart-outline" type="ionicon" size={20} color="#000"/>
                 <Text > Me gusta</Text>
            </TouchableOpacity>  :
            
            <TouchableOpacity style={styles.likeSection}  onPress={()=>this.borrarLike()}>
               <Icon style={styles.heartIcon} name="heart" type="ionicon" size={20} color="red"/>
               <Text >Quitar like</Text>
           </TouchableOpacity>
             
            }
            <Text style={styles.commentInfo}>{this.state.cantComments} </Text>
         
            <TouchableOpacity style={styles.commentSection} onPress={()=>this.showModal()}>
                <Icon style={styles.commentIcon} name="chatbubble-ellipses" type="ionicon" size={20} color="#000"/>
            </TouchableOpacity>
                </View>

                <View style={styles.columna}>
                    <Icon style={styles.textIcon} name="document-text" type="ionicon" size={20} color="#000"/>
                    <Text style={styles.textoPost}>{this.props.postData.data.texto}</Text>
                </View>

                <TouchableOpacity  style={styles.columna} onPress={()=>this.showModal()}>
                    <Icon style={styles.commentIcon2} name="chatbubble-ellipses" type="ionicon" size={20} color="#000"/>
                    <Text style={styles.infoComment} >Ver Comentarios</Text>
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
                    renderItem = { ({item}) => <Text> @{item.author}:   {item.comment}</Text> } 
                    style={styles.cadaComment}
                    
                />
                :
                <Text style={styles.texto}> Todavia no hay comentarios. Se el primero en comentar </Text> 
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
        marginBottom: 10,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        width: '100%',
        height: 'auto',
        marginTop: 10,
        backgroundColor: 'white'
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
        backgroundColor: 'pink',
        width: '100%',
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
        paddingVertical:15,
        paddingHorizontal: 10,
        width: '100%',
        borderWidth:1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,

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
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        
      
    },
    commentSection: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        
      
    },
    borrarSection: {
        flex: 5,
        flexDirection: 'row',
        alignItems: 'left',
        marginBottom: 20,
        
      
    },
    heartIcon: {
        padding: 10,
    },
    userIcon: {
        padding: 10,
        width: '10%', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 3,
    },
    textIcon: {
        paddingRight: 10,
        width: '10%', 
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 2,
    },
    primerColumna:{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 5

    },
    columna:{
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-around',
        marginBottom: 5

    },
    infoPost:{
        padding: 10,

    },
    infoUser:{
        flex: 3,
        padding: 10,
        width: '90%', 
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    textoPost:{
        flex: 2,
        width: '90%', 
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    infoComment:{
        flex: 2,
        width: '90%', 
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    infoLike:{
        flex: 3,
        marginLeft: 10,
        flexDirection: 'column',
        alignItems: 'right',
        


    },
    commentIcon:{
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',


    },
   commentIcon2: {
    paddingRight: 10,
    width: '10%', 
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 2,
    },
    
    imagen:{
        height: 200,
        marginTop: 20,
        marginBottom: 15,

    },
    rows:{
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
        

    },
    eachRow:{
        width: '50%', 
        flexDirection: 'row',

    },
    texto:{
        marginBottom: '1px'
    }

})


export default Post;
