import React, {Component} from 'react';
import {Text, View, StyleSheet, TabBarIOS} from 'react-native';

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

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'feed'
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

                    <Text style={styles.welcome}>tab1 </Text>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab == 'search'}
                    icon={require('../ios/nativeiosapp/Images.xcassets/search.imageset/search.png')}
                    onPress={() => this.setState({selectedTab: 'search'})}>

                    <Text style={styles.welcome}>tab2 </Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}



export default AppContainer;