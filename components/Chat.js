import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// import firestore/firebase
const firebase = require('firebase');
require('firebase/firestore');

// chat screen component
export default class Chat extends React.Component {

// initialization state message to send, receive, and display messages
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
      loggedInText: '',
    }

// firebase credentials
if (!firebase.apps.length) {
    var firebaseConfig = {
      apiKey: "AIzaSyBMgsuvsq11dm-YOMm6kE73CxFXZqgeTrg",
      authDomain: "chat-3600a.firebaseapp.com",
      projectId: "chat-3600a",
      storageBucket: "chat-3600a.appspot.com",
      messagingSenderId: "849479204104",
      appId: "1:849479204104:web:34785452f3e3948f8b40bd",
      measurementId: "G-ZZ56YN4J1Q"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
}

// reference to messages collection
this.referenceMessages = firebase.firestore().collection('messages');
}

//once app loads
  componentDidMount() {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }

    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

//update user
    this.setState({
           user: {
             _id: user.uid,
             name,
             avatar: "https://placeimg.com/140/140/any",
           },
           loggedInText: `${name} entered the chat`,
           messages: [],
         });

this.unsubscribe = this.referenceMessages
       .orderBy("createdAt", "desc")
       .onSnapshot(this.onCollectionUpdate);
   });
 }

 componentWillUnmount() {
   this.authUnsubscribe();
   this.unsubscribe();
 }

 onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessages();
      }
    );
  }

// update data from database
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // loop through documents
    querySnapshot.forEach((doc) => {
      // get data snapshot
      const data = doc.data();

      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      user: message.user,
    });
  };

// render bubble

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }

  render() {
    let { backgroundColor } = this.props.route.params;
    return (

// chat background color

      <View style={[styles.chatBackground, { backgroundColor }]}>
{/* Chat Visualization */}
        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={this.state.user}
          />
{/* Fix Android keyboard visualization */}
          {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      </View>
    );
  };
}

// styling

const styles = StyleSheet.create({
  chatBackground: {
    flex: 1,
  },
});
