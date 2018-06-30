export const mockThrowError = () => jest.fn().mockImplementation(() => {throw new Error('any error message')});

export const mockFetch = ({data, ok = true}) =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  )

