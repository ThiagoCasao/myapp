import React from "react"
import { Form, Input } from 'antd';


class UserForm extends React.Component {
  state = {
    id: undefined,
    f_name: "",
    l_name: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      record: props.record,
    };
  }  

  change = e => {
    this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // this.props.onSubmit(this.state);
    this.setState({
      f_name: "",
      l_name: "",
    });
    this.props.onChange({
      f_name: "",
      l_name: "",
    });
  };  

  render() {
    return (
      <Form
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="f_name"
          label="Nome"
          placeholder="First name"
          rules={[{ required: true, message: 'Please input the f_name of collection!' }]}
        >          
          <Input value={this.state.f_name} onChange={e => this.change(e)}/>
        </Form.Item>
        
        <Form.Item
          name="l_name"
          label="Sobrenome"
          rules={[{ required: true, message: 'Please input the l_name of collection!' }]}
        >
          <Input value={this.state.l_name} onChange={e => this.change(e)}/>
        </Form.Item>
      </Form>
    );    
  }

}
  
export default UserForm
