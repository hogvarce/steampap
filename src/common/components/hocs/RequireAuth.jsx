import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
    class RequireAuth extends PureComponent {
        render() {
            const { auth } = this.props;
            switch (auth) {
                case null:
                    return <div>Loading...</div>;
                case false:
                    return <Redirect to="/"/>;
                default:
                    return <ChildComponent {...this.props} />;
            }
        }
    }

    const mapStateToProps = ({ auth }) => ({
        auth,
    });

    return connect(mapStateToProps)(RequireAuth);
};
