export const mockThrowError = () => jest.fn().mockImplementation(() => {throw new Error('any error message')});

export const mockFetch = ({data, ok}) => jest.fn().mockImplementation(() => stubFetch({data, ok}));
export const stubFetch = ({data, ok = true}) => Promise.resolve({ok: true, json: () => data})
