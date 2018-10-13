import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react';
import Navbar from './navbar'
import Axios from 'axios';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { css } from 'aphrodite'
import styles from '../styles/styles'

class Login extends Component{
    state = {}
    doAjaxSend = () => {
        const payload = new FormData()
        payload.set('login', this.state.login)
        payload.set('password', this.state.pass)
        var self = this
        Axios({
            method: 'post',
            url: 'http://localhost:8888/back/auth.php',
            data: payload,
            config: { headers: {' Content-Type': 'multipart/form-data' }}
        }).then(function(response){
           if(response.data === "OK")
           {
               alert("Logged")
               localStorage.setItem('session', true)
               localStorage.setItem('user', self.state.login)
               window.location.replace('#/mycab')
           }
           else if(response.data === "fail")
           {
               alert("Неправильный логин или пароль")
           }
           else if(response.data === "fail_usr")
           {
               alert("Такого пользователя не существует")
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
                            <Form.Input className={css(styles.Input)} name='login' placeholder='Login' onChange={this.handleChange}/>
                            <Form.Input name='pass' placeholder='Password' onChange={this.handleChange}/>
                            <Button name='log' onClick={this.doAjaxSend}>Login</Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>({
        session: state.session
    }),
    dispatch => ({
        onLogged: (obj) => {
            dispatch({type: "LOGGED", payload: obj})
        }
    })
)(Login);