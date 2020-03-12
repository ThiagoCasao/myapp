import React from "react"
import { Button, Modal, Table, Form, Input } from 'antd';

class Template extends React.Component {
  handleOk = e => { this.props.hideModal(); };
  handleCancel = e => { this.props.hideModal(); };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        centered={true}
        onOk={this.handleOk}
        okText="Gravar"
        onCancel={this.handleCancel}
        cancelText="Cancelar"
      >
      {this.props.form}
    </Modal>
    );    
  }
}
  
export default Template
