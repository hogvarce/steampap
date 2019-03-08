import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchCurrentGame } from '@/common/actions';

export class Game extends PureComponent {
    componentDidMount() {
        this.props.fetchCurrentGame(this.props.appid);
    }

    render() {
        const { game } = this.props;
        console.log(game);
        return (
            <div>
                <Helmet>
                    <title>Game page</title>
                    <meta property="og:title" content="Game page" />
                </Helmet>
            </div>
        );
    }
}

const loadData = (store) => store.dispatch(fetchCurrentGame());


const mapStateToProps = ({ game }, ownProps) => {
    const { appid } = ownProps.match.params;
    return ({ game, appid });
};

export default {
    loadData,
    component: connect(mapStateToProps, { fetchCurrentGame })(Game),
};
