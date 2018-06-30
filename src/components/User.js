import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

const User = ({data}) => (<h1>{data.name}</h1>);
const InvalidUser = ({error}) => (<h1>{error}</h1>);
const LoadingUser = () => (<h1>Loading user data...</h1>);

const invalidUser = branch(
  ({ error }) => error,
  renderComponent(InvalidUser),
);

const loadingUser = branch(
  ({ error, data }) => !error && !data,
  renderComponent(LoadingUser),
);

export default compose(
  loadingUser,
  invalidUser,
)(User);

