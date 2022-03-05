import React from 'react';
import {
  Avatar,
  Button,
  CheckBox,
  Divider,
  Header,
  Text,
  ThemeProvider,
  ListItem,
} from 'react-native-elements';
import {styles, themeColor} from '../styles';
import {AsyncStorage, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {hook, wrap} from 'cavy';
import {
  AvatarGetService,
  NicknameGetService,
  EmailGetService,
} from '../service/UserService';

class DeveloperPage extends React.Component {
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
    return (
      <View>
        <Header
          backgroundColor={themeColor}
          leftComponent={
            <Icon
              name="angle-left"
              type="font-awesome"
              color={'white'}
              onPress={() => {
                this.state.navigation.navigate('Home');
              }}
            />
          }
          centerComponent={{
            text: '我的信息',
            style: {color: '#fff', fontSize: 30},
          }}
        />
        <View>
          <ListItem bottomDivider>
            <Icon name="supervised-user-circle" style={{opacity: 0}} />
            <ListItem.Content style={{alignItems: 'center'}}>
              <WrappedAvatar
                ref={generateTestHook('Develop.avatar')}
                rounded
                size={'large'}
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
const TestableDevelop = hook(DeveloperPage);

export default TestableDevelop;
