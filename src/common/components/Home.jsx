import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

const Home = ({ games }) => (
  <div className="container">
      <h3 className="center-align">Welcome</h3>
      <div>
          <ul>
              {games.map((game) => (
                  <li key={game.appid}>
                      <Link to={`/game/${game.appid}`}>{game.name}</Link>
                  </li>
              ))}
          </ul>
      </div>
  </div>
);

const mapStateToProps = ({ games }) => ({ games });

export default connect(mapStateToProps)(Home);

