import React from "react"
import UserForm from './UserForm'
import TemplateIndex from '../framework/TemplateIndex'

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: props.users,
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
    }
  ];

  render() {
    return (
      <TemplateIndex 
        list={this.state.list}
        listColumns={this.columns}
        newRecord={this.props.newUser}
        listName="Usuários"
        objectName="Usuário"
        form={<UserForm onChange={fields => this.onChange(fields)} record={this.props.newUser}/>}
      />
    );
  }
}

export default Index