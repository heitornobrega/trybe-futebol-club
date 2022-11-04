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
  describe('Rota GET /leaderboard/home', () => {
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/leaderboard/home');
      expect((await httpResponse).status).to.equal(200)
    })
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/leaderboard/away');
      expect((await httpResponse).status).to.equal(200)
    })
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/leaderboard');
      expect((await httpResponse).status).to.equal(200)
    })
  })
  })
  

