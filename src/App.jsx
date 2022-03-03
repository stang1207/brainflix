import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageHeader from './components/PageHeader/PageHeader';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import './App.scss';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Brainflix</title>
        <meta
          name="description"
          content="Brainflix, a fake video sharing platform"
        />
      </Helmet>
      <PageHeader />
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />} />
        <Route
          path="/videos/:videoId"
          render={(props) => <Home {...props} />}
        />
        <Route path="/upload" component={Upload} />
      </Switch>
    </>
  );
};

export default App;
