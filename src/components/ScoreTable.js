import React from 'react';
import { Table } from 'reactstrap';
import MatchLine from './MatchLine';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import ModalMsg from './ModalMsg';
import moment from 'moment';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const styleTableCell = {
  padding: '15px',
  textAlign: 'left'
};

const scoreDiv = {
  margin: 'auto',
  width: '90%',
  maxWidth: '1000px',
  textAlign: 'left'
};

export default class ScoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      error: false
    };
  }

  toggleModal = (header, body, footer) => {
    if (this.state.modal) {
      this.setState({
        modal: false,
        error: false
      });
    } else {
      this.setState({
        modal: true,
        modalHeader: header,
        modalBody: body,
        modalFooter: footer
      });
    }
  };

  setError = () => {
    this.setState({
      error: true
    });
  };

  render() {
    return (
      <div style={styles}>
        <br />
        <h2>{this.props.title}</h2>
        <br />
        <div style={scoreDiv}>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th />
                <th />
                <th />
                <th />
                <th />
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.props.games
                .sort((a, b) => moment(a.date) - moment(b.date))
                .map((item, index) => (
                  <MatchLine
                    onError={this.setError}
                    key={index}
                    showModal={this.toggleModal}
                    {...item}
                  />
                ))}
            </tbody>
          </Table>
        </div>
        <ModalMsg
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          onClick={this.toggleModal}
          header={this.state.modalHeader}
          body={this.state.modalBody}
          footer={this.state.modalFooter}
          color={this.state.error ? 'danger' : 'success'}
        />
      </div>
    );
  }
}
