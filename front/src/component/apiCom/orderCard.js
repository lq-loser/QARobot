import {Card, Text, Divider} from 'react-native-elements';
import React from 'react';
import {View, StyleSheet, ScrollView, Platform} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';
import {WordStatService} from '../../service/StatService';
import {themeColor} from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderInfo: this.props.orderInfo,
    };
  }
  componentDidMount() {
    WordStatService(this.state.orderInfo.orderid, data => {
      console.log(data);
      this.setState({
        wordstat: data,
      });
    });
  }

  render() {
    const order = this.state.orderInfo;
    console.log(order);
    const OverView = {
      tableHead: ['订单编号', '开发者编号', 'API编号', 'API Key'],
      tableData: [[order.orderid, order.devid, order.apiid, '账号&密码']],
    };
    const Status = {
      tableHead: ['API', '截止日期', '请求地址', '已调用次数'],
      tableData: [
        [order.apiname, order.end_date, order.apiAddress, order.count],
      ],
    };
    const Info = {
      tableHead: ['接口地址', '返回格式', '请求方法', '接口备注'],
      tableData: [[order.apiAddress, 'json', 'POST', '根据消息返回回答']],
    };
    const POST = {
      tableHead: ['名称', '必填', '类型', '说明'],
      tableData: [
        ['APIname', '是', 'string', '需要调用的API名称，详见订单状态'],
        ['username', '是', 'string', '开发者用户名'],
        ['password', '是', 'string', '开发者密码'],
        ['msg', '是', 'string', '发送的消息'],
      ],
    };
    const RET = {
      tableHead: ['名称', '类型', '说明'],
      tableData: [
        ['error', 'string', '错误说明，若正确为authed'],
        ['reply', 'string', '机器人的回答'],
      ],
    };
    return (
      <View style={styles.container}>
        <Divider style={styles.table}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>订单概览</Text>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={OverView.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={OverView.tableData} textStyle={styles.text} />
          </Table>
        </Divider>
        <Divider style={styles.table}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>订单状态</Text>
          </View>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={Status.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={Status.tableData} textStyle={styles.text} />
          </Table>
        </Divider>
        <Divider style={styles.table}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>请求与返回示例</Text>
          </View>

          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={Info.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={Info.tableData} textStyle={styles.text} />
          </Table>
        </Divider>

        <Divider style={styles.table}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>请求参数</Text>
          </View>

          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={POST.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={POST.tableData} textStyle={styles.text} />
          </Table>
        </Divider>
        <Divider style={styles.table}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>返回参数</Text>
          </View>

          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row
              data={RET.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={RET.tableData} textStyle={styles.text} />
          </Table>
        </Divider>
      </View>
    );
  }
}
export default OrderCard;
