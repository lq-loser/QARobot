import React from 'react';
import {Alert, AsyncStorage, ScrollView, View} from 'react-native';
import {Button, CheckBox} from 'react-native-elements';
import {Input} from 'react-native-elements/dist/input/Input';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import LoginTitle from '../component/LoginCom/LoginTitle';
import RightIcon from '../component/LoginCom/RightIcon';
import ReturnHead from '../component/LoginCom/ReturnHead';
import {styles, themeColor} from '../styles';
import {GetUser, RegisterService} from '../service/UserService';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      username: '',
      firstPassword: '',
      secondPassword: '',
      usertype: 0,
      firstVisible: true,
      secondVisible: true,
      isShowFirst: false,
      isShowSecond: false,
      firstVisIcon: true,
      secondVisIcon: true,
      emailAddress: '',
      emailError: false,
      isSame: true,
      userError: false,
      pwdError: false,
      userMsg: '',
    };
  }
  changeProps1(v, i) {
    this.setState({firstVisible: v, firstVisIcon: i});
  }
  changeProps2(v, i) {
    this.setState({secondVisible: v, secondVisIcon: i});
  }
  changeNav(n) {
    this.setState({navigation: n});
  }
  /**
   * checkExist - 查找是否存在该用户名的用户并检查用户名的字符长度是否符合规范
   * 根据返回的信息设定用户名错误信息
   * */
  checkExist() {
    GetUser(this.state.username, data => {
      console.log(data);
      if (data.msg === 'right') {
        this.setState({userError: false});
      } else {
        this.setState({userError: true});
        if (data.msg === 'exist') {
          this.setState({userMsg: '用户名已存在'});
        } else {
          this.setState({userMsg: data.msg});
        }
      }
    });
  }
  /**
   * checkEmail - 检查邮箱格式是否正确
   * 邮箱检查格式为必须含有@,且小数点后只能跟2~3位字符，只能有1~2个小数点
   * */
  checkEmail() {
    let regex =
      /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if (!regex.test(this.state.emailAddress)) {
      this.setState({emailError: true});
    } else {
      this.setState({emailError: false});
    }
  }
  /**
   * handleRegister - 注册
   * 如果勾选开发者，注册成功跳转到开发者页面，普通用户跳转到机器人选择页面。
   * 存在用户，提示已存在该用户，并重新输入。
   * 如果两次输入密码不一致，无法注册
   * */
  handleRegister() {
    if (
      this.state.username === '' ||
      this.state.firstPassword === '' ||
      this.state.secondPassword === ''
    ) {
      Alert.alert('提示', '用户名与密码不能为空', [
        {text: '我知道了', onPress: this.confirm},
      ]);
    } else if (this.state.userError || this.state.pwdError) {
      Alert.alert('提示', '用户名或密码格式有误', [
        {text: '我知道了', onPress: this.confirm},
      ]);
    } else {
      this.setState({usertype: this.state.usertype});
      RegisterService(
        this.state.username,
        this.state.firstPassword,
        this.state.usertype,
        this.state.emailAddress,
        data => {
          console.log(data);
          let message = data.userdata;

          if (message === 'exist') {
            Alert.alert('提示', '用户名已存在', [
              {text: '我知道了', onPress: this.confirm},
            ]);
          } else if (message === 'exist email') {
            Alert.alert('提示', '邮箱已注册', [
              {text: '我知道了', onPress: this.confirm},
            ]);
          } else if (message === 'wrong email') {
            Alert.alert('提示', '无法发送邮件至邮箱，请检查邮箱输入', [
              {text: '我知道了', onPress: this.confirm},
            ]);
          } else {
            AsyncStorage.setItem('user', JSON.stringify(data));
            // if (this.state.usertype) {
            //   this.state.navigation.navigate('DevHome');
            // } else {
            //   this.state.navigation.navigate('Home');
            // }
            Alert.alert('提示', '已发送验证邮件至邮箱，请到邮箱激活账号', [
              {text: '我知道了', onPress: this.confirm},
            ]);
            this.state.navigation.navigate('Login');
          }
        },
      );
    }
  }
  render() {
    let canClick;
    let emailMsg = '邮箱地址为空或者格式错误';
    let userMsg = '用户名已存在';
    let pwdMsg = '密码至少为3个字符';
    if (this.state.firstPassword === '') {
      this.state.isShowFirst = false;
    }
    if (this.state.secondPassword === '') {
      this.state.isShowSecond = false;
    }
    if (this.state.firstPassword !== this.state.secondPassword) {
      this.state.isSame = false;
      canClick = false;
    } else {
      this.state.isSame = true;
      canClick = true;
    }
    let iconView1 = this.state.isShowFirst ? (
      <RightIcon
        visible={this.state.firstVisible}
        visIcon={this.state.firstVisIcon}
        changeProp={this.changeProps1.bind(this)}
      />
    ) : null;
    let iconView2 = this.state.isShowSecond ? (
      <RightIcon
        visible={this.state.secondVisible}
        visIcon={this.state.secondVisIcon}
        changeProp={this.changeProps2.bind(this)}
      />
    ) : null;
    return (
      <ScrollView>
        <ReturnHead
          navigation={this.state.navigation}
          changeNav={this.changeNav.bind(this)}
        />
        <LoginTitle isLogin={false} />
        <View style={{flex: 1}}>
          <Input
            placeholder={'Username'}
            leftIcon={<Icon name="user" type="font-awesome" color="#1d3f63" />}
            onChangeText={username => {
              this.setState({username: username});
            }}
            onBlur={() => {
              this.checkExist();
              console.log(userMsg);
            }}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.userError ? this.state.userMsg : ''}
          />
        </View>
        <View style={{flex: 1}}>
          <Input
            placeholder={'Email'}
            leftIcon={<Icon name={'mail'} type="AntDesign" color="#1d3f63" />}
            onChangeText={email => {
              this.setState({emailAddress: email});
              this.checkEmail();
            }}
            onBlur={() => {
              if (this.state.emailAddress === '') {
                this.setState({emailError: true});
              }
            }}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.emailError ? emailMsg : ''}
          />
        </View>
        <View style={{flex: 1}}>
          <Input
            placeholder={'Password'}
            secureTextEntry={this.state.firstVisible}
            leftIcon={
              <Icon name={'lock'} type="font-awesome" color="#1d3f63" />
            }
            rightIcon={iconView1}
            onChangeText={password => {
              this.setState({isShowFirst: true, firstPassword: password});
            }}
            onBlur={() => {
              if (this.state.firstPassword.length < 3) {
                this.setState({pwdError: true});
              } else {
                this.setState({pwdError: false});
              }
            }}
            errorStyle={{color: 'red'}}
            errorMessage={this.state.pwdError ? pwdMsg : ''}
          />
        </View>
        <View style={{flex: 1}}>
          <Input
            placeholder={'Password again'}
            secureTextEntry={this.state.secondVisible}
            leftIcon={
              <Icon name={'lock'} type="font-awesome" color="#1d3f63" />
            }
            rightIcon={iconView2}
            onChangeText={password => {
              this.setState({isShowSecond: true, secondPassword: password});
            }}
            errorStyle={{color: 'red'}}
            errorMessage={!this.state.isSame ? '两次输入密码不一致' : ''}
          />
        </View>
        <View style={{flex: 1}}>
          <CheckBox
            title={'注册为开发者'}
            checked={this.state.usertype}
            size={30}
            onPress={() => {
              this.setState({usertype: !this.state.usertype});
            }}
            containerStyle={{backgroundColor: '', padding: 5, margin: 5}}
            checkedColor={themeColor}
          />
        </View>
        <View style={{flex: 1}}>
          <Button
            buttonStyle={styles.button1}
            containerStyle={styles.buttonContainer}
            title="注册"
            titleStyle={styles.buttonTitle1}
            type="outline"
            disabled={!canClick}
            onPress={() => this.handleRegister()}
          />
        </View>
      </ScrollView>
    );
  }
}
export default RegisterPage;
