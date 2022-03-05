import React from 'react';
import {Button, Divider, Text} from 'react-native-elements';

import {styles} from '../styles';
import {hook, wrap} from 'cavy';

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }

  render() {
    const {generateTestHook} = this.props;
    const TestableText = wrap(Text);
    const WrappedButton = wrap(Button);
    return (
      <Divider style={styles.startContainer}>
        <TestableText
          h1
          h1Style={{textAlign: 'center', marginBottom: 200, color: '#ffffff'}}
          ref={generateTestHook('Start.title')}>
          QA Robot
        </TestableText>

        <WrappedButton
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="登录"
          titleStyle={styles.buttonTitle}
          type="clear"
          onPress={() => this.state.navigation.navigate('Login')}
          ref={generateTestHook('StartLogin.Button')}
        />

        <WrappedButton
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title="注册"
          titleStyle={styles.buttonTitle}
          type="clear"
          onPress={() => this.state.navigation.navigate('Register')}
          ref={generateTestHook('StartRegister.Button')}
        />
      </Divider>
    );
  }
}
// export default StartPage;
const TestableStart = hook(StartPage);

export default TestableStart;
