import React from 'react';
import {Text, View} from 'react-native';
import {ListItem, Icon, Header, Avatar} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import {getApiStoreList} from '../../service/DevService';
import {wrap} from 'cavy';
import {themeColor, themeColor2} from '../../styles';

const testList = [
  {
    apiID: 1,
    name: '交讯问答',
    description: '根据用户问题智能回答交大相关资讯',
    address: 'http://123.60.111.188:8000/sendMsg',
  },
  {apiID: 2, name: '智能聊天', description: '随便回复点什么'},
  {apiID: 3, name: '占卜机', description: '随机事件发生器'},
];
export default class APIstoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiList: testList,
      navigation: props.navigation,
    };
  }

  // componentDidMount() {
  //   let data = {username: 'A'};
  //   getApiStoreList(data, x => {
  //     this.setState({apiList: x});
  //   });
  // }

  render() {
    return (
      <View>
        <Header
          style={{
            flex: 1,
          }}
          backgroundColor={themeColor}
          centerComponent={{
            text: '开发者-API商城',
            style: {color: '#fff', fontSize: 30},
          }}
        />
        {this.state.apiList.map((l, i) => (
          <ListItem
            Component={TouchableScale}
            containerStyle={{
              marginTop: 20,
              marginHorizontal: 20,
              borderRadius: 10,
              backgroundColor: themeColor2,
            }}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            key={i}
            bottomDivider
            onPress={() => {
              this.state.navigation.navigate('BuyAPI', {
                api: l,
              });
            }}>
            <Icon
              raised
              name="heartbeat"
              type="font-awesome"
              color={themeColor2}
            />

            <View>
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.description}</ListItem.Subtitle>
              </ListItem.Content>
            </View>
          </ListItem>
        ))}
      </View>
    );
  }
}
