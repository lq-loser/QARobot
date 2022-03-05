import {StyleSheet} from 'react-native';

export const themeColor = '#2260e7';
export const themeColor2 = '#85afe2';
export const themeColor3 = '#859be2';
export const themeColor4 = '#9f9f9f';
export const styles = StyleSheet.create({
  startContainer: {
    backgroundColor: themeColor,
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: 50,
  },
  view: {
    flex: 1,
  },
  button: {
    height: 50,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  button1: {
    height: 50,
    borderRadius: 40,
    backgroundColor: themeColor,
  },
  buttonContainer: {
    marginHorizontal: 100,
    marginVertical: 10,
  },
  buttonTitle: {
    fontSize: 24,
    color: themeColor,
  },
  buttonTitles: {
    fontSize: 18,
    color: 'white',
  },
  buttonTitle1: {
    fontSize: 24,
    color: 'white',
  },
  header: {},
  tab: {
    backgroundColor: themeColor,
  },
  tabIndicator: {
    backgroundColor: 'white',
  },
});
