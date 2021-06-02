import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import {
  queryGet,
  queryPost,
  apiInstance,
  baseURL,
  errorHandler,
  REFRESH_URL
} from '../../src/api/config';

const mock = new MockAdapter(apiInstance);
const ACCESS_TOKEN = 'someaccesstoken';
const REFRESH_TOKEN = 'somerefrestoken';
const MOCKED_URL = 'http://someurl.com/';

mock.onPost(REFRESH_URL).reply(200, {
  data: {
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN
  }
});

mock.onGet('/api/token/').reply(200, {
  data: {
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN
  }
});

mock.onPost('/api/token/').reply(200, {
  data: {
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN
  }
});

mock.onPost(REFRESH_URL).reply(201, {
  data: {
    access_token: 'new_access',
    refresh_token: 'new_refresh'
  }
});

mock.onGet('/error/').replyOnce(201, {
  data: {
    access_token: 'new_access',
    refresh_token: 'new_refresh'
  }
});

describe('request interceptor', () => {
  it('should include correct access token', async () => {
    const result = await queryGet('/api/token/');
    expect(result.data.data.access_token).toBe(ACCESS_TOKEN);
  });

  it('should include correct refresh token', async () => {
    const result = await queryGet('/api/token/');
    expect(result.data.data.refresh_token).toBe(REFRESH_TOKEN);
  });

  it('should must include response interceptor', async () => {
    expect(mock.axiosInstance.interceptors.response.handlers.length).toBe(1);
  });

  it('should must correct create new instance with params', async () => {
    const customInstance = await axios.create({
      baseURL: MOCKED_URL,
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
    });
    const mockedCustom = new MockAdapter(customInstance);

    expect(mockedCustom.axiosInstance.defaults.headers.Authorization).toBe(
      `Bearer ${ACCESS_TOKEN}`
    );
    expect(mockedCustom.axiosInstance.defaults.baseURL).toBe(MOCKED_URL);
  });

  it('should must correct return default url from config file', async () => {
    expect(mock.axiosInstance.defaults.baseURL).toBe(baseURL);
  });

  it('should must correct work post query method', async () => {
    const result = await queryPost('/api/token/');
    expect(result.data.data.refresh_token).toBe(REFRESH_TOKEN);
  });

  it('If error state is 401, last url param in error response should must be REFRESH_URL from config file', async () => {
    const ERROR_RESPONSE = {
      response: {
        status: 401
      },
      config: {
        _retry: false,
        url: '/error/some'
      }
    };

    try {
      await errorHandler(ERROR_RESPONSE);
    } catch (e) {
      expect(e.config.url).toBe(REFRESH_URL);
    }
  });

  it('If error state is 401, last url param in error response should must be REFRESH_URL from config file', async () => {
    const ERROR_RESPONSE = {
      response: {
        status: 401
      },
      config: {
        _retry: false,
        url: '/error/some'
      }
    };

    try {
      await errorHandler(ERROR_RESPONSE);
    } catch (e) {
      expect(e.config.url).toBe(REFRESH_URL);
    }
  });

  it('If error state is 401 and retry type is true, that response as last error', async () => {
    const ERROR_RESPONSE = {
      response: {
        status: 401
      },
      config: {
        _retry: false,
        url: '/error/some'
      }
    };

    try {
      await errorHandler(ERROR_RESPONSE);
    } catch (e) {
      console.log(e);
    }
  });
});
