import React from "react";
import axios from "axios";
import "./MatchLine.css";
import ScoreDropdown from "./ScoreDropdown";
import SaveConfModal from "./SaveConfModal";
import moment from "moment";
import API from "../utils/API"

const verticalAlign = {
  verticalAlign: "middle"
};

const bold = {
  fontWeight: "bold"
};

export default class MatchLine extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      homeScore: props.homeScore || 0,
      awayScore: props.awayScore || 0,
      vs_text: "vs",
      confModal: false
    };
    this.saveScore = this.saveScore.bind(this);
  }

  color() {
    const homeScore = this.state.homeScore;
    const awayScore = this.state.awayScore;

    if (homeScore === 0 && awayScore === 0) {
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
    let homeScore = 0;
    let awayScore = 0;

    if (e.currentTarget.value >= 0) {
      homeScore = e.currentTarget.value;
      awayScore = 3 - e.currentTarget.value;
    }

    this.setState(
      {
        selected_homeScore: homeScore,
        selected_awayScore: awayScore
      },
      this.toggleConfModal()
    );
  }

  changeAway(e) {
    let homeScore = 0;
    let awayScore = 0;

    if (e.currentTarget.value >= 0) {
      awayScore = e.currentTarget.value;
      homeScore = 3 - e.currentTarget.value;
    }

    this.setState(
      {
        selected_homeScore: homeScore,
        selected_awayScore: awayScore
      },
      this.toggleConfModal()
    );
  }

  saveScore() {
    API.patch(`Games/${this.props.id}`,
    {
      "homeScore": this.state.selected_homeScore, 
      "awayScore": this.state.selected_awayScore
    })
      .then(response => {
        this.setState({
          homeScore: this.state.selected_homeScore,
          awayScore: this.state.selected_awayScore,
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
        <td style={verticalAlign}>{moment(this.props.date).format("ddd, MMM D")}</td>
        <td align="right" style={verticalAlign}>
          <span style={this.state.homeScore > 1 ? { fontWeight: "bold" } : {}}>
            {this.props.homeTeam.name}
          </span>
        </td>
        <td style={verticalAlign}>
          {this.disableFuture() ? (
            ""
          ) : (
            <ScoreDropdown
              onClick={this.changeHome.bind(this)}
              team_name={this.props.homeTeam.name}
              score={this.state.homeScore}
              disabled={this.disableFuture.bind(this)()}
              color={this.color()}
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
              team_name={this.props.awayTeam.name}
              score={this.state.awayScore}
              disabled={this.disableFuture.bind(this)()}
              color={this.color()}//{this.state.awayScore > 1 ? "info" : this.color()}
            />
          )}
        </td>
        <td style={verticalAlign}>
          <span style={this.state.awayScore > 1 ? { fontWeight: "bold" } : {}}>
            {this.props.awayTeam.name}
          </span>
        </td>
        <td style={verticalAlign}>{this.props.location.name}</td>
        <SaveConfModal
          isOpen={this.state.confModal}
          toggle={this.toggleConfModal}
          homeTeam={this.props.homeTeam}
          homeScore={this.state.selected_homeScore}
          awayTeam={this.props.awayTeam}
          awayScore={this.state.selected_awayScore}
          onClick={this.saveScore}
          date={this.props.date}
          location={this.props.location}
        />
      </tr>
    );
  }
}
