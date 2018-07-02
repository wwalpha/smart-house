import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { isMobile } from 'react-device-detect';
import createstore from 'src/store';
import App from 'src/containers/App';

const history = createBrowserHistory();
const store = createstore(history);

const start = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

const app = {
  // Application Constructor
  initialize: (): void => {
    document.addEventListener('deviceready', this.deviceReady.bind(this), false);
  },

  // Update DOM on a Received Event
  deviceReady: (id: string) => {
    start();
  },
};

if (isMobile) {
  // app.initialize();
  start();
} else {
  start();
}
