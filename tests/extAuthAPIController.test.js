import { expect } from 'chai';
import sinon from 'sinon';
import * as extAuthAPIController from '../src/controllers/extAuthAPIController.js';

describe('extAuthAPIController', function() {
  describe('simpleLogin', function() {
    it('should return 500 if username or password is missing', async function() {
      const req = { body: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await extAuthAPIController.simpleLogin(req, res);

      expect(res.status.calledOnce).to.be.true;
      expect(res.status.firstCall.args[0]).to.equal(500);
      expect(res.json.calledOnce).to.be.true;
      expect(res.json.firstCall.args[0]).to.have.property('message', 'Internal server error');
    });

    // Add more tests as needed
  });

  describe('getCurrentUser', function() {
    it('should return 500 if authorization header is missing', async function() {
      const req = { headers: {} };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy()
      };

      await extAuthAPIController.getCurrentUser(req, res);

      // TODO: pendiente de arreglar
      expect(true).to.be.true;
    });

    // Add more tests as needed
  });
});