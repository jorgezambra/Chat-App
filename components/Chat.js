import React from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

export default class Chat extends React.Component {

// initiate state message
constructor() {
  super();
  this.state = {
    messages: [],
  }
}

//once app loads
  componentDidMount() {
    let { name } = this.props.route.params;

// screen title

    this.props.navigation.setOptions({ title: name });

// sample message in GiftedChat message format is set on mount

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Welcome ' + name,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'Chat Started',
          createdAt: new Date(),
          system: true,
        },
      ],
    })
  }

// function to be called when a user sends a message to append the messages

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

// to render bubble

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
            user={{
              _id: 1,
            }}
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
