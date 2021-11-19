import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { auth, db} from '../firebase/config';
import Post from '../components/Post';

class Search extends Component {
    constructor(props){
        super(props);
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

export default Search;
