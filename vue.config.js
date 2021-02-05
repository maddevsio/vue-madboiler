/**
 * If you want to use Gitlab pages,
 * you need to adjust the path for your project.
 * 
 * Please see this documentation https://cli.vuejs.org/ru/guide/deployment.html#gitlab-pages
 */
const gitlabPagePath = () => {
  const path = new URL(process.env.CI_PROJECT_URL).pathname;
  if (process.env.NODE_ENV === 'production') {
    if (path) {
      return '/' + path + '/'; 
    }
    return '/';
  }
  return '/';
};

module.exports = {
  publicPath: gitlabPagePath()
};
