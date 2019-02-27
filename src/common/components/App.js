/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import { Link } from 'react-router-dom'
import * as styles from './App.style';

const App = () => (
  <div>
    <div css={styles.title}>this is component App.</div>
      <Link to="/users">Users</Link>
    <button onClick={() => console.log('pressed!')}>Press me</button>
  </div>
);

export default App;
