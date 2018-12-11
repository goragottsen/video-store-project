const expect = require('chai').expect;

const fetch = require('./fetch-functions');

describe('Admin auth tests', () => {

  it('Login by existing admin credentials (login: admintest, password: 1234)', () => {
    // fetch.createAdmin('admintest', '1234');
    return fetch.isAdmin('admintest', '1234')
    .then(response => {
      expect(typeof response).to.equal('object');
      expect(response.login).to.equal('admintest');
    });
  });

  it('Login by wrong admin credentials (login: unknown@gmail.com)', () => {
    return fetch.isAdmin('unknown', '1234')
      .then(response => {
        expect(typeof response).to.not.equal('object');
      });
  });
});

describe('Get the list of existing videos', () => {

  it('Get list of videos', () => {
    return fetch.getVideos(0,0)
      .then(response => {
        expect(response.message).to.equal('Videos fetched successfully!');
        expect(parseInt(response.maxVideos)).to.greaterThan(0);
      });
  });
});

describe('Get customers list', () => {

  it('Get list of customers', () => {
    return fetch.getCustomers(0,0)
      .then(response => {
        expect(response.message).to.equal('Customers fetched successfully!');
        expect(parseInt(response.maxCustomers)).to.greaterThan(0);
      });
  });
});
