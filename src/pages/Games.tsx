/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import moment, { Moment } from 'moment';
import { Radio, DatePicker } from 'antd';
import produce from 'immer';

import { ScoreTable } from '../components';
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
  from: Moment;
  to: Moment;
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

const style = css`
  .options-box {
    background-color: #fff;
    margin: 8px;
    border: 1px solid lightgrey;
  }
  .filter-options {
    padding: 8px 4px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > * {
      margin: 0 4px;
    }
    .ant-radio-button-wrapper,
    .ant-input {
      background: none;
    }
  }
  .spacer {
    width: 90%;
    background: #fff;
    border-bottom: 1px solid lightgrey;
    margin: 4px auto;
  }
`;

class ScoreScreen extends React.Component<Props, State> {
  state: State = {
    filter: Filter.all,
    modal: false,
    from: moment().subtract(1, 'months'),
    to: moment().add(1, 'months')
  };

  // componentDidMount = () => this.props.fetchGames();

  changeFilter = (event: RadioChangeEvent) => this.setState({ filter: event.target.value });

  handleDateChange = (date: Moment, target: 'from' | 'to') =>
    this.setState(state =>
      produce(state, draft => {
        draft[target] = date;
      })
    );

  render = () => {
    const { filter, from, to } = this.state;
    const { games } = this.props;

    const filters = [Filter.all, Filter.unscored, Filter.upcoming];

    return (
      <div css={style}>
        <div>
          <div className="options-box">
            <div className="filter-options">
              Filter by:&nbsp;
              <Radio.Group size="small" onChange={this.changeFilter} defaultValue={Filter.all}>
                {filters.map(filter => (
                  <Radio.Button value={filter}>{filter}</Radio.Button>
                ))}
              </Radio.Group>
              <DatePicker
                size="small"
                placeholder="From Date"
                defaultPickerValue={from}
                onChange={val => this.handleDateChange(val, 'from')}
              />
              <DatePicker
                size="small"
                placeholder="To Date"
                defaultPickerValue={to}
                onChange={val => this.handleDateChange(val, 'to')}
              />
            </div>
            <div className="spacer" />
            <div className="filter-options">
              Temp
              <DatePicker size="small" />
            </div>
          </div>
        </div>
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
