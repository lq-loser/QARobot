import React from 'react';
import {Header, Input} from 'react-native-elements';
import {Alert, AsyncStorage, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {styles, themeColor} from '../styles';
import {NameEditService} from '../service/UserService';

class NameEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      // userid: '',
      name: '',
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
  handleNameEdit() {
    if (this.state.name.length > 30) {
      Alert.alert('提示', '用户名长度过长，请重新设置', [
        {text: '我知道了', onPress: this.confirm},
      ]);
      this.state.navigation.navigate('NameEdit');
      this.setState({name: ''});
    } else {
      // AsyncStorage.getItem('user').then(data => {
      //   if (data) {
      //     let userdata = JSON.parse(data);
      //     this.setState({username: userdata.username});
      //   }
      // });
      NameEditService(this.state.user.userid, this.state.name, data => {
        console.log(data);
        if (data.msg === 'success') {
          let user = this.state.user;
          user.nickname = this.state.name;
          AsyncStorage.setItem('user', JSON.stringify(user));
          this.setState({user: user});
          this.setState({name: ''});

          Alert.alert('提示', '修改成功', [
            {
              text: '我知道了',
              onPress: this.confirm,
            },
          ]);
        } else {
          Alert.alert('提示', '修改失败', [
            {
              text: '我知道了',
              onPress: this.confirm,
            },
          ]);
          this.setState({name: ''});
        }
        this.state.navigation.goBack();
      });
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          style={{flex: 1}}
          backgroundColor={themeColor}
          leftComponent={
            <Icon
              name="angle-left"
              type="font-awesome"
              size={40}
              color={'white'}
              onPress={() => {
                this.state.navigation.goBack();
              }}
            />
          }
          centerComponent={{
            text: 'EditName',
            style: {color: '#fff', fontSize: 30},
          }}
        />
        <View>
          <Input
            placeholder="new name"
            value={this.state.name}
            onChangeText={name => this.setState({name: name})}
            rightIcon={
              <Icon
                name="edit"
                size={24}
                color="black"
                onPress={() => this.handleNameEdit()}
              />
            }
          />
        </View>
      </View>
    );
  }
}

export default NameEditPage;
