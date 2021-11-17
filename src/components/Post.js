import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      myLike: false,
    };
  }

  componentDidMount() {
    if (this.props.postData.data.likes) {
      this.setState({
        likes: this.props.postData.data.likes.length,
        myLike: this.props.postData.data.likes.includes(auth.currentUser.email), //el include devuelve un true o false
      });
    }
  }

  darLike() {
    db.collection("posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() => {
        this.setState({
          likes: this.state.likes + 1,
          myLike: true,
        });
      });
  }

  sacarLike() {
    db.collection("posts")
      .doc(this.props.postData.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() => {
        this.setState({
          likes: this.state.likes - 1,
          myLike: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.contanier}>
        <Text>Texto del post: {this.props.postData.data.texto}</Text>
        <Text>user: {this.props.postData.data.owner} </Text>

        {this.state.myLike ? 
          <TouchableOpacity onPress={() => this.sacarLike()}>
            <Text>Quitar me gusta</Text>
          </TouchableOpacity>
          : 
          <TouchableOpacity onPress={() => this.darLike()}>
            <Text>Me gusta</Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
}
const styles = StyleSheet.create({
  contanier: {
    marginBottom: 20,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default Post;
