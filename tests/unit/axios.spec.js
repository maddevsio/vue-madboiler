import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  queryGet,
  apiInstance,
  baseURL
} from '../../src/api/config';

const mock = new MockAdapter(apiInstance);
const ACCESS_TOKEN = 'someaccesstoken';
const REFRESH_TOKEN = 'somerefrestoken';
const MOCKED_URL = 'http://someurl.com/';

mock.onGet('/api/token/')
  .reply(200, {
    data: {
      access_token: ACCESS_TOKEN,
      refresh_token: REFRESH_TOKEN
    }
  });

mock.onPost('/users/refresh_token')
  .reply(201, {
    data: {
      access_token: 'new_access',
      refresh_token: 'new_refresh'
    }
  });

mock.onGet('/error/')
  .replyOnce(201, {
    data: {
      access_token: 'new_access',
      refresh_token: 'new_refresh'
    }
  });

describe('request interceptor', () => {
  it('should include correct access token', async () => {
    const result = await queryGet('/api/token/');
    expect(result.data.data.access_token)
      .toBe(ACCESS_TOKEN);
  });

  it('should include correct refresh token', async () => {
    const result = await queryGet('/api/token/');
    expect(result.data.data.refresh_token)
      .toBe(REFRESH_TOKEN);
  });

  it('should must include response interceptor', async () => {
    expect(mock.axiosInstance.interceptors.response.handlers.length)
      .toBe(1);
  });

  it('should must correct create new instance with params', async () => {
    const customInstance = await axios.create({
      baseURL: MOCKED_URL,
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    const mockedCustom = new MockAdapter(customInstance);

    expect(mockedCustom.axiosInstance.defaults.headers.Authorization)
      .toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(mockedCustom.axiosInstance.defaults.baseURL)
      .toBe(MOCKED_URL);
  });

  it('should must correct return default url from config file', async () => {
    expect(mock.axiosInstance.defaults.baseURL)
      .toBe(baseURL);
  });

  it('redirects to login route when response status is 401', async () => {
    await queryGet('/error/');

    console.log(mock.history);
  });
});
