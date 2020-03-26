import React from 'react';
import { Alert } from 'antd';

const FormAlertError = ({description}) => {
  if (!description) {
    return null;
  }

  return (
    <div>
      <Alert
        message="Erro"
        description={description}
        type="error"
        showIcon
      />
    </div>
  );
}

export default FormAlertError;
