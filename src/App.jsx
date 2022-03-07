import { Switch, Route } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import './App.scss';

const App = () => {
  return (
    <>
      <PageHeader />
      <Switch>
        <Route path="/videos/:videoId" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="*" component={Home} />
      </Switch>
    </>
  );
};

export default App;
