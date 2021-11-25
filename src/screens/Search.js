import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';
import { Icon } from 'react-native-elements';

class Search extends Component {
    constructor(props){
        super(props);6
        this.state = {
            posts: null,
            search: '',
        };
    }
    
    getPosts(){
        console.log('hola');
        db.collection('posts').where('owner','==',this.state.search).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id:doc.id,
                        data: doc.data()
                    })
                })
                console.log(posts)
                this.setState({
                    posts: posts,
                })
            }
        )
    }
    render(){
        return(
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({search: text})}
                    placeholder= 'Busqueda de emails de usuarios...'
                    keyboardType= 'default' />
                 <TouchableOpacity  style={styles.button} onPress={()=>this.getPosts()}
                    disabled={this.state.search =='' ? true:false}>
                        <Icon style={styles.icon} name="search" type="ionicon" size={20} color="black"/>
                        <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>
                {this.state.posts ? 
                this.state.posts.length > 0 ? 
                <FlatList 
                    data= { this.state.posts }
                    keyExtractor = { post => post.id}
                    renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
                />
                :
                <Text style={styles.textError} >No hay resultados para su busqueda</Text>
                :
                null
                }

            </View>
        
    )}
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
    },
    input:{
        height:75,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
        width: '100%'
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
        width: '30%',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    textButton:{
        color: 'black',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
        fontWeight: '400'
       
      
    },
    icon: {
        padding: 5,
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
    },
    textError:{
        color: 'red'
    },

})

export default Search;
