import React from 'react';
import {Header} from 'react-native-elements';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {themeColor} from '../../styles';

/**
 * ReturnHead - 登录和注册页面上方的返回按钮
 * */
class ReturnHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }
  changeNav() {
    this.props.changeNav(this.state.navigation);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          backgroundColor={themeColor}
          leftComponent={
            <Icon
              name="angle-left"
              type="font-awesome"
              color={'white'}
              onPress={() => {
                this.state.navigation.navigate('Start');
                this.changeNav();
              }}
            />
          }
        />
      </View>
    );
  }
}
export default ReturnHead;
