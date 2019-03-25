import React from 'react';
import TeamCard from './TeamCard';

interface OwnProps {}
interface StateProps {
  teams: any[];
}
type Props = OwnProps & StateProps;

export default class TeamList extends React.Component<Props> {
  render = () => {
    return (
      <div>
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
    );
  };
}
