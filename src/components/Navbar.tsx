/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { Link } from 'react-router-dom';

const { Item } = Menu;

type State = {
  path: string;
};

const linkMap: {
  name: string;
  path: string;
}[] = [{ name: 'Home', path: '/' }, { name: 'Teams', path: '/teams' }];

const style = css`
  display: flex;
  justify-content: center;
  line-height: 64px;
`;

export default class Navbar extends React.Component<{}, State> {
  state = {
    path: '/'
  };

  handleMenuClick = (event: ClickParam) => this.setState({ path: event.key });

  render = () => (
    <Menu
      theme="dark"
      mode="horizontal"
      onClick={this.handleMenuClick}
      selectedKeys={[this.state.path]}
      css={style}
    >
      {linkMap.map(link => (
        <Item key={link.path}>
          <Link to={link.path}>{link.name}</Link>
        </Item>
      ))}
    </Menu>
  );
}
