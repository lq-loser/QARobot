import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import 'dayjs/locale/zh-cn';
import {View, Text, StyleSheet} from 'react-native';
import {themeColor} from '../../styles';
import {DiceService, SendService} from '../../service/MessageService';

export default function ChatRoomScreen(props) {
  const [messages, setMessages] = useState([]);
  const {localuser, navigation} = props;
  useEffect(() => {
    const {avatar, BotName} = props;

    console.log(props);
    setMessages([
      {
        _id: 1,
        text: '开始聊天吧！',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: BotName,
          avatar: avatar,
        },
      },
    ]);
  }, [props]);

  let index = 2;

  const onSend = useCallback(
    (msg = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
      console.log(msg[0].text);
      const {avatar, BotName} = props;
      if (BotName !== '开发者信箱') {
        if (BotName === '幸运') {
          DiceService(msg[0].text, data => {
            console.log(data);
            let msg1 = {
              _id: index,
              text: data.reply,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: BotName,
                avatar: avatar,
              },
            };
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, msg1),
            );
            index++;
          });
        } else {
          SendService(msg[0].text, data => {
            console.log(data);
            let msg1 = {
              _id: index,
              text: data.reply,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: BotName,
                avatar: avatar,
              },
            };
            setMessages(previousMessages =>
              GiftedChat.append(previousMessages, msg1),
            );
            index++;
          });
        }
      } else {
        let msg1 = {
          _id: index,
          text: '感谢您的回复',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: BotName,
            avatar: avatar,
          },
        };
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, msg1),
        );
        index++;
      }
    },
    [index, props],
  );

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {},
          right: {
            color: 'white',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#fff',
          },
          right: {
            backgroundColor: themeColor,
          },
        }}
      />
    );
  };

  const PressAvatar = () => {};

  const renderSend = props => {
    return (
      <Send {...props} alwaysShowSend={true}>
        <View style={styles.sendBtn}>
          <Text style={{color: '#ffffff', fontSize: 17}}>Send</Text>
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      locale={'zh-cn'}
      showAvatarForEveryMessage={true}
      renderBubble={renderBubble}
      placeholder={'开始聊天吧'}
      renderSend={renderSend}
      inverted={true}
      renderUsernameOnMessage={true}
      onPressAvatar={PressAvatar}
      user={{
        _id: 50,
        name: props.localuser.nickname,
        avatar: `data:${localuser.imagemime};base64,${localuser.imagedata}`,
      }}
      alignTop={true}
    />
  );
}

const styles = StyleSheet.create({
  sendBtn: {
    width: 63,
    height: 32,
    borderRadius: 3,
    backgroundColor: themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
  },
});
