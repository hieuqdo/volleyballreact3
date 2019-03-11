import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table
} from "reactstrap";

export default class SaveConfModal extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Confirm Score Update</ModalHeader>
        <ModalBody>
          <Table borderless align="center" style={{ width: "60%" }}>
            <tbody>
              <tr style={this.props.home_score > 1 ? { fontWeight: "bold" } : {}}>
                <td>{this.props.home_team}</td>
                <td>{this.props.home_score}</td>
              </tr>
              <tr style={this.props.away_score > 1 ? { fontWeight: "bold" } : {}}>
                <td>{this.props.away_team}</td>
                <td>{this.props.away_score}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          {this.props.date} @ {this.props.location}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color="info" onClick={this.props.onClick}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
