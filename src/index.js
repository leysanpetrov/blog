import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from './App/App';
import 'antd/dist/antd.css'
import ErrorBoundry from './components /ErrorBoundry/ErrorBoundry'
import BlogServices from './Services/BlogServices'
import {BlogServicesProvider} from './components /blogServicesContext/blogServicesContext'
import store from './store'

const blogServices = new BlogServices();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BlogServicesProvider value={blogServices}>
          <App />
      </BlogServicesProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);

