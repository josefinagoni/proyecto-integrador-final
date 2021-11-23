import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';

class Search extends Component {
    constructor(props){
        super(props);6
        this.state = {
            posts: [],
            search: '',
        };
    }
    componentDidUpdate(){
        this.getPosts();
    }
    getPosts(){
        db.collection('posts').where('title','==',this.state.search).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id:doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        posts: posts,
                    })
                })
            }
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

export default Search;
