const detectPath = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.CI_PROJECT_PATH !== undefined) {
      return '/' + process.env.CI_PROJECT_PATH + '/';
    }
    return '/';
  }
  return '/';
};

module.exports = {
  publicPath: detectPath()
};
