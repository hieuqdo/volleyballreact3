/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TeamList from '../components/TeamList';
import TeamCard from '../components/TeamCard';
import API from '../utils/API';

export default () => (
    <div>
        <TeamCard
            name='Test'
            company='Northrop' />
    </div>
  );
  
  