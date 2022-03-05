import React from 'react';
import {Header, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {ScrollView, View} from 'react-native';
import {themeColor} from '../../styles';
import {hook, wrap} from 'cavy';

/**
 * LoginTitle - Show the title of Login or Register
 * */
class LoginTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: this.props.isLogin,
    };
  }
  render() {
    const {generateTestHook} = this.props;
    const TestableText = wrap(Text);
    return this.state.isLogin ? (
      <View style={{flex: 2}}>
        <TestableText
          h1
          h1Style={{
            textAlign: 'center',
            marginTop: 50,
            marginBottom: 20,
            color: themeColor,
            fontSize: 43,
          }}
          ref={generateTestHook('Login.title')}>
          Login
        </TestableText>
      </View>
    ) : (
      <View style={{flex: 1}}>
        <TestableText
          h1
          h1Style={{
            textAlign: 'center',
            marginTop: 50,
            marginBottom: 20,
            color: themeColor,
          }}
          ref={generateTestHook('Register.title')}>
          Register
        </TestableText>
      </View>
    );
  }
}
// export default LoginTitle;
const TestableScene = hook(LoginTitle);
export default TestableScene;
