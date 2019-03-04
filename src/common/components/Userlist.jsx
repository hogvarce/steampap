import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '@/common/actions';

export class Userlist extends PureComponent {
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { users } = this.props;
        return(
            <div>
                <span>List of users:</span>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const loadData = (store) => store.dispatch(fetchUsers());


function mapStateToProps(state) {
    return { users: state.users};
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(Userlist),
};
