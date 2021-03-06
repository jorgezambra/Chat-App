import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

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
      image: null,
      location: null,
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
        try {
          await firebase.auth().signInAnonymously();
        } catch (error) {
        console.log (`Unable to Sign in: ${error.message}`);
        }
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

 /**
 * sends a message to append the messages
 * @async
 * @function onSend
 * @param {string} messages
 */
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

  /**
  * loads all messages from AsyncStorage
  * @async
  * @function getMessages
  * @return {Promise<string>} The data from the storage
  */
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

/**
* save all messages to AsyncStorage
* @async
* @function saveMessages
*/
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

/**
* delete messages from async storage
* @async
* @function deleteMessages
* @param {string} messages
*/
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
/**
* update message state with recent data from database and
* param querySnapshot contains documents with the following params
* @function onCollectionUpdate
* @param {string} _id - message id
* @param {string} text - content
* @param {date} cratedAt - date and time sent
* @param {string} user - user data
* @param {string} image - image sent
* @param {number} location - geographical coordinates
*/
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
        image: data.image || '',
        location: data.location,
      });
    });
    this.setState({
      messages,
    });
  };

/**
* adds message to Firestore database
* @function addMessages
*/
  addMessages = () => {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || '',
      location: message.location || null,
    });
  };

/**
* input toolbar to render bubble and is only rendered if online
* @function renderBubble
* @param {*} props
*/
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

/**
* input toolbar to show only for online
* @function renderInputToolbar
* @param {*} props
* @returns {InputToolbar}
*/
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

/**
* renders pickImage, takePhoto and getLocation
* @function renderCustomActions
* @param {*} props
* @returns {CustomActions}
*/
    renderCustomActions = (props) => <CustomActions {...props} />;

// function to check if currentMessage contains location data and render map view
    renderCustomView(props) {
      const { currentMessage } = props;
      if (currentMessage.location) {
        return (
          <MapView
            style={{
              width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3
            }}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        );
      }
      return null;
    }

  render() {
    let { backgroundColor } = this.props.route.params;
    return (

// chat background color

      <View style={[styles.chatBackground, { backgroundColor }]}>
{/* Chat Visualization */}
        <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            renderCustomView={this.renderCustomView}
            renderActions={this.renderCustomActions}
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
