import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import IndexPage from './pages';

const App: React.FC = () => {
  return (
    <Router>
      <Route path="/" eact component={IndexPage} />
    </Router>
  );
}

export default App;
