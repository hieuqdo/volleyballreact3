import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import TeamList from '../components/TeamList';

interface OwnProps {}
interface StateProps {
  teams: any[];
}
interface DispatchProps {
  fetchTeams: (...args: any[]) => any;
}

type Props = OwnProps & StateProps & DispatchProps;

class Teams extends React.Component<Props> {

  componentDidMount = () => this.props.fetchTeams();

  render = () => {
    const { teams } = this.props;

    return (
      <TeamList teams={teams} />
    );
  };
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {
  fetchTeams: actions.fetchTeams
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamList);
