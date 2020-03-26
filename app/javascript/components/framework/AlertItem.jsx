import React from 'react';
import { List } from 'antd';

const AlertItem = ({validations}) => {

  return (
    <List
      size="small"
      dataSource={validations}
      renderItem={item => <List.Item>{item}</List.Item>}
    />


  );

}

export default AlertItem;
