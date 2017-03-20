import React, {Component} from 'react';
import {Text, View, StyleSheet, TabBarIOS, NavigatorIOS} from 'react-native';
import Feed from './Feed';
import Search from './SearchComponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    }
});

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'search'
        };
    }

    render() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab == 'feed'}
                    icon={require('../ios/nativeiosapp/Images.xcassets/inbox.imageset/inbox.png')}
                    onPress={() => this.setState({selectedTab: 'feed'})}>

                    <NavigatorIOS style={{flex: 1}}
                                  initialRoute={{
                                      component: Feed,
                                      title: 'Feed'
                                    }} />
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab == 'search'}
                    icon={require('../ios/nativeiosapp/Images.xcassets/search.imageset/search.png')}
                    onPress={() => this.setState({selectedTab: 'search'})}>

                    <NavigatorIOS style={{flex: 1}}
                                  initialRoute={{
                                      component: Search,
                                      title: 'Search'
                                    }} />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}



export default AppContainer;