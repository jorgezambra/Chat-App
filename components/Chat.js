import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';

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
      isConnected: false,
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
    NetInfo.fetch().then(connection => {
        if (connection.isConnected) {
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
           isConnected: true,
         });

this.unsubscribe = this.referenceMessages
       .orderBy("createdAt", "desc")
       .onSnapshot(this.onCollectionUpdate);
      });
       } else {
         this.setState({
           isConnected: false,
         });
         this.getMessages();
       }
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
        this.saveMessages();
      }
    );
  }

// get messages from async storage
  async getMessages() {
      let messages = '';
      try {
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    }

// save messages in async storage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

// delete messages from async storage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
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

//render input toolbar

  renderInputToolbar = (props) => {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
        {...props}
        />
      );
    }
  }

  render() {
    let { backgroundColor } = this.props.route.params;
    return (

// chat background color

      <View style={[styles.chatBackground, { backgroundColor }]}>
{/* Chat Visualization */}
        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderInputToolbar={this.renderInputToolbar}
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
