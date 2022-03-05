import React from 'react';
import {Header, ThemeProvider} from 'react-native-elements';
import {ListItem, Avatar, ButtonGroup} from 'react-native-elements';
import {AsyncStorage, View} from 'react-native';
import {themeColor} from '../styles';
import {hook, wrap} from 'cavy';
import {Input} from 'react-native-elements/dist/input/Input';

export const BotList = [
  {
    name: '交讯问答',
    avatar_url: 'https://s3.bmp.ovh/imgs/2021/09/20f73055332d30a2.png',
    subtitle: '交大相关咨询（生活学习，图书馆等）',
    start: '饮水思源，爱国荣校',
  },
  {
    name: '人机对话',
    avatar_url: 'https://s3.bmp.ovh/imgs/2021/09/5bf3dc4f458a7415.png',
    subtitle: '随便说点什么',
    start: '开始聊天吧~',
  },
  {
    name: '幸运',
    avatar_url: 'https://s3.bmp.ovh/imgs/2021/09/db8cab91b23c5e62.png',
    subtitle: '占卜',
    start: '回复每日运势或用包含{rd(数字)}的字符串进行占卜',
  },
  {
    name: '开发者信箱',
    avatar_url: 'https://s3.bmp.ovh/imgs/2021/09/248806ae0f5187fd.png',
    subtitle: '意见反馈',
    start: '提出您宝贵的意见',
  },
];

class UserListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      navigation: this.props.navigation,
      route: this.props.route,
      user: {},
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  async componentDidMount() {
    try {
      const shop = await AsyncStorage.getItem('user');
      let user = JSON.parse(shop);
      this.setState({user: user});
      console.log(this.state.user);
    } catch (error) {
      console.log(error);
    }
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }
  render() {
    const {generateTestHook} = this.props;
    const WrappedList = wrap(ListItem);
    const buttons = ['Chat', 'Identity'];
    const {selectedIndex} = this.state;
    return (
      <ThemeProvider>
        <Header
          backgroundColor={themeColor}
          centerComponent={{text: '广场', style: {color: '#fff', fontSize: 30}}}
          leftComponent={
            <Avatar
              rounded
              source={{
                uri: `data:${this.state.user.imagemime};base64,${this.state.user.imagedata}`,
              }}
              size="medium"
              onPress={() => {
                this.props.navigation.navigate('Developer', {
                  user: this.state.user,
                });
              }}
            />
          }
        />

        {BotList.map((l, i) => (
          <WrappedList
            ref={generateTestHook('userList' + String(i))}
            key={i}
            bottomDivider
            onPress={() => {
              this.state.navigation.navigate('Chat', {
                botId: i,
                user: this.state.user,
                navigation: this.props.navigation,
              });
            }}>
            <View>
              <Avatar
                rounded
                source={{
                  uri: l.avatar_url,
                }}
                size="large"
              />
              {/*<Badge*/}
              {/*  value="99+"*/}
              {/*  status="error"*/}
              {/*  containerStyle={{position: 'absolute', top: -4, right: -4}}*/}
              {/*/>*/}
            </View>
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </WrappedList>
        ))}
      </ThemeProvider>
    );
  }
}

// export default UserListPage;
const TestableUserList = hook(UserListPage);

export default TestableUserList;
