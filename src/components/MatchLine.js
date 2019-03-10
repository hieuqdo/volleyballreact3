import React from "react";
import axios from "axios";
import "./MatchLine.css";
import ScoreDropdown from "./ScoreDropdown";
import SaveConfModal from "./SaveConfModal";

const verticalAlign = {
  verticalAlign: "middle"
};

const bold = {
  fontWeight: "bold"
};

export default class MatchLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home_score: props.home_score || 0,
      away_score: props.away_score || 0,
      vs_text: "vs",
      confModal: false
    };
    this.saveScore = this.saveScore.bind(this);
  }

  color() {
    const home_score = this.state.home_score;
    const away_score = this.state.away_score;

    if (home_score === 0 && away_score === 0) {
      return "primary";
    }
    return "secondary";
  }

  toggleConfModal = () => {
    if (this.state.confModal) {
      this.setState({
        confModal: false
      });
    } else {
      this.setState({
        confModal: true
      });
    }
  };

  changeHome(e) {
    let home_score = 0;
    let away_score = 0;

    if (e.currentTarget.value >= 0) {
      home_score = e.currentTarget.value;
      away_score = 3 - e.currentTarget.value;
    }

    this.setState(
      {
        selected_home_score: home_score,
        selected_away_score: away_score
      },
      this.toggleConfModal()
    );
  }

  changeAway(e) {
    let home_score = 0;
    let away_score = 0;

    if (e.currentTarget.value >= 0) {
      away_score = e.currentTarget.value;
      home_score = 3 - e.currentTarget.value;
    }

    this.setState(
      {
        selected_home_score: home_score,
        selected_away_score: away_score
      },
      this.toggleConfModal()
    );
  }

  saveScore() {
    var match_id_url = `${this.props.matches_url}/${this.props.id}`;

    axios
      .patch(match_id_url, {
        match: {
          home_score: this.state.selected_home_score,
          away_score: this.state.selected_away_score
        }
      })
      .then(response => {
        this.setState({
          home_score: this.state.selected_home_score,
          away_score: this.state.selected_away_score,
          confModal: false
        });
        this.props.showModal("Save Successful", "Thanks!", "Have a nice day");
      })
      .catch(error => {
        this.setState(
          {
            confModal: false
          },
          () => {
            console.log(match_id_url + ": " + error);
            this.props.onError();
            this.props.showModal("Save Failed", "" + error, "Okay");
          }
        );
      });
  }

  disableFuture() {
    return Date.parse(this.props.date) > Date.now();
  }

  render() {
    return (
      <tr style={verticalAlign}>
        <td style={verticalAlign}>{this.props.date}</td>
        <td align="right" style={verticalAlign}>
          <span style={this.state.home_score > 1 ? { fontWeight: "bold" } : {}}>
            {this.props.home_team}
          </span>
        </td>
        <td style={verticalAlign}>
          {this.disableFuture() ? (
            ""
          ) : (
            <ScoreDropdown
              onClick={this.changeHome.bind(this)}
              team_name={this.props.home_team}
              score={this.state.home_score}
              disabled={this.disableFuture.bind(this)()}
              color={this.state.home_score > 1 ? "info" : this.color()}
            />
          )}
        </td>
        <td style={verticalAlign}>{this.state.vs_text}</td>
        <td style={verticalAlign}>
          {this.disableFuture() ? (
            ""
          ) : (
            <ScoreDropdown
              onClick={this.changeAway.bind(this)}
              team_name={this.props.away_team}
              score={this.state.away_score}
              disabled={this.disableFuture.bind(this)()}
              color={this.state.away_score > 1 ? "info" : this.color()}
            />
          )}
        </td>
        <td style={verticalAlign}>
          <span style={this.state.away_score > 1 ? { fontWeight: "bold" } : {}}>
            {this.props.away_team}
          </span>
        </td>
        <td style={verticalAlign}>{this.props.location}</td>
        <SaveConfModal
          isOpen={this.state.confModal}
          toggle={this.toggleConfModal}
          home_team={this.props.home_team}
          home_score={this.state.selected_home_score}
          away_team={this.props.away_team}
          away_score={this.state.selected_away_score}
          onClick={this.saveScore}
          date={this.props.date}
          location={this.props.location}
        />
      </tr>
    );
  }
}
