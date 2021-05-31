const fetch = require('node-fetch')
const Configstore = require('configstore')
const configStore = new Configstore('cli')

module.exports = {

  // fetch an authentication token if it exists
  checkTokenExists: () => {
    return configStore.get('token')
      ? true
      : false
  },

  // sign in request with credentials
  handleSignIn: async credentials => {
    const res = await fetch(
      'http://localhost:3006/cli/signin', {
      method: 'POST',
      body: JSON.stringify({ ...credentials }),
    })

    const payload = await res.json()
    return payload
  },

  // store authentication token
  storeAuthToken: (token) => {
    configStore.set('token', token)
  },

  // clear auth token
  clearAuthToken: () => {
    configStore.clear('token')
  },

  // validate authentication token
  validateToken: async token => {
    const res = await fetch(
      'http://localhost:3006/cli/validate', {
      method: 'POST',
      body: JSON.stringify({
        token: token
      })
    })
    const { ack } = await res.json()
    return ack === 'success'
  }
}