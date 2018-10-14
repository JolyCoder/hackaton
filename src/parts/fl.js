import React, { Component } from 'react'
import Navbar from './navbar'
import { css } from 'aphrodite'
import styles from '../styles/styles' 
import Axios from 'axios';
import { Item, Button, Modal, Card } from 'semantic-ui-react';

var flag = false;

class Fl extends Component {
    state = {}
    constructor(props){
        super(props);
        flag = false;
    }
    componentDidMount(){
        this.setState({['comp']: []})
        if(localStorage.getItem('session') == "true")
        {
            var self = this;
            var pl1 = new FormData();
            pl1.set('login', localStorage.getItem('user'))
            Axios({
                method: 'post',
                url: 'http://localhost:8888/back/getUser.php',
                data: pl1,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                self.setState({['rating']: response.data.rating})
                console.log(response)
            }).catch(function(error){
                console.log(error);
            })
            var pl = new FormData();
            pl.set('get', 'post');
            Axios({
                method: 'post',
                url: 'http://localhost:8888/back/getFl.php',
                data: pl,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                console.log(response)
                self.setState({['cmp']: response.data})
                for(var i = 0; i < response.data.length; i++)
                {
                    var pl = new FormData();
                    pl.set('comp', response.data[i].company)
                    Axios({
                        method: 'post',
                        url: 'http://localhost:8888/back/getCompInf.php',
                        data: pl,
                        config: { headers: {' Content-Type': 'multipart/form-data' }}
                    }).then(function(responseS){
                        self.setState({[responseS.data.name]: responseS.data})
                        flag = true;
                        console.log(responseS)
                    }).catch(function(error){
                        console.log(error)
                    })
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    }
    handleClick = (event, data) => {
        alert('Вы отправили заявку!')
    }
    handleOpen = (event, data) => {
        if(localStorage.getItem('session') == "true"){
            var self = this;
            var pl = new FormData()
            pl.set('name', data.item.name)
            console.log('o', data)
            Axios({
                method: 'post',
                url: 'http://localhost:8888/back/getFlText.php',
                data: pl,
                config: { headers: {' Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                self.setState({['text']: response.data})
                console.log(response)
            }).catch(function(error){
                console.log(error)
            })
        }
    }
    render() {
        if(localStorage.getItem('session') == "true")
        {
            return (
                <div>
                    <Navbar />
                    <Item.Group>
                        {this.state.cmp != undefined && flag ? this.state.cmp.map((item, index) => (
                                <Item className={css(styles.item)} key={index}>
                                    <Item.Image size='tiny' src={this.state[item.company].img} />
                                    <Item.Content>
                                        <Item.Header as='a'>{item.name}</Item.Header>
                                        <Item.Meta>{item.company}</Item.Meta>
                                        <Item.Description>
                                            <pre>
                                                Зарплата: {item.zarp} рублей Требуемый рейтинг: {this.state.rating != undefined ? <font color={this.state.rating < parseInt(item.rating) ? 'red' : 'green'}>{item.rating}</font> : null}
                                            </pre>
                                        </Item.Description>
                                        <Modal item={item} trigger={<Button disabled={this.state.rating < parseInt(item.rating)}>Подробнее</Button>} onOpen={this.handleOpen}>
                                            <Card className={css(styles.cardM)}
                                                image={this.state[item.company].img}
                                                header={item.company}
                                                meta='Заказчик'
                                                description={this.state[item.company].descr}
                                             />
                                             <div className={css(styles.modal)}>
                                                 <h2>{item.name}</h2>
                                                 <h3>Зарплата: {item.zarp} рублей</h3>
                                                 <h3>Необходимый рейтинг: <font color={this.state.rating < parseInt(item.rating) ? 'red' : 'green'}>{item.rating}</font></h3>
                                                 <h3>Описание: </h3> <h4>{this.state.text != undefined ? this.state.text.text : null}</h4>
                                                 <Button className={css(styles.button)} onClick={this.handleClick}>Отправить заявку!</Button>
                                             </div>
                                        </Modal>
                                    </Item.Content>
                                </Item>
                        )) : null}
                    </Item.Group>
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

export default Fl;