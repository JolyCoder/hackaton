import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom"

class Navbar extends Component {
    state = {}
    exit = (e, { name }) => {
        if(localStorage.getItem('session') == "true")
        {
            localStorage.setItem('session', false)
            localStorage.setItem('user', "")
            console.log("exit")
        }
        console.log('1y')
    }
    render(){
        return (
            <div>
                <Menu>
                    <Link to='/'>
                        <Menu.Item
                            name='main'
                            content='Главная'
                        />
                    </Link>
                    <Link to='/reg'>
                        <Menu.Item
                            name='reg'
                            content='Регистрация'
                            disabled={localStorage.getItem('session') == "true" ? true : false}
                        />
                    </Link>
                    <Link to={localStorage.getItem('session') == "true" ? '/mycab' : '/login'}>
                        <Menu.Item 
                            name='login'
                            content={localStorage.getItem('session') == 'true' ? 'Выход' : 'Логин'}
                            onClick={this.exit}
                        />
                    </Link>
                    <Link to='/mycab'>
                        <Menu.Item
                            name='cab'
                            content='Личный кабинет'
                        />
                    </Link>
                    <Link to='/testu'>
                        <Menu.Item
                            name='test'
                            content='Курсы'
                            disabled={localStorage.getItem('session') == "true" ? false : true}
                        />
                    </Link>
                    <Link to='/fl'>
                        <Menu.Item
                            name='fl'
                            content='Работа'
                            disabled={localStorage.getItem('session') == "true" ? false : true}
                        />
                    </Link>
                </Menu>
            </div>   
        )
    }
}

export default Navbar;