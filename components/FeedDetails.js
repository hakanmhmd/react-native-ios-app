import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    }
});

class FeedDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        
        let AdditionalInfo = <View />;

        if(this.props.event.type === 'CommitCommentEvent'){
            let payload = this.props.event.payload;
            AdditionalInfo = (
                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center'}} >
                    <Text><Text style={{fontWeight: '600'}}>{payload.comment.user.login}</Text> commented: </Text>
                    <Text style={{
                        marginTop: 30,
                        marginLeft: 20,
                        marginRight: 20
                    }}>{payload.comment.body}</Text>
                    <Text>{moment(payload.comment.created_at).fromNow()}</Text>
                </View>
            );   
        }
        if(this.props.event.type === 'IssuesEvent'){
            let payload = this.props.event.payload;
            AdditionalInfo = (
                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center'}} >
                    <Text><Text style={{fontWeight: '600'}}>{payload.issue.user.login}</Text> {payload.action} issue: </Text>
                    <Text>Title: {payload.issue.title}</Text>
                    <Text style={{
                        marginTop: 30,
                        marginLeft: 20,
                        marginRight: 20
                    }}>{payload.issue.body}</Text>
                    <Text>{moment(payload.issue.created_at).fromNow()}</Text>
                    <Text>State: {payload.issue.state}</Text>
                </View>
            );   
        }

        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image source={{uri: this.props.event.actor.avatar_url}}
                       style={{
                           height: 120,
                           width: 120,
                           borderRadius: 60
                       }} />

                <Text style={{
                    paddingTop:20,
                    paddingBottom: 5,
                    fontSize: 15
                }}>
                    {moment(this.props.event.created_at).fromNow()}
                </Text>
                <Text style={{fontWeight: '600'}}>{this.props.event.repo.name}</Text>
                
                {AdditionalInfo}
            </View>
        );
    }
}



export default FeedDetails;