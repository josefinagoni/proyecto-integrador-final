import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput, TouchableOpacityBase} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';
import { Icon } from 'react-native-elements';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false, 
            photo: '', 
            showCamera: true,
        }
        this.camera 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=>{
                this.setState({
                    permission: true,
                })
            })
            .catch( error => console.log(error))
        
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then((photo)=>{
                this.setState({
                    photo: photo.uri, 
                    showCamera:false
                })

            })
            .catch( error => console.log(error))
    }

    savePhoto(){
        
        fetch(this.state.photo)
            .then( res => res.blob()) 
            .then( image =>{
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url);
                                this.setState({
                                    photo:'',
                                })
                            })
                            .catch(error=>console.log(error))
                    })
                    .catch( error => console.log(error))
            })
            .catch(error => console.log(error));

    }

    clear(){
        this.setState({
           photo:'',
           showCamera: true 
        })
        //cambiar el estado de photo a ''
        //cambiar showCamera a true.
    }


    render(){
        return(
            <View style={styles.container}>
            {
                this.state.permission ?
                    this.state.showCamera === false ?
                    //Render del preview
                    <React.Fragment>
                        <View>
                        <Image 
                            style={styles.cameraBody}
                            source={{uri:this.state.photo}}
                        /> 
                        </View>
                        <View style={styles.row}>
                            <View style={styles.eachRow} >
                            <TouchableOpacity style={styles.sectionIcon} onPress={()=>this.savePhoto()}>
                            <Icon style={styles.icon} name="cloud-done" type="ionicon" size={20} color="green"/>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={styles.eachRow} >
                            <TouchableOpacity style={styles.sectionIcon} onPress={()=>this.clear()}>
                            <Icon style={styles.icon} name="close-circle" type="ionicon" size={20} color="red"/>
                                <Text>Rechazar</Text> 
                            </TouchableOpacity>
                            </View>
                        </View>
                    </React.Fragment>
                    :
                    //render de la cámara
                    <View >
                        <View style={styles.camera}>
                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={ reference => this.camera = reference }
                        />
                        </View>
                        <TouchableOpacity style={styles.sectionIcon} onPress={()=>this.takePicture()}>
                        <Icon style={styles.icon} name="camera" type="ionicon" size={20} color="#000"/>
                            <Text style={styles.sacar}>Sacar Foto</Text>
                        </TouchableOpacity>
                    </View> 
                :
                //render mensaje
                <Text >No tienes permisos para usar la cámara</Text>

            }
            </View>

        )
    }

    
}

const styles=StyleSheet.create({
    container:{
        marginBottom: 10,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        width: '100%',
        height: '100%',
        marginTop: 10,
    },
    cameraBody:{
        
        height:500
        
    },
    camera:{
        height:500
    },
    sacar:{
        flex: 2,
        flexDirection: 'column'
    },
    
    sectionIcon: {
        backgroundColor:'light-blue',
        padding: 5,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'light-blue',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 5,
        marginTop: 5,
        
      
    },
    icon: {
        padding: 10,
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-around',

            
    
        },
        eachRow:{
            width: '50%', 
            flexDirection: 'column',
            alignItems: 'center'
            
    
        },
})

export default MyCamera;