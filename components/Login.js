import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import buffer from 'buffer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    logo: {
        width: 66,
        height: 55
    },
    heading: {
        fontSize: 30,
        margin: 15
    },
    input: {
        height: 50,
        marginTop: 15,
        padding: 5,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 25,
        color: '#fff'
    },
    loader: {
        marginTop: 35
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    onLoginPress() {
        this.setState({loading: true});
        let b = new buffer.Buffer(this.state.username + ':' + this.state.password);
        let encoded = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization' : 'Basic ' + encoded
            }
        }).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);
            this.setState({loading: false});
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require('../ios/nativeiosapp/Images.xcassets/Octocat.imageset/Octocat.png')}/>
                <Text style={styles.heading}>Github browser</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Github username'
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({username: text})}/>
                <TextInput
                    style={styles.input}
                    placeholder='Github password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}/>
                <TouchableHighlight
                    style={styles.button}
                    onPress={this
                    .onLoginPress
                    .bind(this)}>
                    <Text style={styles.buttonText}>
                        Log in
                    </Text>
                </TouchableHighlight>

                <ActivityIndicator
                    style={styles.loader}
                    animating={this.state.loading}
                    size="large"/>
            </View>
        );
    }
}

export default Login;