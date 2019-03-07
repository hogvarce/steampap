import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

class Home extends PureComponent {
    state = {
        steamids: '',
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push({
            search: this.state.steamids,
        });
    };

    handleChange = (e) => {
        this.setState({
            steamids: e.target.value,
        });
    };

    render() {
        const { games } = this.props;
        const { steamids } = this.state;
        return (
            <div className="container">
                <h3 className="center-align">Welcome</h3>
                <form onSubmit={this.onSubmit} className="col s12">
                    <div className="input-field col s6">
                      <input onChange={this.handleChange} value={steamids} id="first_name" type="text" className="validate" />
                          <label htmlFor="first_name">Enter steam ids</label>
                    </div>
                </form>
                <div>
                  <div>Games found: <span>{games.length}</span></div>
                  <ul className="collection">
                      {games.map((game) => (
                          <li key={game.appid} className="collection-item">
                              <Link to={`/game/${game.appid}`}>{game.name}</Link>
                          </li>
                      ))}
                  </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ games }) => ({ games });

export default connect(mapStateToProps)(Home);

