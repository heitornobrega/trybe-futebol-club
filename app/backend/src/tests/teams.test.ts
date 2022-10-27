import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rotas', () => {
  describe('Rota GET /teams', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/teams');
      expect((await httpResponse).status).to.equal(200)
    })
  })
  describe('Rota GET /teams/id', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/teams/2');
      expect((await httpResponse).status).to.equal(200)
    }) })

});
