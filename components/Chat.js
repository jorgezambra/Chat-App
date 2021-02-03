import React from 'react';
import { View, StyleSheet } from 'react-native';

export default class Chat extends React.Component {

  componentDidMount() {
    let { name } = this.props.route.params;

// screen title

    this.props.navigation.setOptions({ title: name });
  }

  render() {
    let { backgroundColor } = this.props.route.params;
    return (

// chat background color

      <View style={[styles.chatBackground, { backgroundColor }]}>
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
