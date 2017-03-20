import React, {Component} from 'react';
import {Text, View, ListView, ActivityIndicator, Image, TouchableHighlight, StyleSheet} from 'react-native';
import AuthService from '../services/AuthService';
import FeedDetails from './FeedDetails';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                r1 !== r2
            }
        });
        this.state = {
            data: ds.cloneWithRows([]),
            showProgress: true,
            query: props.query
        };
    }

    componentDidMount() {
        this.search();
    }

    search(){
        let url = "https://api.github.com/search/repositories?q=" +
                  encodeURIComponent(this.state.query);
        
        fetch(url).then(response => {
            return response.json();
        }).then(result => {
            console.log(result)
            this.setState({
                data: this.state.data.cloneWithRows(result.items)
            });
        }).finally(() => {
            this.setState({
                showProgress: false
            });
        })
    }


    renderRow(rowData) {
        console.log(rowData)
        return (
            <TouchableHighlight>
                <View style={{
                    flex:1,
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderColor: '#d7d7d7',
                    borderBottomWidth: 1,
                    backgroundColor: '#fff'
                }}>
                    <Text style={{fontSize: 17, fontWeight: '600'}}>{rowData.full_name}</Text>
                    
                    <View style={styles.repoCell}>
                        <Image source={require('../ios/nativeiosapp/Images.xcassets/star.imageset/star.png')}
                               style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('../ios/nativeiosapp/Images.xcassets/fork.imageset/fork.png')}
                               style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
                    </View>
                    <View style={styles.repoCell}>
                        <Image source={require('../ios/nativeiosapp/Images.xcassets/GitHub-Mark.imageset/GitHub-Mark.png')}
                               style={styles.repoCellIcon} />
                        <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
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

const styles = StyleSheet.create({
    repoCell: {
        width: 50,
        alignItems: 'center'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    }, 
    repoCellLabel: {
        textAlign: 'center'
    }
});



export default SearchResult;