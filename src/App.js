import Header from './components/Header/Header';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';

import './App.scss';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/videos/:id" component={Home} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </>
  );
};

export default App;
