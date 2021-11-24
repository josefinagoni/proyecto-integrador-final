import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput, TouchableOpacityBase} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';
import { Icon } from 'react-native-elements';

class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state = {
            permission: false, //Permisos de la cámara en el dispositivo
            photo: '', //Guardar la url/ uri de la foto.
            showCamera: true,
        }
        this.camera //la referencia a esta cámara.
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(()=>{
                this.setState({
                    permission: true,
                })
            })
            .catch( error => console.log(error))
        //Investigar
       // console.log(Camera);
       // console.log(this.camera);
    }

    takePicture(){
        this.camera.takePictureAsync()
            .then((photo)=>{
                this.setState({
                    photo: photo.uri, //La ruta interna temporal a la foto.
                    showCamera:false
                })

            })
            .catch( error => console.log(error))
    }

    savePhoto(){
        //Tiene que buscar la foto de la uri temporal y subirla al storage.
        fetch(this.state.photo)
            .then( res => res.blob()) //Traducis la foto
            .then( image =>{
                //Vamos a guardar la foto en storage y obtener la url pública.
                //Crear el nombre del archivo de la foto.    
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
                        <Image 
                            style={styles.cameraBody}
                            source={{uri:this.state.photo}}
                        /> 
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
                    <View style={styles.container}>
                        <Camera
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.back}
                            ref={ reference => this.camera = reference }
                        />
                        <TouchableOpacity style={styles.button} style={styles.sectionIcon} onPress={()=>this.takePicture()}>
                        <Icon style={styles.icon} name="camera" type="ionicon" size={20} color="#000"/>
                            <Text>Sacar Foto</Text>
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
        flex:1,
        width: '70%',
        height: 500,
        alignItems: 'center'
    },
    cameraBody:{
        flex:1,
        height: '90%',
    },
    
    sectionIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        
      
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
})

export default MyCamera;