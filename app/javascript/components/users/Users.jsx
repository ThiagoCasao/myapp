import React, { useState } from "react"
import { Button, Table } from 'antd';
import User from './User'

const Users = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalRecord, setModalRecord] = useState(props.newUser)
  const [users, setUsers]  = useState(props.users)

  const columns = [
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
          <Button type="primary" onClick={(e) => showModal(e, record)}>
            Editar
          </Button>
        </span>        
      ),
    },    
    {
      title: '',
      key: 'action',
      fixed: 'right',      
      render: (text, record) => (
        <span>
          <Button danger onClick={(e) => handleInactivate(e, record)}>
            {record.discarded_at ? "Ativar" : "Desativar" }
          </Button>
        </span>
      ),
    },
  ];

  const handleInactivate = (e, record) => {
    fetch(`http://localhost:3000/users/${record.id}/inactivate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(function(response) {
      var resp = response.clone()

      if (!resp.ok)
        throw Error(resp.statusText);
      else {
        return resp.json();
      }
    })
    .then(response => {
      record.discarded_at = response.user.discarded_at;
      setUsers(users.map(user => user.id === record.id ? {...users, ...record} : user ));
    }).catch(error => {
      console.log(error);
    });
  }

  const showModal = (event, record) => {
    setModalVisible(true)
    setModalRecord(record)
  };

  const hideModal = () => {
    setModalVisible(false)
    setModalRecord(props.newUser)
  };
  
  const onCreate = record => {
    var user = users.find(user => user.id == record.id);
    if (user) {
      setUsers(users.map(user => user.id === record.id ? {...users, ...record} : user ));
    } else {
      setUsers([...users, record])
    }
  };

  return(
    <div>
      <h1>{"Usuários"}</h1>

      <Button type="primary" onClick={(e) => showModal(e, props.newUser)}>
        Novo {"Usuário"}
      </Button>

      <User
        visible={modalVisible}
        record={modalRecord}
        hideModal={hideModal}
        onCreate={onCreate}
      />

      <Table 
        columns={columns} 
        dataSource={users} 
        size="small" 
        rowKey={row => row.id} 
      />

    </div>
  );
};

export default Users