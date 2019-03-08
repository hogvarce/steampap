import React, { PureComponent } from 'react';
import {connect} from "react-redux";

class Home extends PureComponent {
    state = {
        steamids: '',
    };

    componentWillMount() {
        this.setState({
            steamids: this.props.steamids ? this.props.steamids.join(',') : '',
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push({
            search: `ids=${this.state.steamids}`,
        });
        window.location.reload();
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
                              <a href={`https://store.steampowered.com/app/${game.appid}`} target="_blank">{game.name}</a>
                          </li>
                      ))}
                  </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ games, steamids }) => ({ games, steamids });

export default connect(mapStateToProps)(Home);

