import React from 'react';
import {
  Avatar,
  Header,
  Input,
  BottomSheet,
  ListItem,
  Button,
} from 'react-native-elements';
import {Alert, AsyncStorage, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {styles, themeColor} from '../styles';
import ImageCropPicker from 'react-native-image-crop-picker';
import {AvatarEditService} from '../service/UserService';
import {AvatarGetService} from '../service/UserService';
class NameEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      isVisible: false,
      // username: '',
      // imagedata: '',
      // imagemime: '',
      newimagedata: '',
      newimagemime: '',
      user: {},
    };
  }
  _openAlbum() {
    const option = {
      width: 300,
      height: 300,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    };
    ImageCropPicker.openPicker(option).then(image => {
      console.log(image);
      this.setState({newimagedata: image.data, newimagemime: image.mime});
      this.handleAvatarEdit();
      this.setState({isVisible: false});
    });
  }

  _openCamera() {
    const option = {
      width: 300,
      height: 300,
      mediaType: 'photo',
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
    };
    ImageCropPicker.openCamera(option).then(image => {
      console.log(image);
      this.setState({newimagedata: image.data, newimagemime: image.mime});
      this.handleAvatarEdit();
      this.setState({isVisible: false});
    });
  }

  handleAvatarEdit = () => {
    if (this.state.newimagedata.length <= 3999999) {
      AvatarEditService(
        this.state.user.userid,
        this.state.newimagedata,
        this.state.newimagemime,
        data => {
          if (data.msg === 'success') {
            let user = this.state.user;
            user.imagedata = this.state.newimagedata;
            user.imagemime = this.state.newimagemime;
            AsyncStorage.setItem('user', JSON.stringify(user));
            this.setState({user: user});
            // this.setState({
            //   imagedata: this.state.newimagedata,
            //   imagemime: this.state.newimagemime,
            // });
          }
          this.setState({newimagedata: '', newimagemime: ''});
        },
      );
    } else {
      Alert.alert('提示', '图片大小过大，请重新选择', [
        {text: '我知道了', onPress: this.confirm},
      ]);
      this.state.navigation.navigate('AvatarEdit');
      this.setState({newimagedata: '', newimagemime: ''});
    }
  };

  // getAvatar = () => {
  //   AsyncStorage.getItem('user').then(data => {
  //     if (data) {
  //       let userdata = JSON.parse(data);
  //       this.setState({username: userdata.username});
  //     }
  //   });
  //   AvatarGetService(this.state.username, data => {
  //     this.setState({imagedata: data.imagedata, imagemime: data.imagemime});
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
  render() {
    const list = [
      {
        title: '从相册选择图片',
        onPress: this._openAlbum.bind(this),
      },
      {
        title: '拍照',
        onPress: this._openCamera.bind(this),
      },
      {
        title: '取消',
        containerStyle: {backgroundColor: 'red'},
        titleStyle: {color: 'white'},
        onPress: () => {
          this.setState({isVisible: false});
        },
      },
    ];
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
              color={'white'}
              onPress={() => {
                this.state.navigation.navigate('Developer');
              }}
            />
          }
          centerComponent={{
            text: 'EditAvatar',
            style: {color: '#fff', fontSize: 30},
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 3,
          }}>
          <Avatar
            rounded
            size={150}
            source={{
              // uri: 'https://placeimg.com/140/140/any'
              uri: `data:${this.state.user.imagemime};base64,${this.state.user.imagedata}`,
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
          }}>
          <Button
            buttonStyle={styles.button1}
            containerStyle={styles.buttonContainer}
            title="修改头像"
            titleStyle={styles.buttonTitle1}
            type="clear"
            onPress={() => {
              this.setState({isVisible: true});
            }}
          />
        </View>
        <BottomSheet
          isVisible={this.state.isVisible}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          {list.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </View>
    );
  }
}

export default NameEditPage;
