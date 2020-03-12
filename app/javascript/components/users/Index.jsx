import React from "react"
import { Button } from 'antd';
import UserForm from './UserForm'
import TemplateIndex from '../framework/TemplateIndex'

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props.users,
      newRecord: props.new_user,
      modalRecord: props.new_user,
    };
  }

  columns = [
    // {
    //   title: 'ID',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
      title: 'Name',
      dataIndex: 'f_name',
      key: 'f_name',
    },
    {
      title: 'Surname',
      dataIndex: 'l_name',
      key: 'l_name',
    },
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
  ];

  render() {
    return (
      <TemplateIndex 
        list={this.state.list}
        listColumns={this.columns} 
        listName="Usuários"
        objectName="Usuário"
        form={<UserForm record={this.state.modalRecord} onChange={fields => this.onChange(fields)}/>}
      />
    );
  }
}

export default Index