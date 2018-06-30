import React from 'react';
import { compose, branch, renderComponent } from 'recompose';

const Comment = ({title}) => <li>{title}</li>;
const InvalidComments = ({error}) => <span>{error}</span>;
const LoadingComments = () => <span>Loading...</span>;
const NoComments = () => <span>No comments yet</span>;
const Comments = ({data}) => <ul>{data.comments.map((comment) => <Comment title={comment.title} />)}</ul>;

const invalidComments = branch(
  ({ error }) => error,
  renderComponent(InvalidComments),
);

const noComments = branch(
  ({ data }) => !data.comments,
  renderComponent(NoComments),
);

const loadingComments = branch(
  ({ error, data }) => !error && !data,
  renderComponent(LoadingComments),
);

export default compose(
  loadingComments,
  invalidComments,
  noComments,
)(Comments);

