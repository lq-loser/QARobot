import {
  Header,
  BottomSheet,
  Button,
  ListItem,
  Overlay,
} from 'react-native-elements';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  AsyncStorage,
  Alert,
} from 'react-native';
import {themeColor} from '../styles';
import ApiCard from '../component/apiCom/apiCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {addOrder} from '../service/DevService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buy: {
    marginBottom: 0,
    height: 70,
    backgroundColor: themeColor,
  },
  buttonTitle: {
    fontSize: 40,
  },
});

class BuyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      BuyVisibility: false,
      PurchaseAlert: false,
      user: {},
    };
  }

  async componentDidMount() {
    try {
      const shop = await AsyncStorage.getItem('user');
      this.setState({user: shop});
      console.log(this.state.user);
    } catch (error) {
      console.log(error);
    }
  }

  BuyCallback = buying => {
    this.setState({BuyVisibility: buying});
  };

  buyAPI = days => {
    const {params} = this.props.route;
    let user = JSON.parse(this.state.user);
    let userID = user.userid;
    let devID = user.devid;
    let apiID = params.api.apiID;
    const json = {
      userID: userID,
      devID: devID,
      apiID: apiID,
      days: days,
    };
    console.log(json);
    const callback = data => {
      console.log(data);
      let userdata = '';
      userdata = data.userdata;
      console.log(userdata);
      if (userdata === '恭喜您，订阅成功！') {
        Alert.alert('提示', userdata + '请到”我的API“查看详情', [
          {
            text: '我知道了',
            onPress: this.confirm,
          },
        ]);
      } else {
        Alert.alert('提示', '下单出现错误。' + userdata, [
          {
            text: '我知道了',
            onPress: this.confirm,
          },
        ]);
      }
    };
    addOrder(json, callback);
    this.state.navigation.navigate('DevHome');
  };

  BuyList = [
    {
      title: '7天',
      onPress: () => {
        this.buyAPI(7);
      },
    },
    {
      title: '30天',
      onPress: () => {
        this.buyAPI(30);
      },
    },
    {
      title: '90天',
      onPress: () => {
        this.buyAPI(90);
      },
    },
    {
      title: '180天',
      onPress: () => {
        this.buyAPI(180);
      },
    },

    {
      title: 'Cancel',
      containerStyle: {backgroundColor: themeColor},
      titleStyle: {color: 'white'},
      onPress: () => {
        this.setState({BuyVisibility: false});
      },
    },
  ];

  render() {
    const {params} = this.props.route;

    return (
      <View style={styles.container}>
        <Header
          backgroundColor={themeColor}
          leftComponent={
            <Icon
              name="angle-left"
              type="font-awesome"
              onPress={() => {
                this.state.navigation.goBack();
              }}
              color={'#fff'}
              size={40}
            />
          }
          centerComponent={{
            text: 'API详情',
            style: {color: '#fff', fontSize: 30},
          }}
          rightComponent={
            <Icon
              name="info"
              type="AntDesign"
              //onPress={() => {
              //this.state.navigation.navigate('Start');
              //}}
              color={'#fff'}
              size={40}
            />
          }
        />

        <ScrollView>
          <ApiCard callback={this.BuyCallback} API={params.api} />
        </ScrollView>

        <Button
          title={'购买API'}
          titleStyle={styles.buttonTitle}
          onPress={() => {
            this.setState({BuyVisibility: true});
          }}
          buttonStyle={styles.buy}
        />

        <BottomSheet
          isVisible={this.state.BuyVisibility}
          containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
          {this.BuyList.map((l, i) => (
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

export default BuyPage;
