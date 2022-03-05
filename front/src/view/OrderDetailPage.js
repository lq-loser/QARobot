import {
  Header,
  BottomSheet,
  Button,
  Text,
  ListItem,
} from 'react-native-elements';
import React from 'react';
import {View, StyleSheet, ScrollView, AsyncStorage, Alert} from 'react-native';
import {themeColor} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getOrder} from '../service/DevService';
import OrderCard from '../component/apiCom/orderCard';
import {WordStatService} from '../service/StatService';
import DatePicker from 'react-native-datepicker';
import StatCard from '../component/apiCom/StatCard';

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

class OrderDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }
  componentDidMount() {
    const {params} = this.props.route;
    WordStatService(params.order.orderid, data => {
      console.log(data);
      this.setState({
        wordstat: data,
      });
    });
  }

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
            text: '订单详情',
            style: {color: '#fff', fontSize: 30},
          }}
        />

        <ScrollView>
          <OrderCard orderInfo={params.order} />
          <StatCard orderInfo={params.order} />
        </ScrollView>
      </View>
    );
  }
}

export default OrderDetailPage;
