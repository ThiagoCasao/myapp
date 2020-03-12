import React from "react"
import { Button, Table } from 'antd';
import TemplateModal from './TemplateModal'

class TemplateIndex extends React.Component {
  state = {
    fields: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      newRecord: props.newRecord,
      list: props.list,
      listColumns: props.listColumns,
      modalVisible: false,
      modalRecord: props.new_user,
    };
  }

  showModal = (event, record) => {
    this.setState({
      modalVisible: true,
      modalRecord: record,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
      modalRecord: this.state.newRecord,
    });
  };

  onChange = updatedValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...updatedValue
      }
    });
  };

  render() {
    return (
      <div>
        <h1>{this.props.listName}</h1>

        <Button type="primary" onClick={(e) => this.showModal(e, this.state.newRecord)}>
          Novo {this.props.objectName}
        </Button>

        <TemplateModal visible={this.state.modalVisible} hideModal={this.hideModal} form={this.props.form}/>

        <Table columns={this.state.listColumns} dataSource={this.state.list} size="small" rowKey={row => row.id} />
      </div>
    );
  }
}

export default TemplateIndex