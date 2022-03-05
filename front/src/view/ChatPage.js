import React from 'react';
import {Header, Overlay, Text} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import ChatRoomScreen from '../component/ChatCom/ChatRoomScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {themeColor} from '../styles';
import {BotList} from './UserListPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    marginBottom: 50,
  },
});

export class ChatPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: this.props.navigation,
      OptionsOpen: 0,
      visible: false,
    };
  }

  OpenDial = isopen => {
    this.setState({OptionsOpen: isopen});
  };

  render() {
    const {params} = this.props.route;

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={themeColor}
          leftComponent={
            <Icon
              name="angle-left"
              type="font-awesome"
              onPress={() => {
                this.state.navigation.goBack();
              }}
              color={'#fff'}
              size={40}
            />
          }
          centerComponent={{
            text: BotList[params.botId].name,
            style: {color: '#fff', fontSize: 30},
          }}
          rightComponent={
            <Icon
              name="info"
              type="AntDesign"
              onPress={() => {
                this.setState({visible: true});
              }}
              color={'#fff'}
              size={40}
            />
          }
        />
        <Overlay
          isVisible={this.state.visible}
          onBackdropPress={() => {
            this.setState({visible: true});
          }}>
          <Text>
            本软件的问答功能基于深度学习(DL)和自然语言处理(NLP)技术开发而成，本软件提供的四个机器人分别可以应对交大相关咨询、人机对话、占卜和意见反馈四个方面的需求。输入你想说的内容并点击发送，开始与机器人对话吧！
          </Text>
        </Overlay>
        <ChatRoomScreen
          avatar={BotList[params.botId].avatar_url}
          BotName={BotList[params.botId].name}
          localuser={params.user}
          navigation={params.navigation}
        />
      </View>
    );
  }
}

export default ChatPage;
