import React from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';


export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      color: '',
    }
  }

  render() {

    return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/background-image.png')} style={styles.backgroundImage}>
            <Text style={styles.title}>Chat App</Text>
              <View style={styles.innerSquare}>
                <TextInput
                  style={styles.name}
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}
                  placeholder='  Your name'
                />
                <Text style={styles.backgroundtext}>
                Choose Background Color:
                </Text>
                <View style={styles.colorChoice}>
                  <TouchableOpacity
                    style={styles.color1}
                    onPress={() => this.setState({color: '#090C08'})}
                    value={this.state.color}>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.color2}
                    onPress={() => this.setState({color: '#474056'})}
                    value={this.state.color}>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.color3}
                    onPress={() => this.setState({color: '#8A95A5'})}
                    value={this.state.color}>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.color4}
                    onPress={() => this.setState({color: '#B9C6AE'})}
                    value={this.state.color}>
                    </TouchableOpacity>
                </View>
                  <TouchableOpacity
                    style={styles.startChatButton}
                    onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.color,
                  })}>
                    <Text style={styles.startChatButtonText}>
                    Start Chatting
                    </Text>
                </TouchableOpacity>
              </View>
          </ImageBackground>
        </View>
    )
  }
}

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 250,
  },
  innerSquare: {
    height: '40%',
    width: '88%',
    backgroundColor: '#FFFFFF',
    marginLeft: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    borderWidth: 2,
    margin: 20,
    height: 50,
  },
  backgroundtext: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    marginLeft: 20
  },
  colorChoice: {
    flex: 1,
    flexDirection: 'row',
  },
  color1: {
    width: 40,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#090C08',
    marginLeft: 20,
    marginTop: 10,
  },
  color2: {
    width: 40,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#474056',
    marginLeft: 20,
    marginTop: 10,
  },
  color3: {
    width: 40,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#8A95A5',
    marginLeft: 20,
    marginTop: 10,
  },
  color4: {
    width: 40,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#B9C6AE',
    marginLeft: 20,
    marginTop: 10,
  },
  startChatButton: {
    borderWidth: 2,
    backgroundColor: '#757083',
    justifyContent:'center',
    alignItems: 'center',
    borderColor: '#757083',
    height: 50,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
},
  startChatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
 },
});
