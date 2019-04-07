import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';

interface OwnProps {}
interface StateProps {
  teamId: number;
  team: any[];
}
interface DispatchProps {
  fetchTeams: (...args: number[]) => any;
}

type Props = OwnProps & StateProps & DispatchProps;

class TeamPage extends React.Component<Props> {

  componentDidMount = () => this.props.fetchTeams(this.props.teamId);

  render = () => {
    const { team } = this.props;

      return (
        <div />
      );
    };
}

const mapStateToProps = (state: any) => ({
  team: state.reducer.team
});

const mapDispatchToProps = {
fetchTeams: actions.fetchTeams
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(TeamPage);

//team picture
//company name
//since '92 etc.
//wins : losses / win % / games played
//roster
//hidden roster modification controls?
//game list (scorescreen with team name filter applied)