const app = require('../../src/app');

describe('\'likes\' service', () => {
  it('registered the service', () => {
    const service = app.service('likes');
    expect(service).toBeTruthy();
  });
});
