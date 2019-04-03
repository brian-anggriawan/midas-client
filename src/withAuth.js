import React ,  { Component } from 'react';
import app from 'app';

export default function withAuth(View) {
    
    return class Auth extends Component{
        constructor(){
            super()
            this.state ={
                login: false
            }
        }

        componentWillMount() {
            if (!app.loggedin()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    this.setState({
                        login: true
                    })
                }
                catch(err){
                    app.logout()
                    this.setState({
                        login: false
                    })
                    this.props.history.replace('/login')
                }
            }
        }
       
        render(){
            if (this.state.login) {
                return <View />
            }else{
                return null
            }

            
        }
    }
}


