import React, { Component } from 'react'
import Navbar from './navbar';
import { Header } from 'semantic-ui-react';

class Main extends Component{
    render() {
        return (
            <div>
                <Navbar />
                <Header as='h2' textAlign='center'>
                    ItFinder - найди себя в мире IT!
                    <p>Мы проект</p>
                </Header>
            </div>
        )
    }
}

export default Main;