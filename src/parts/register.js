import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import Navbar from './navbar'
import Axios from 'axios';
import { css } from 'aphrodite'
import styles from '../styles/styles'

class Register extends Component{
    componentDidMount(){
        if(localStorage.getItem('session') == "true")
        {
            window.location.replace('#/mycab')
        }
    }
    state = {}
    doAjaxSend = () => {
        const payload = new FormData()
        payload.set('login', this.state.login)
        payload.set('password', this.state.pass)
        Axios({
            method: 'post',
            url: '/back/regs.php',
            data: payload,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(function(response){
           if(response.data == 'OK')
           {
               alert("Ты зарегестрирован!")
               window.location.replace('#/login')
           }
           else if(response.data == 'fail')
           {
               alert("Проверьте ввод")
           }
           else
           {
               alert("Пользователь уже существует")
           }
        }).catch(function(error){
            console.log(error)
        })
    }
    handleChange = (e, { name, value }) => {
        this.setState({[name]: value})
        console.log(this.state.login)
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className={css(styles.login)}>
                    <Form>
                        <Form.Group widths='1'>
                            <Form.Input name='login' placeholder='Login' onChange={this.handleChange}/>
                            <Form.Input name='pass' placeholder='Password' onChange={this.handleChange}/>
                            <Button name='reg' onClick={this.doAjaxSend}>Register</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Register;