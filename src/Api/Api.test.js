import {
  mockFetch,
  mockThrowError,
  stubFetch,
} from './mockUtils';
import {
  httpGet,
  getUserWithComments,
} from './Api';
import user from './user.json';
import comments from './comments.json';

let globalFetch;
beforeEach(() => {
  globalFetch = fetch;
})

afterEach(() => {
  fetch = globalFetch; // clean up
})

test('httpGet fetches data', async () => {
  const expectedData = {};
  fetch = mockFetch({data: expectedData});
  const {data, error} = await httpGet('whatever url');

  expect(error).toBeUndefined();
  expect(data).toEqual(expectedData);
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('httpGet returns error if status is not OK', async () => {
  fetch = mockFetch({ok: false});
  const {data, error} = await httpGet('whatever url');

  expect(data).toBeUndefined();
  expect(error).not.toBeNull();
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('httpGet returns error if fetch throws an exception', async () => {
  fetch = mockThrowError();
  const {data, error} = await httpGet('whatever url');

  expect(data).toBeUndefined();
  expect(error).not.toBeNull();
  expect(fetch).toHaveBeenCalledTimes(1);
});

test('user and comments are fetched and merged', async () => {
  const expectedData = {
    ...user,
    comments,
  };
  fetch = mockFetch({data: expectedData});
  const {data, error} = await getUserWithComments('whatever id');

  expect(error).toBeUndefined();
  expect(data).toMatchSnapshot(expectedData);
  expect(fetch).toHaveBeenCalledTimes(2);
});

test('returns only error if user is not fetched', async () => {
  fetch = mockThrowError();
  const {data, error} = await getUserWithComments('whatever id');

  expect(data).toBeUndefined();
  expect(error).not.toBeNull();
  expect(fetch).toHaveBeenCalledTimes(2);
})

test('returns user data even if comments is not fetched', async () => {
  fetch = jest.fn()
    .mockReturnValueOnce(stubFetch({data: user}))
    .mockReturnValueOnce(stubFetch({ok: false}));

  const {data, error} = await getUserWithComments('whatever id');

  expect(data).toEqual(user);
  expect(error).not.toBeNull();
  expect(fetch).toHaveBeenCalledTimes(2);
})
