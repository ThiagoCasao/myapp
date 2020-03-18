import React from "react"
import { Modal } from 'antd';

class TemplateModal extends React.Component {
  handleOk = e => { this.props.hideModal(); };
  handleCancel = e => { this.props.hideModal(); };

  constructor(props) {
    super(props);
  }

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
  
export default TemplateModal
