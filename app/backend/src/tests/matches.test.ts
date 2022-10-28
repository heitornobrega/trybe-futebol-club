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
  describe('Rota GET /matches', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/matches');
      expect((await httpResponse).status).to.equal(200)
    })
  })
  describe('Rota GET /matches?inProgress=false', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/matches?inProgress=true');
      expect((await httpResponse).status).to.equal(200)
    })
  })
    
  describe('Rota GET /matches?inProgress=true', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/matches?inProgress=true');
      expect((await httpResponse).status).to.equal(200)
    }) })

});
