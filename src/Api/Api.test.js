import {
  mockFetch,
  mockThrowError,
} from './mockUtils';
import {httpGet} from './Api';

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