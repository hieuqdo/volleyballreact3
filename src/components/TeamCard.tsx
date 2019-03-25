import React from "react";
import 'antd/dist/antd.css'
import { Card, Col } from 'antd';

const { Meta } = Card;

interface Team {
    name: string
    company: { name: string }
}

export default class TeamCard extends React.Component<Team> {
    constructor(props: Team) {
        super(props);
    }
  
    render() {
      return (
        <div>
            <Card
                hoverable
                style={{ width: 240, margin: 8 }}
                cover={<img alt="teampic" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                <Meta
                title={this.props.name}
                description={this.props.company.name}
                />
            </Card>
        </div>
      );
    }
  }
  