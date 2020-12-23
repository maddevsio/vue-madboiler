const ACCESS = 'access_token';
const REFRESH = 'refresh_token';

const LocalStorageService = (() => {
  let _service;

  function _installService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(tokenObj) {
    localStorage.setItem(ACCESS, tokenObj.access_token);
    localStorage.setItem(REFRESH, tokenObj.refresh_token);
  }

  function _setAccessToken(token) {
    window.localStorage.setItem(ACCESS, token);
  }

  function _getAccessToken() {
    return localStorage.getItem(ACCESS);
  }

  function _getRefreshToken() {
    return localStorage.getItem(REFRESH);
  }

  function _clearToken() {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
  }

  function _getValueByName(name) {
    return localStorage.getItem(name);
  }

  /**
   * Create list values in localStorage
   * @param {String} keyName - key name in localStorage
   * @param {String} value - value to add to the localStorage by keyName
   * @returns "item1, item2"
   */
  function _createListValues(keyName, value) {
    let result = _getValueByName(keyName);
    JSON.stringify(result).trim();
    if (!result) {
      result = value;
    } else if (!JSON.stringify(result).includes(value)) {
      result += `, ${value}`;
    } else if (result.search(value && `${value}, `) === 0) {
      result = result.replace(`${value}, `, '');
    } else if (result.search(',') === -1 && result.length === (value.length || 7)) {
      result = result.replace(`${value}`, '');
    } else {
      result = result.replace(`, ${value}`, '');
    }
    localStorage.setItem(keyName, result);
  }

  function _updateListValues(name, value) {
    localStorage.setItem(name, value);
  }

  return {
    installService: _installService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    createListValues: _createListValues,
    updateListValues: _updateListValues,
    getValueByName: _getValueByName,
    setAccessToken: _setAccessToken
  };
})();

export default LocalStorageService;
