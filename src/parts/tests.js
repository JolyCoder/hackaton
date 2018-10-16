import React, { Component } from 'react'
import { Button, Input } from 'semantic-ui-react';
import Navbar from './navbar';
import { css } from 'aphrodite'
import styles from '../styles/styles'
import Axios from 'axios'

class Tests extends Component{
    state = {}

    handleChange = (e, { value }) => {
        this.setState({['input']: value})
    }
    handleClick = () => {
        const payload = new FormData();
        payload.set('login', localStorage.getItem('user'))
        payload.set('test', this.state.input)
        console.log(this)
        Axios({
            method: 'post',
            url: '/back/addTest.php',
            data: payload,
            config: { headers: {' Content-Type': 'multipart/form-data' }}
        }).then(function(response){
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
    }
    render() {
        if(localStorage.getItem('session') == "true")
        {
            return (
                <div>
                    <Navbar />
                    <Input name='post' onChange={this.handleChange}/>
                    <Button onClick={this.handleClick}>Добавить тест</Button>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    <Navbar />
                    <div className={css(styles.log)}>
                        <h1>Пожалуйста <a href='#/login'>авторизируйтесь</a>, или <a href='#/reg'>зарегестрируйтесь</a></h1>
                    </div>
                </div>
            )
        }
    }
}

export default Tests;