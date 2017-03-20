import React, {Component} from 'react';
import {Text, View, ListView, ActivityIndicator, Image, TouchableHighlight} from 'react-native';
import AuthService from '../services/AuthService';
import FeedDetails from './FeedDetails';
import moment from 'moment';

class Feed extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                r1 !== r2
            }
        });
        this.state = {
            data: ds.cloneWithRows([]),
            showProgress: true
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed(){
        AuthService.getAuthStorage((err, info) => {
            
            let url = "https://api.github.com/users/" 
                        + info.user.login
                        + '/received_events';
            fetch(url, {
                headers: info.header
            }).then((response) => {
                return response.json();
            }).then(data => {
                this.setState({
                    data: this.state.data.cloneWithRows(data),
                    showProgress: false
                });
            });
        });
    }

    pressRow(rowData){
        this.props.navigator.push({
            component: FeedDetails,
            title: rowData.type,
            passProps: {
                event: rowData
            }
        });
    }

    renderRow(rowData) {
        console.log(rowData)
        return (
            <TouchableHighlight onPress={() => this.pressRow(rowData)}
                                underlayColor='#ddd'>
                <View style={{
                    flex:1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#d7d7d7',
                    borderBottomWidth: 1,
                }}>
                    <Image source={{uri: rowData.actor.avatar_url}}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }} />
                    <View style={{
                        paddingLeft: 20,
                    }}>
                        <Text>{moment(rowData.created_at).fromNow()}</Text>
                        <Text>{rowData.actor.login}</Text>
                        <Text style={{fontWeight: '600'}}>{rowData.repo.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        if(this.state.showProgress){
            return (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <ActivityIndicator animating={true} size="large" />
                </View>
            );
        }
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 63}}>
                <ListView dataSource={this.state.data}
                          renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}



export default Feed;