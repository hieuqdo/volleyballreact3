/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectPath } from '../redux/selectors';

const { Item } = Menu;

interface Props {
  path: string;
}

const linkMap: {
  name: string;
  path: string;
}[] = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' },
  { name: 'Teams', path: '/teams' }
];

const style = css`
  display: flex;
  justify-content: center;
  line-height: 64px;
`;

class Navbar extends React.PureComponent<Props> {
  render = () => (
    <Menu theme="dark" mode="horizontal" selectedKeys={[this.props.path]} css={style}>
      {linkMap.map(link => (
        <Item key={link.path}>
          <Link to={link.path}>{link.name}</Link>
        </Item>
      ))}
    </Menu>
  );
}

const mapStateToProps = (state: any) => ({
  path: selectPath(state)
});

export default connect(mapStateToProps)(Navbar);
