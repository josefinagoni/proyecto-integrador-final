import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {db} from '../firebase/config';
import Post from '../components/Post';
import { Icon } from 'react-native-elements';


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
                <Text style={styles.element}> Cantidad Posts: {this.state.posteos.length}</Text>
                

                <TouchableOpacity style={styles.sectionIcon}onPress={()=>this.props.logout()}>
                <Icon style={styles.icon} name="log-out" type="ionicon" size={20} color="#000"/>
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
        width: 'auto',
        alignItems: 'center',
        paddingVertical:15,
        paddingHorizontal: 10,
        height: '100%',
        backgroundColor: 'pink'

        
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
    list:{
        width: '100%'
    },
    
    touchable:{
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
    },
    touchableText:{
        fontWeight: 'bold',
        color:'black',
        textAlign: 'center',
        padding: 20,
    },
    sectionIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#dc3545',
        marginTop: 30,
        borderRadius: 4,
        marginBottom:20,
        
      
    },
    icon: {
        padding: 10,
    },

    row:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        width: '90%',
        justifyContent: 'space-around',

            
    
        },
        eachRow:{
            width: '50%', 
            flexDirection: 'column',
            alignItems: 'center'
            
    
        },
});

export default Profile;