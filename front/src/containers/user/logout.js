import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser} from '../../actions/user/userAction'

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }
    
    componentDidMount(){
        window.localStorage.removeItem('bijou-token');
        this.props.logoutUser();
    }
    render(){
	    return <Redirect to="/"/>
	}
}

const mapDispatchToProps = {
    logoutUser
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);