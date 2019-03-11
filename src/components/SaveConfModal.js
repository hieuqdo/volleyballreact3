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
              <tr style={this.props.homeScore > 1 ? { fontWeight: "bold" } : {}}>
                <td>{this.props.homeTeam.name}</td>
                <td>{this.props.homeScore}</td>
              </tr>
              <tr style={this.props.awayScore > 1 ? { fontWeight: "bold" } : {}}>
                <td>{this.props.awayTeam.name}</td>
                <td>{this.props.awayScore}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          {this.props.date} @ {this.props.location.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button color="info" onClick={this.props.onClick}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
