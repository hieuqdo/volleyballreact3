/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import ScoreScreen from '../components/ScoreScreen';

const style = css`
  /* background-color: lightgrey; */
`;

export default () => (
  <div css={style}>
    <ScoreScreen />
  </div>
);
