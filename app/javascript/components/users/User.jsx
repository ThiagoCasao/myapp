import React, { useEffect, useState } from 'react';
import { message, Modal, Form, Input, Alert } from 'antd';
import FormAlertError from '../framework/FormAlertError'
import FormAlertValidation from '../framework/FormAlertValidation'

const User = ({ visible, record, onCreate, hideModal }) => {
  const [form] = Form.useForm();
  const [errorText, setErrorText] = useState(undefined)
  const [validations, setValidations] = useState(undefined)  

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        f_name: record.f_name, 
        l_name: record.l_name
      });
    }
  }, [visible]);
  
  function parseJSON(response) {
    return new Promise((resolve) => response.json()
      .then((json) => resolve({
        status: response.status,
        ok: response.ok,
        json,
      })));
  }

  function bindValidations(serverValidations) {
    const validations = []
   
    {serverValidations.map(field => {
      for (const property in field) 
        validations.push({name: property, errors: field[property]})      
    })}

    form.setFields(validations)
  }

  return (
    <Modal
      forceRender
      visible={visible}
      title={record.id ? "Atualizar usuário" : "Novo usuário"}
      okText={record.id ? "Atualizar" : "Criar"}
      cancelText="Cancelar"
      destroyOnClose={true}
      onCancel={() => {
        setErrorText(undefined);
        setValidations(undefined);        
        hideModal();
      }}
      onOk={() => {
        setErrorText(undefined);
        form
          .validateFields()
          .then(values => {
            fetch(`http://localhost:3000/users/${record.id}/save`, {
              method: "POST",
              body: JSON.stringify({user: values}),
              headers: { "Content-Type": "application/json" }
            })
            .then(parseJSON)
            .then((response) => {
              if (!response.ok)
                bindValidations([response.json.error])

              return response.json
            })
            .then(response => {
              if (!response.error) {
                setErrorText(undefined);
                setValidations(undefined);
                onCreate(response.user);
                hideModal();
              }
            }).catch(error => {
              setErrorText("Falha na comunicação com nuvem. O registro não foi salvo. Erro: " + error.message);
            });
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="user"
        initialValues={{
          modifier: 'public',         
        }}
      >
        <Form.Item
          name="f_name"
          label="Nome"          
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="l_name"
          label="Sobrenome"          
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <FormAlertValidation validations={validations} />        
        <FormAlertError description={errorText} />
      </Form>
    </Modal>
  );
};

export default User;