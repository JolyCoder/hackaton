import React, { Component } from 'react'
import Axios from 'axios'
import { Item, Button, Modal, Form, Radio } from 'semantic-ui-react';
import Navbar from './navbar'
import { css } from 'aphrodite'
import styles from '../styles/styles'

class TestU extends Component{
    state = {}
    openHandle = (event, data) => {
        console.log(data.name)
        var payload = new FormData();
        var self = this;
        payload.set('name', data.name)
        Axios({
            method: "post",
            url: "http://localhost:8888/back/getTextTest.php",
            data: payload,
            config: { headers: {' Content-Type': 'multipart/form-data' }}
        }).then(function(response){
            console.log(response)
            self.setState({['data']: response.data.text})
        }).catch(function(error){
            console.log(error)
        })
    }
    openTestHandle = (event, data) => {
        console.log(data.name)
        var payload = new FormData();
        var self = this;
        payload.set('name', data.name)
        Axios({
            method: "post",
            url: "http://localhost:8888/back/grtTestB.php",
            data: payload,
            config: { headers: {' Content-Type': 'multipart/form-data' }}
        }).then(function(response){
            self.setState({['test']: JSON.parse(response.data.json)})
            self.setState({['ans']: JSON.parse(response.data.json).ans})
            self.setState({['ts']: Array(self.state.test.qs.length)})
        }).catch(function(error){
            console.log(error)
        })
    }
    

    componentDidMount(){
        if(localStorage.getItem("session") == "true")
        {
            var payload = new FormData();
            var self = this;
            payload.set('get', 'list');
            Axios({
                method: 'post',
                url: "http://localhost:8888/back/getTestList.php",
                data: payload,
                config: { headers: {' Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                self.setState({['arr']: response.data})
                console.log('arr', response)
            }).catch(function(error){
                console.log(error)
            })
            var pl = new FormData()
            pl.set('login', localStorage.getItem('user'))
            Axios({
                method: 'post',
                url: "http://localhost:8888/back/getTests.php",
                data: pl,
                config: { headers: {' Content-Type': 'multipart/form-data' }}
            }).then(function(response){
                self.setState({['ar']: response.data})
                console.log(response)
            }).catch(function(error){
                console.log(error)
            })
        }  
    }

    handleChange = (event, data) => {
        this.setState({[data.name]: data.value})
        console.log(data)
        if(this.state.ans[data.className] == data.value)
        {
            this.state.ts[data.className] = true;
            console.log(this.state.ts)
        }
        else
        {
            this.state.ts[data.className] = false;
        }
    }
    okHandle = (event, data) => {
        var k = 0;
        for(var i = 0; i < this.state.ts.length; i++)
        {
            if(this.state.ts[i] == true)
            {
                k++;
            }
        }
        console.log(k);
        alert("У вас " + k + " правильных ответов!")
        var payload = new FormData();
        var rate = (this.state.arr[data.index].rating / this.state.test.ans.length) * k;
        console.log(rate) 
        payload.set('login', localStorage.getItem('user'))
        payload.set('test', this.state.test.testname)
        payload.set('rating', rate)
        console.log(data)
        Axios({
            method: 'post',
            url: 'http://localhost:8888/back/addTest.php',
            data: payload,
            config: { headers: {' Content-Type': 'multipart/form-data' }}
        }).then(function(response){
            window.location.replace('#/mycab')
        }).catch(function(error){
            alert(error)
        })
    }
    render() {
        if(localStorage.getItem('session') == "true")
        {
            if(this.state.arr != null)
            {
                return (
                    <div>
                        <Navbar />
                        <Item.Group>
                            {this.state.arr.map((item, index) => (
                                <Item key={index} className={css(styles.item)}>
                                <Item.Image size='tiny' src={item.img} />
                                        <Item.Content>
                                            <Item.Header as='a'>{item.name}</Item.Header>
                                            <Item.Meta>Description</Item.Meta>
                                            <Item.Description>{item.text}</Item.Description>
                                            <Modal name={item.name} trigger={<Button className={css(styles.button)}>Читать теорию</Button>} onOpen={this.openHandle}>
                                                <Modal.Header>{item.name}</Modal.Header>
                                                <p className={css(styles.text)}>{this.state.data}</p>
                                            </Modal>
                                            <Modal name={item.name} trigger={<Button className={css(styles.button)}>Пройти тест</Button>} onOpen={this.openTestHandle}>
                                            {console.log(this.state.test)}
                                            {this.state.test != undefined ? <Modal.Header>{this.state.test.testname}</Modal.Header> : null}
                                            {this.state.test != undefined ? this.state.test.qs.map((itemt, indext) => (
                                                <div key={indext} className={css(styles.test)}>
                                                   <Form.Field>
                                                       Вопрос:<b>{itemt.qtext}</b>
                                                   </Form.Field>
                                                   {itemt.q.map((items, indexs) => (
                                                       <Radio 
                                                        label={items}
                                                        name={itemt.qtext}
                                                        key={itemt.qtext + indexs}
                                                        checked={this.state[(itemt.qtext)] == items}
                                                        onChange={this.handleChange}
                                                        value={items}
                                                        className={indext}
                                                       />
                                                   ))}
                                                </div>
                                                )) : null}
                                                {this.state['ar'] != undefined ? console.log('a', this.state.ar) : null}
                                                {this.state['ar'] != undefined && this.state.test != undefined ? <Button disabled={this.state['ar'].includes(this.state.test.testname)} onClick={this.okHandle} className={css(styles.test)} index={index}>Завершить тест</Button> : null}
                                            </Modal>
                                        </Item.Content>
                                </Item>
                            ))}
                            
                        </Item.Group>
                    </div>
                )
            }
            else
            {
                return (
                    <div>
                        <Navbar />
                        <h1>Error!</h1>
                    </div>
                )
            }
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

export default TestU;