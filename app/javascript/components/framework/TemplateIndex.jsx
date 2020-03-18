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
      modalRecord: props.newRecord,
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

  columns = [    
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={(e) => this.showModal(e, record)}>
            Editar
          </Button>

          <Button danger>
            Desativar
          </Button>          
        </span>
      ),
    },
  ]

  render() {
    return (
      <div>
        <h1>{this.props.listName}</h1>

        <Button type="primary" onClick={(e) => this.showModal(e, this.state.newRecord)}>
          Novo {this.props.objectName}
        </Button>
        
        <TemplateModal 
          visible={this.state.modalVisible} 
          hideModal={this.hideModal} 
          form={this.props.form} 
          record={this.state.modalRecord}
        />

        <Table 
          columns={[...this.state.listColumns, ...this.columns]} 
          dataSource={this.state.list} 
          size="small" 
          rowKey={row => row.id} 
        />
      </div>
    );
  }
}

export default TemplateIndex