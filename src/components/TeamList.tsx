/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import TeamCard from './TeamCard';

interface OwnProps {}
interface StateProps {
  teams: any[];
}
type Props = OwnProps & StateProps;

const tileLayout = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const container = css({
  display: "flex",
  justifyContent: "center",
})

export default class TeamList extends React.Component<Props> {
  render = () => {
    return (
      <div css={container}>
        <div css={tileLayout}>
          {this.props.teams.sort((a, b) => {
                    if(a.name < b.name) { return -1; }
                    if(a.name > b.name) { return 1; }
                    return 0;
                })
                .map((item, index) => (
                  <TeamCard
                    {...item}
                  />
                ))}
        </div>
      </div>
    );
  };
}
