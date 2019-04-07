/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Route } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import './index.css';

import { Navbar } from './components';
import { Splash, Games, Teams } from './pages';

const style = css`
  min-height: 100%;

  .ant-layout-header {
    position: fixed;
    z-index: 10;
    width: 100%;
  }

  .ant-layout-content {
    margin-top: 64px;
    flex: 1 0 auto;
  }

  .ant-layout-footer {
    text-align: center;
    color: rgba(255, 255, 255, 0.65);
    background-color: #001529;
    flex-shrink: 0;
  }
`;

export default class App extends React.Component {
  render() {
    return (
      <Layout css={style}>
        <Layout.Header>
          <Navbar />
        </Layout.Header>
        <Layout.Content>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Route path="/" exact component={Splash} />
          <Route path="/games" component={Games} />
          <Route path="/teams" component={Teams} />
        </Layout.Content>
        <Layout.Footer>
          Site by The Pho House
          <br />
          <div>
            Logo made with{' '}
            <a href="https://www.designevo.com/en/" title="Free Online Logo Maker">
              DesignEvo
            </a>
          </div>
        </Layout.Footer>
      </Layout>
    );
  }
}
