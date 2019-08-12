const app = require('../../src/app');

describe('\'Listings\' service', () => {
  it('registered the service', () => {
    const service = app.service('listings');
    expect(service).toBeTruthy();
  });
});
