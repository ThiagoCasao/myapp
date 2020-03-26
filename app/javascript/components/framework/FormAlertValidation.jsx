import React from 'react';
import { Alert, List } from 'antd';
import AlertItem from './AlertItem';

const FormAlertValidation = ({validations}) => {
  if (!validations) {
    return null;
  }

  const alerts = () => {
    const options = []

    {validations.map(field => {
      for (const property in field) { 
        const options2 = []

        field[property].map((message, i) => 
          options2.push(message)
          // options.push(<Alert key={i} message={property + ": " + message} type="warning" showIcon />)
        )
        options.push(<Alert message={property} description={<AlertItem validations={options2}/>} type="warning" showIcon />)
      }
    })}
    return options;
  }

  return (
    <div>
      {alerts()}

      {/* <Alert
        message="Validações"
        description={"description"}
        type="warning"
        showIcon
      /> */}
    </div>
  );
}

export default FormAlertValidation;
