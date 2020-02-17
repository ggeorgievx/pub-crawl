import React from 'react';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Create from './containers/Create/Create';
import PubCrawls from './components/PubCrawls/PubCrawls';
import PubCrawl from './components/PubCrawl/PubCrawl';
import Credits from './components/Credits/Credits';
import NotFound from './components/NotFound/NotFound';
import AuthProvider from './containers/AuthProvider/AuthProvider';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/pub-crawls" component={PubCrawls} />
          <Route exact path="/pub-crawl/:id" component={PubCrawl} />
          <Route exact path="/credits" component={Credits} />
          <Route exact path='*' component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
