import React from "react";
import 'antd/dist/antd.css'
import TeamCard from './TeamCard'

export default class TeamList extends React.Component {
    constructor(props: any) {
      super(props);
    }
  
    render() {
      return (
        <div>
        {/* <div style={scoreDiv}>
          {this.props.teams
            .sort((a, b) => moment(a.date) - moment(b.date))
            .map((item, index) => (
              <TeamCard
                onError={this.setError}
                key={index}
                showModal={this.toggleModal}
                {...item}
              />
            ))}
        </div> */}
        </div>
      );
    }
  }
  