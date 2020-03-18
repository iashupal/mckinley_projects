import React, { Component } from 'react';
import { Card, Input, Icon, Button, message } from "antd";
import { ADMIN_FORGOT_PASSWORD } from '../utils/endpoints';
import axios from 'axios';

class ResetPassword extends Component {
    state = {
        email: ''
    };

    handleInputChange = (value, state) => {
        this.setState({
            [state]: value
        });
    }

    handleSubmit = () => {
        if (this.state.email !== '') {
            axios.post(ADMIN_FORGOT_PASSWORD, {
                email: this.state.email
            })
                .then(res => {
                    console.log(res);
                    message.success('Mail sent! Please check your mail box');
                    setTimeout(() => {
                        window.location.href = '../'
                    }, 500);
                })
                .catch(err => {
                    message.error("User doesn't exist or Invalid email!");
                })
        }
    }

    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'lightgrey' }}>
                <Card title='Reset Password'>
                    <div>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                            style={{ width: '400px' }}
                            onChange={(e) => this.handleInputChange(e.target.value, 'email')}
                            value={this.state.email}
                        />
                    </div>
                    <div>
                        <Button type='primary' style={{ marginTop: '1.8rem', padding: '0 2.8rem' }} onClick={this.handleSubmit}>Reset</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ResetPassword;