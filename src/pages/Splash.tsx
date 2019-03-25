/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';

import logo from '../images/logo.png';

const style = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <div css={style}>
    <img src={logo} alt="Rancho Bernardo Volleyball League logo" />
  </div>
);
