import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import{db, auth} from '../firebase/config';
import Post from '../components/Post'


class Home extends Component{
    constructor(props){
      super(props);
      this.state ={
        posteos: [],
      }
    }
    componentDidMount(){
      console.log('En didMount de Home');
      db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
        docs => {
          console.log(docs);
          //Array para crear datos en formato más útil.
          let posts = [];
          docs.forEach( doc => {
            posts.push({
              id: doc.id,   
              data: doc.data(),
            })
          })
          console.log(posts);
  
          this.setState({
            posteos: posts,
          })
        }
      )
    }

    
  
    render(){
      return(
        <View style={styles.container}>
          <FlatList 
            data= { this.state.posteos }
            keyExtractor = { post => post.id}
            renderItem = { ({item}) => <Post postData={item} />} // <Text>{item.data.texto}</Text>//Podríamos armar un componente <Post > más complejo y rendirazolo con los datos de cada documanto.
          />
        </View>
        )
    }
  }
  
  const styles = StyleSheet.create({
    container:{
      paddingHorizontal:10,
      
    },
  })
  
  export default Home;