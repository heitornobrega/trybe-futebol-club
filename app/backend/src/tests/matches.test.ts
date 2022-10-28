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
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/matches');
      expect((await httpResponse).status).to.equal(200)
    })
  })
  describe('Rota GET /matches?inProgress=false', () => {
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/matches?inProgress=true');
      expect((await httpResponse).status).to.equal(200)
    })
  })
    
  describe('Rota GET /matches?inProgress=true', () => {
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/matches?inProgress=true');
      expect((await httpResponse).status).to.equal(200)
    })
  })

  describe('Rota GET /matches?inProgress=false', () => {
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).get('/matches?inProgress=false');
      expect((await httpResponse).status).to.equal(200)
    })
  })
  
  describe('Rota POST /matches', () => {
    it('deve retornar status 201', async () => {
      const httpResponse =  chai
      .request(app)
      .post("/login")
      .send({ 
        email: "user@user.com",
        password: "secret_user"
      });
    expect((await httpResponse).status).to.equal(200)
     const token = (await httpResponse).body
      const httpResponse2 = chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 8, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set('Authorization', token.token);
      expect((await httpResponse2).status).to.equal(201)
    })
  })
  

  describe('Rota POST /matches', () => {
    it('deve retornar status 422', async () => {
      const httpResponse =  chai
      .request(app)
      .post("/login")
      .send({ 
        email: "user@user.com",
        password: "secret_user"
      });
    expect((await httpResponse).status).to.equal(200)
     const token = (await httpResponse).body
      const httpResponse2 = chai.request(app)
        .post('/matches')
        .send({
          homeTeam: 16,
          awayTeam: 16, 
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set('Authorization', token.token);
      expect((await httpResponse2).status).to.equal(422)
    })
  })

  describe('Rota GET /matches/:id/finish', () => {
    it('deve retornar status 200', async () => {
      const httpResponse = chai.request(app).patch('/matches/41/finish');
      expect((await httpResponse).status).to.equal(200)
    })
  })

});
