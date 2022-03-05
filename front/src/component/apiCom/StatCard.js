import {Card, Text, Divider, ListItem, CheckBox} from 'react-native-elements';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Button,
  Image,
} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import {WordStatService} from '../../service/StatService';
import {themeColor} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff'},
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 10,
    textAlign: 'center',
  },
  table: {
    paddingTop: 10,
  },
  titleView: {
    height: Platform.OS === 'ios' ? 64 : 44,
    paddingTop: Platform.OS === 'ios' ? 14 : 0,
    marginBottom: 10,
    backgroundColor: '#4a65ff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

class StatCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: this.props.orderInfo,
      wordstat: [],
      wordstaton: 0,
      checked: true,
      datetime1: '2021-09-13',
      datetime2: '2021-09-13',
    };
  }
  getWordStat() {
    WordStatService(
      this.state.orderInfo.orderid,
      !this.state.checked,
      this.state.datetime1,
      this.state.datetime2,
      data => {
        let datap = JSON.parse(data);
        console.log(datap);
        this.setState({
          wordstat: datap,
        });
      },
    );
  }
  handleWordStat() {
    if (this.state.wordstaton === 0) {
      this.getWordStat();
    } else {
      this.setState({
        wordstat: [],
      });
    }
    this.setState({
      wordstaton: 1 - this.state.wordstaton,
    });
  }

  render() {
    const order = this.state.orderInfo;
    console.log(order);
    const list = this.state.wordstat;
    let ondisplay = this.state.wordstaton;

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: 'row',
            },
          ]}>
          <View>
            <Text style={styles.instructions}>开始日期</Text>
            <DatePicker
              style={{width: 150}}
              date={this.state.datetime1}
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="确定"
              cancelBtnText="取消"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              minuteInterval={10}
              onDateChange={datetime => {
                this.setState({datetime1: datetime});
              }}
            />
          </View>
          <View>
            <Text style={styles.instructions}>截至日期</Text>
            <DatePicker
              style={{width: 150}}
              date={this.state.datetime2}
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="确定"
              cancelBtnText="取消"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              minuteInterval={10}
              onDateChange={datetime => {
                this.setState({datetime2: datetime});
              }}
            />
          </View>
        </View>
        <CheckBox
          title={'全部'}
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked})}
        />
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title={
            this.state.wordstaton === 0 ? '展开关键词被提问次数的统计' : '收起'
          }
          titleStyle={styles.buttonTitle}
          type="clear"
          onPress={() => this.handleWordStat()}
        />

        <View>
          {list.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.count}次</ListItem.Subtitle>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
}
export default StatCard;
