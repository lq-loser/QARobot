import React from 'react';
import {
  Avatar,
  Button,
  CheckBox,
  Divider,
  Header,
  ListItem,
  Text,
  ThemeProvider,
} from 'react-native-elements';
import {styles, themeColor} from '../../styles';
import {AsyncStorage, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {hook, wrap} from 'cavy';
const help_message = '欢迎使用开发者功能';
class DevInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      // username: '',
      // nickname: '',
      // email: '',
      // imagedata: '',
      // imagemime: '',
      user: {},
    };
  }
  // getAvatar = () => {
  //   AsyncStorage.getItem('user').then(data => {
  //     if (data) {
  //       let userdata = JSON.parse(data);
  //       console.log(userdata.username);
  //       this.setState({username: userdata.username});
  //     }
  //   });
  //   AvatarGetService(this.state.username, data => {
  //     this.setState({imagedata: data.imagedata, imagemime: data.imagemime});
  //   });
  // };
  //
  // getNickname = () => {
  //   AsyncStorage.getItem('user').then(data => {
  //     if (data) {
  //       let userdata = JSON.parse(data);
  //       this.setState({username: userdata.username});
  //     }
  //   });
  //   NicknameGetService(this.state.username, data => {
  //     this.setState({nickname: data.nickname});
  //   });
  // };
  // getEmail = () => {
  //   AsyncStorage.getItem('user').then(data => {
  //     if (data) {
  //       let userdata = JSON.parse(data);
  //       this.setState({username: userdata.username});
  //     }
  //   });
  //   EmailGetService(this.state.username, data => {
  //     this.setState({email: data.email});
  //   });
  // };

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

  async update() {
    try {
      const shop = await AsyncStorage.getItem('user');
      let user = JSON.parse(shop);
      this.setState({user: user});
      console.log(this.state.user);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {generateTestHook} = this.props;
    const WrappedAvatar = wrap(Avatar);
    //test const {params} = this.props.route;

    return (
      <View>
        <Header
          backgroundColor={themeColor}
          centerComponent={{
            text: '开发者账户',
            style: {color: '#fff', fontSize: 30},
          }}
          rightComponent={
            <Icon
              name="help"
              type={'material-community'}
              color={'white'}
              onPress={() => alert(help_message)}
            />
          }
        />
        <View>
          <ListItem bottomDivider>
            <Icon name="supervised-user-circle" style={{opacity: 0}} />
            <ListItem.Content style={{alignItems: 'center'}}>
              <WrappedAvatar
                ref={generateTestHook('Develop.avatar')}
                rounded
                size={'xlarge'}
                source={{
                  uri: `data:${this.state.user.imagemime};base64,${this.state.user.imagedata}`,
                }}
              />
            </ListItem.Content>
            <ListItem.Chevron
              name="edit"
              onPress={() => {
                this.state.navigation.navigate('AvatarEdit');
              }}
            />
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="user" type="antdesign" />
            <ListItem.Content>
              <ListItem.Title>{this.state.user.username}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="supervised-user-circle" />
            <ListItem.Content>
              <ListItem.Title>{this.state.user.nickname}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              name="edit"
              onPress={() => {
                this.state.navigation.navigate('NameEdit');
              }}
            />
          </ListItem>

          <ListItem bottomDivider>
            <Icon name="mail-outline" />
            <ListItem.Content>
              <ListItem.Title>{this.state.user.email}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron name="edit" style={{opacity: 0}} />
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="coins" type="font-awesome-5" />
            <ListItem.Content>
              <ListItem.Title>{this.state.user.billings}</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            bottomDivider
            onPress={() => this.props.navigation.navigate('Start')}>
            <ListItem.Content style={{alignItems: 'center'}}>
              <ListItem.Title style={{color: 'red'}}>退出登录</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </View>
      </View>
    );
  }
}
//
// export default DeveloperPage;
const TestableDevInfo = hook(DevInfo);

export default TestableDevInfo;
