import React from 'react';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {ScrollView, Text, View} from 'react-native';
import {themeColor} from '../../styles';

/**
 * RightIcon - 代表密码输入框右侧眼睛按钮，可随着输入而改变
 * */
class RightIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: !this.props.visible,
      visIcon: this.props.visIcon,
    };
  }

  handleChange() {
    this.props.changeProp(this.state.visible, this.state.visIcon);
  }
  render() {
    const eyeIcon = ['eye-slash', 'eye'];
    return (
      <View>
        <Icon
          name={this.state.visIcon ? eyeIcon[0] : eyeIcon[1]}
          type={'font-awesome'}
          color={themeColor}
          onPress={() => {
            this.setState({
              visible: !this.state.visible,
              visIcon: !this.state.visIcon,
            });
            this.handleChange();
          }}
        />
      </View>
    );
  }
}

export default RightIcon;
