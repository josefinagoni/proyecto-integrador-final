import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';

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
                    placeholder= 'buscar'
                    keyboardType= 'default' />
                 <TouchableOpacity  style={styles.button} onPress={()=>this.getPosts()}
                    disabled={this.state.search =='' ? true:false}>
                        <Text style={styles.textButton}>Ingresar</Text>
                </TouchableOpacity>
                {this.state.posts ? 
                this.state.posts.length > 0 ? 
                <FlatList 
                    data= { this.state.posts }
                    keyExtractor = { post => post.id}
                    renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
                />
                :
                <Text >NO hay resultados para su busqueda</Text>
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

export default Search;
