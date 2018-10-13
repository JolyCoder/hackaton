import React, { Component } from 'react'
import Navbar from './navbar'
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import styles from '../styles/styles'
import Axios from 'axios'
import { Card, Menu } from 'semantic-ui-react';



class MyCab extends Component{
    state = {['arrUser']: []}
    
    componentDidMount(){    
        if(localStorage.getItem('session') == "true")
        {
            var self = this; 
            const payload = new FormData();
            payload.set('login', localStorage.getItem('user'))
            console.log(payload)
            Axios({
                method: "post",
                url: "http://localhost:8888/back/getUser.php",
                data: payload,
                config: { headers: {' Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                console.log(response)
                const jsO = response.data
                self.setState({['rating']: jsO.rating})
                self.setState({['col']: jsO.col})
            }).catch(function(error){
                console.log(error)
            })
            Axios({
                method: 'post',
                url: 'http://localhost:8888/back/getTests.php',
                data: payload,
                config: { headers: {' Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                console.log(response)
                self.setState({['arrUser']: response.data})
            }).catch(function(error){
                console.log(error)
            })
        }
    }
    render(){
        const extra = (
            <a>
                <pre>Рейтинг: {this.state.rating}   Кол-во курсов: {this.state.col}</pre>
            </a>
        )
        if(localStorage.getItem('session') == "true")
        {
            console.log(this.state.arrUser)
            return (
                <div>
                    <Navbar />
                    <div className={css(styles.card)}>
                        <Card 
                            image='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                            header={localStorage.getItem('user')}
                            meta='Пользователь'
                            description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                            extra={extra}
                        />
                    </div>
                    <div className={css(styles.map)}>
                        <h2>Пройденные курсы</h2>
                        <ul>
                            {console.log('arr', this.state.arrUser)}
                            {this.state.arrUser.map((item, index) =>(
                                <li key={index}><h3>{item}</h3></li>
                            ))}
                        </ul>
                    </div>
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

export default connect(
    state => ({
        session: state.session
    })
)(MyCab);