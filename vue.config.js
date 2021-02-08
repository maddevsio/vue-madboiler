/**
 * If you want to use Gitlab pages,
 * you need to adjust the path for your project.
 * 
 * Please see this documentation https://cli.vuejs.org/ru/guide/deployment.html#gitlab-pages
 */
const gitlabPagePath = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.CI !== undefined) {
      return '/frontend/vue-madboiler/'; 
    }
    return '/';
  }
  return '/';
};

module.exports = {
  publicPath: gitlabPagePath()
};
