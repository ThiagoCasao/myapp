import React from "react"
import { List, Typography } from 'antd';

const Users = props => (
  <div>
    <h1>All Users</h1>
    <List
      header={<div>All Users</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={props.users}
      renderItem={user => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {`${user.f_name} ${user.l_name}`}
        </List.Item>
      )}


    />


    {/* <ul>
      {props.users.map(user => (
        <li key={user.id}>{`${user.f_name} ${user.l_name}`}</li>
      ))}
    </ul> */}
  </div>
);

export default Users
