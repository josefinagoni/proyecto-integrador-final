import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {db} from '../firebase/config';
import Post from '../components/Post';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            posteos:[]
        }
    }

    componentDidMount(){
        console.log('En didMount de Home');
        db.collection('posts').orderBy('createdAt', 'desc').where('owner', '==', this.props.userData.email).onSnapshot(
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
                <Text style={styles.welcome}> Bienvenido: {this.props.userData.email}</Text>
                <Text style={styles.element}> Usuario creado el: {this.props.userData.metadata.creationTime}</Text>
                <Text style={styles.element}> Último login: {this.props.userData.metadata.lastSignInTime}</Text>
                <TouchableOpacity style={styles.touchable} onPress={()=>this.props.logout()}>
                    <Text style={styles.touchableText}>Logout</Text>
                </TouchableOpacity>
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
    container: {
        marginTop: 20,
        marginHorizontal: 10,
        width: 400,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        paddingVertical:15,
        paddingHorizontal: 10,
        height: 'auto'

        
    },
    welcome: {
        fontSize:18,
        marginTop:20,
        marginBottom:30,
        fontWeight: 'bold'
    },
    element:{
        marginBottom:10,
    },
    touchable:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'#fff',
        textAlign: 'center'
    }
});

export default Profile;