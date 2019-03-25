import React from "react";
import 'antd/dist/antd.css'
import { Card } from 'antd';

const { Meta } = Card;

interface Team {
    name: string
    company: string
}

export default class TeamCard extends React.Component<Team> {
    constructor(props: Team) {
        super(props);
    }
  
    render() {
      return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="teampic" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
        <Meta
          title={this.props.name}
          description={this.props.company}
        />
      </Card>
      );
    }
  }
  