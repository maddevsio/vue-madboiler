const detectPath = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.CI_PROJECT_NAME !== undefined) {
      return '/' + process.env.CI_PROJECT_NAME + '/';
    }
    return '/';
  }
  return '/';
};

module.exports = {
  publicPath: detectPath()
};
