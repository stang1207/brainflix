import { Switch, Route } from 'react-router-dom';

import PageHeader from './components/PageHeader/PageHeader';
import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Error from './pages/Error/Error';
import './App.scss';

const App = () => {
  return (
    <>
      <PageHeader />
      <Switch>
        <Route path="/videos/:videoId" component={Home} />
        <Route path="/" exact component={Home} />
        <Route path="/upload" component={Upload} />
        <Route path="*">
          <Error error={{ statusCode: 404, errorMessage: 'Page not found!' }} />
        </Route>
      </Switch>
    </>
  );
};

export default App;
