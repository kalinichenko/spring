export const httpGet = async url => {
  try {
    const result = await fetch(url);
    return !result.ok ? {
      error: result.status,
    } : {
      data: await result.json()
    }
  } catch({message}) {
    return {
      error: message
    }
  }
}

const loadUser = id => httpGet(`http://jsonplaceholder.typicode.com/users/${id}`);
const loadComments = userId => httpGet(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);


export const getUserWithComments = async userId => {
  const [user, comments] = await Promise.all([loadUser(userId), loadComments(userId)]);

  // from UX prospective, I'd not merge them, as the loading status of comments would be lost, so there's no
  // way to recognise difference between 'no comments' state and 'loading error'
  const data = user.data && {
    ...user.data,
    comments: comments.data,
  };

  // return user data even if comments are not available
  return {
    ...user,
    data,
  }
}
