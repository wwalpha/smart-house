import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { CognitoIdentityCredentials } from 'aws-sdk';
import { createBrowserHistory } from 'history';
import Amplify from 'aws-amplify';
import { isIOS } from 'react-device-detect';
import { Cognito, Config } from 'utils/aws';
import App from 'src/containers/App';
import createstore from 'src/store';

const history = createBrowserHistory();
const store = createstore(history);

const start = (userInfo: any) => {
  console.log(userInfo);
  render(
    <Provider store={store}>
      <App userInfo={userInfo} />
    </Provider>,
    document.getElementById('root'),
  );
};

(global as any).fetch = require('node-fetch');

Amplify.configure({
  Auth: {
    region: Config.Region,
    identityPoolId: Config.Cognito.IdentityPoolId,
    userPoolId: Config.Cognito.UserPoolId,
    userPoolWebClientId: Config.Cognito.UserPoolWebClientId,
  },
  Storage: {
    region: Config.Region,
    bucket: Config.Bucket,
    IdentityPoolId: Config.Cognito.IdentityPoolId,
  },
});

const username: string = 'test12';
const password: string = 'test1234567890';
console.log(112323);
if (isIOS) {
  document.addEventListener(
    'deviceready',
    () => Cognito.login(username, password).then(userInfo => start(userInfo)),
    false);
} else {
  Cognito.login(username, password).then(userInfo => start(userInfo)).catch(err => console.log(err));
}
