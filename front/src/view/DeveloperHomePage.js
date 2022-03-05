import React from 'react';
import {Button, Header, Tab, TabView} from 'react-native-elements';
import {styles, themeColor} from '../styles';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import UserListPage from './UserListPage';
import APIstoreList from '../component/DevCom/APIStoreList';
import APIrepo from '../component/DevCom/APIrepo';
import DevInfo from '../component/DevCom/DevInfo';
class DeveloperHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      route: this.props.route,
      index: 1,
    };
  }

  switchView = x => {
    this.setState({
      index: x,
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TabView value={this.state.index}>
            <TabView.Item>
              <DevInfo
                route={this.state.route}
                navigation={this.state.navigation}
              />
            </TabView.Item>
            <TabView.Item>
              <APIstoreList navigation={this.state.navigation} />
            </TabView.Item>
            <TabView.Item>
              <APIrepo
                route={this.state.route}
                navigation={this.state.navigation}
              />
            </TabView.Item>
          </TabView>
        </View>

        <Tab
          value={this.state.index}
          indicatorStyle={styles.tabIndicator}
          style={{
            flex: 1,
          }}>
          <Tab.Item
            icon={
              <Icon
                type={'feather'}
                name={'user'}
                size={20}
                color="white"
                onPress={() => this.switchView(0)}
              />
            }
            buttonStyle={styles.tab}
            containerStyle={{margin: 0}}
            titleStyle={styles.buttonTitles}
            title={'个人信息'}
            type={'clear'}
          />
          <Tab.Item
            icon={
              <Icon
                type={'feather'}
                name="shopping-cart"
                size={20}
                color="white"
                onPress={() => this.switchView(1)}
              />
            }
            buttonStyle={styles.tab}
            containerStyle={{margin: 0}}
            titleStyle={styles.buttonTitles}
            title={'API商城'}
            type={'clear'}
          />
          <Tab.Item
            icon={
              <Icon
                type={'feather'}
                name="key"
                size={20}
                color="white"
                onPress={() => this.switchView(2)}
              />
            }
            buttonStyle={styles.tab}
            containerStyle={{margin: 0}}
            titleStyle={styles.buttonTitles}
            title={'我的API'}
            type={'clear'}
          />
        </Tab>
      </View>
    );
  }
}

export default DeveloperHomePage;
