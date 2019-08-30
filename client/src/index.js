// Dependencies
import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import App from './App';

// Styles
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

// Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:7000/graphiql' // Backend endpoint
});

// Wrapping the App with ApolloProvider
const AppContainer = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

// Root
const root = document.getElementById('root');

// Rendering the AppContainer
render(<AppContainer />, root);
