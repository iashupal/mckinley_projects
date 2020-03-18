import React, { Component } from 'react';
import CastRegistrationForm from "../components/CastRegistrationForm";
import '../css/common.css';

class AddCast extends Component {
    state = {
        page: '',
        entry: '',
        refresh: true
    }
    componentDidMount() {
        let page = window.location.href;
        console.log('page on cast', page.includes('edit'));
        if (page.includes('edit')) {
            let entry = JSON.parse(localStorage.getItem('castToEdit'));
            this.setState({ page: 'edit', entry });
        }
        else {
            this.setState({ page: 'add' });
        }
    }

    componentWillMount() {
        let page = window.location.href;
        console.log('page on cast', page.includes('edit'));
        if (page.includes('edit')) {
            let entry = JSON.parse(localStorage.getItem('castToEdit'));
            this.setState({ page: 'edit', entry });
        }
        else {
            this.setState({ page: 'add' });
        }
    }

    componentWillReceiveProps(props) {
        let page = window.location.href;
        console.log('page on cast', page.includes('edit'));
        if (page.includes('edit')) {
            let entry = JSON.parse(localStorage.getItem('castToEdit'));
            this.setState({ page: 'edit', entry });
        }
        else {
            this.setState({ page: 'add' });
        }
    }

    render() {
        return (
            (this.state.page === 'add') ? <CastRegistrationForm mode='new' className='d-flex-center'></CastRegistrationForm> : <CastRegistrationForm mode='edit' entry={this.state.entry} className='d-flex-center'></CastRegistrationForm>
        )
    }
}

export default AddCast;