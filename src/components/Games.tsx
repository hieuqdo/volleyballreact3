import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Radio } from 'antd';

import ScoreTable from './ScoreTable';
import actions from '../redux/actions';
import { selectGames } from '../redux/selectors';
import { RadioChangeEvent } from 'antd/lib/radio';

interface OwnProps {}
interface StateProps {
  games: any[];
}
interface DispatchProps {
  fetchGames: (...args: any[]) => any;
}

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  filter: Filter;
  modal: boolean;
};

enum Filter {
  all = 'all',
  unscored = 'unscored',
  upcoming = 'upcoming'
}

const filterMap = {
  all: (games: any) => games,
  unscored: (match: any) => !match.awayScore && !match.homeScore && moment() > moment(match.date),
  upcoming: (match: any) => moment() <= moment(match.date)
};

class ScoreScreen extends React.Component<Props, State> {
  state: State = {
    filter: Filter.all,
    modal: false
  };

  componentDidMount = () => this.props.fetchGames();

  changeFilter = (event: RadioChangeEvent) => this.setState({ filter: event.target.value });

  render = () => {
    const { filter } = this.state;
    const { games } = this.props;

    const filters = [Filter.all, Filter.unscored, Filter.upcoming];

    return (
      <div>
        Filter: &nbsp;
        <Radio.Group onChange={this.changeFilter} defaultValue={Filter.all}>
          {filters.map(filter => (
            <Radio.Button value={filter}>{filter}</Radio.Button>
          ))}
        </Radio.Group>
        <ScoreTable games={games.filter(filterMap[filter])} />
      </div>
    );
  };
}

const mapStateToProps = (state: any) => ({
  games: selectGames(state)
});

const mapDispatchToProps = {
  fetchGames: actions.fetchGames
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreScreen);
