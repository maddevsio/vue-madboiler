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
    localStorage.setItem('access_token', tokenObj.access_token);
    localStorage.setItem('refresh_token', tokenObj.refresh_token);
  }

  function _getAccessToken() {
    return localStorage.getItem('access_token');
  }

  function _getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  function _clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
    getValueByName: _getValueByName
  };
})();

export default LocalStorageService;
