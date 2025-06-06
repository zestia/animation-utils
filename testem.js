module.exports = {
  framework: 'qunit',
  test_page: 'test/index.html',
  launch_in_dev: ['Chrome'],
  launch_in_ci: ['Chrome'],
  port: 0,
  browser_args: {
    Chrome: {
      ci: ['--headless', '--incognito']
    }
  }
};
