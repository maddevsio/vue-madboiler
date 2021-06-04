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
    let newData = [];
    if (localStorage.getItem(keyName)) {
      newData = JSON.parse(localStorage.getItem(keyName));
    }
    if (newData.some(data => data === value)) {
      newData = newData.filter(data => data !== value);
    } else {
      newData.push(value);
    }
    localStorage.setItem(keyName, JSON.stringify(newData));
    return newData;
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
