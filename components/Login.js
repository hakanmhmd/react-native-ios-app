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
import AuthService from '../services/AuthService';

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
    }, error: {
        color: 'red',
        paddingTop: 20
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
        AuthService.login({
            username: this.state.username,
            password: this.state.password
        }, (result) => {
            this.setState(Object.assign({
                loading: false
            }, result));

            if(result.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    }

    render() {
        var error = <View />

        if(!this.state.success && this.state.badCredentials){
            error = <Text style={styles.error}> Wrong username or password </Text>;
        }
        if(!this.state.success && this.state.unknownError){
            error = <Text style={styles.error}> We experienced an unknown issue. </Text>;
        }
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

                {error}

                <ActivityIndicator
                    style={styles.loader}
                    animating={this.state.loading}
                    size="large"/>
            </View>
        );
    }
}

export default Login;