/* eslint-disable react/no-multi-comp */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './stores/create';
import { HashRouter, Match } from 'react-router';
import EuclidExplainer from './containers/EuclidExplainer.jsx';
import IconSprite from './components/IconSprite.jsx';

const MatchAndPassInRouter = ({ component: Component, router, pattern }) => (
  <Match pattern={pattern} render={props => <Component router={router} {...props} />} />
);

const Explainer = ({ router, location }) => (
  <EuclidExplainer
    router={router}
    urlText={(location.query && location.query.question) || ""}
    parser={"default"}
    readOnly={false}
    includeHeader={true} />
);

const App = () => (
  <HashRouter>{({ router }) => (
      <div>
        <MatchAndPassInRouter pattern="" router={router} component={Explainer} />
        <IconSprite />
      </div>
  )}</HashRouter>
);

render(<Provider store={createStore()}><App /></Provider>, document.querySelector('#root'));
