import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }, logo: {
        width: 66,
        height: 55
    }, heading: {
        fontSize: 30,
        margin: 15
    }, input: {
        height: 50,
        marginTop: 15,
        padding: 5,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#48bbec'
    }, button: {
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }, buttonText: {
        fontSize: 25,
        color: '#fff',

    }
});

class Login extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../ios/nativeiosapp/Images.xcassets/Octocat.imageset/Octocat.png')}/>
                <Text style={styles.heading}>Github browser</Text>
                <TextInput style={styles.input} placeholder='Github username' />
                <TextInput style={styles.input} placeholder='Github password' secureTextEntry={true} />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}> Log in </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Login;