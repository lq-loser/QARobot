import * as React from 'react';

import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartPage from './view/StartPage';
import UserListPage from './view/UserListPage';
import LoginPage from './view/LoginPage';
import RegisterPage from './view/RegisterPage';
import ChatPage from './view/ChatPage';
import DeveloperPage from './view/DeveloperPage';
import BuyPage from './view/BuyPage';
import TestableStart from './view/StartPage';
import TestableLogin from './view/LoginPage';
import TestableUserList from './view/UserListPage';
import TestableDevelop from './view/DeveloperPage';
import DeveloperHomePage from './view/DeveloperHomePage';
import OrderDetailPage from './view/OrderDetailPage';

//new
import NameEditPage from './view/NameEditPage';
import AvatarEditPage from './view/AvatarEditPage';
//new

// Navigation Usage：onPress={() => navigation.navigate('Details')}
const Stack = createStackNavigator();
//传递参数
// function StartScreen({navigation}) {
//   return <StartPage navigation={navigation} />;
// }
function StartScreen({navigation}) {
  return <TestableStart navigation={navigation} />;
}
function OrderInfo({route, navigation}) {
  return <OrderDetailPage route={route} navigation={navigation} />;
}

function BuyScreen({route, navigation}) {
  return <BuyPage route={route} navigation={navigation} />;
}
function HomeScreen({route, navigation}) {
  return <TestableUserList navigation={navigation} route={route} />;
}
function LoginScreen({navigation}) {
  return <TestableLogin navigation={navigation} />;
}
function RegisterScreen({navigation}) {
  return <RegisterPage navigation={navigation} />;
}
function ChatScreen({route, navigation}) {
  return <ChatPage route={route} navigation={navigation} />;
}
function DeveloperScreen({route, navigation}) {
  return <TestableDevelop route={route} navigation={navigation} />;
}
function DeveloperHomeScreen({route, navigation}) {
  return <DeveloperHomePage route={route} navigation={navigation} />;
}
//new
function NameEditScreen({navigation}) {
  return <NameEditPage navigation={navigation} />;
}
function AvatarEditScreen({navigation}) {
  return <AvatarEditPage navigation={navigation} />;
}

//new

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Developer" component={DeveloperScreen} />
        <Stack.Screen name="BuyAPI" component={BuyScreen} />
        <Stack.Screen name="DevHome" component={DeveloperHomeScreen} />
        <Stack.Screen name="OrderInfo" component={OrderInfo} />

        {/*new*/}
        <Stack.Screen name="NameEdit" component={NameEditScreen} />
        <Stack.Screen name="AvatarEdit" component={AvatarEditScreen} />
        {/*new*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
