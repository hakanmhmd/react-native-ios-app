import React, {Component} from 'react';
import {Text, View, TextInput,StyleSheet, TouchableHighlight} from 'react-native';
import AuthService from '../services/AuthService';
import FeedDetails from './FeedDetails';
import SearchResults  from './SearchResult';
import moment from 'moment';

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
    }

    onSearch(){
        this.props.navigator.push({
            component: SearchResults,
            title: 'Results',
            passProps: {
                query: this.state.query
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Search query'
                    autoCapitalize='none'
                    onChangeText={(text) => this.setState({query: text})}/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this
                    .onSearch
                    .bind(this)}>
                    <Text style={styles.buttonText}>
                        Search
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
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
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 25,
        color: '#fff'
    },
    loader: {
        marginTop: 35
    },
    error: {
        color: 'red',
        paddingTop: 20
    }
});



export default SearchComponent;