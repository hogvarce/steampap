import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '@/common/actions';
import RequireAuth from '@/common/components/hocs/RequireAuth';

export class AdminsList extends PureComponent {
    componentDidMount() {
        this.props.fetchAdmins();
    }

    render() {
        const { admins } = this.props;
        return(
            <div>
                <span>Protected list of admins:</span>
                <ul>
                    {admins.map(admin => (
                        <li key={admin.id}>{admin.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const loadData = ({ dispatch }) => dispatch(fetchAdmins());


function mapStateToProps(state) {
    return { admins: state.admins};
}

export default {
    loadData,
    component: connect(mapStateToProps, { fetchAdmins })(RequireAuth(AdminsList)),
};
