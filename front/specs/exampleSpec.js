export default function (spec) {
  /**
   * 测试用例1 - 测试进入开始页面
   * */
  spec.describe('Start page', function () {
    spec.it('works', async function () {
      await spec.exists('Start.title');
    });
  });
  /**
   * 测试用例2 - 测试进入开始页面，点击登录进入登录界面功能
   * */
  spec.describe('Start page to Login page', function () {
    spec.it('works', async function () {
      await spec.exists('Start.title');
      // await spec.fillIn('LoginScreen.EmailInput', 'cavy@example.com');
      // await spec.fillIn('LoginScreen.PasswordInput', 'password');
      await spec.press('StartLogin.Button');
      await spec.exists('Login.title');
    });
  });
  /**
   * 测试用例3 - 测试通过普通用户账号登录，进入挑选机器人界面
   * */
  spec.describe('Try to Login for the first time', function () {
    spec.it('works', async function () {
      // await spec.fillIn('LoginScreen.EmailInput', 'cavy@example.com');
      // await spec.fillIn('LoginScreen.PasswordInput', 'password');
      await spec.press('StartLogin.Button');
      await spec.fillIn('Login.userInput', 'HYD');
      await spec.fillIn('Login.pwdInput', '001713');
      await spec.press('Login.btn');
      await spec.exists('userList0');
    });
  });
  /**
   * 测试用例4 - 测试通过开发者用户登录，进入开发者界面
   * */
  spec.describe('Try to Login for the second time', function () {
    spec.it('works', async function () {
      // await spec.fillIn('LoginScreen.EmailInput', 'cavy@example.com');
      // await spec.fillIn('LoginScreen.PasswordInput', 'password');
      await spec.press('StartLogin.Button');
      await spec.fillIn('Login.userInput', 'A');
      await spec.fillIn('Login.pwdInput', '123456');
      await spec.press('Login.btn');
      await spec.exists('Develop.avatar');
    });
  });
  /**
   * 测试用例5 - 测试通过开发者用户登录，进入开发者界面
   * */
  spec.describe('Try to use wrong username to login', function () {
    spec.it('works', async function () {
      // await spec.exists('Start.title');
      // await spec.fillIn('LoginScreen.EmailInput', 'cavy@example.com');
      // await spec.fillIn('LoginScreen.PasswordInput', 'password');
      await spec.press('StartLogin.Button');
      await spec.fillIn('Login.userInput', 'A');
      await spec.fillIn('Login.pwdInput', '12345678');
      await spec.press('Login.btn');
      await spec.exists('Login.title');
    });
  });
  /**
   * 测试用例6 - 测试进入开始页面，点击注册进入注册界面功能
   * */
  spec.describe('Start to Register', function () {
    spec.it('works', async function () {
      // await spec.fillIn('LoginScreen.EmailInput', 'cavy@example.com');
      // await spec.fillIn('LoginScreen.PasswordInput', 'password');
      await spec.press('StartRegister.Button');
      await spec.exists('Register.title');
    });
  });
}
