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
  describe('Rota GET /login/validate', () => {
    it('deve retornar status 500', async () => {
      const httpResponse = chai.request(app).get('/login/validate');
      expect((await httpResponse).status).to.equal(500)
    }) })


    describe('Rota POST /login -- do login ao token', () => {
      it('Deve retornar status 200', async () => {
        const httpResponse =  chai
          .request(app)
          .post("/login")
          .send({ 
            email: "user@user.com",
            password: "secret_user"
          });
        expect((await httpResponse).status).to.equal(200)
        expect((await httpResponse).body).to.be.an('object')
        
        const token = (await httpResponse).body
        const httpResponse2 = chai
          .request(app)
          .get('/login/validate')
          .set('Authorization', token.token);
          expect((await httpResponse2).status).to.equal(200)
      })
    })
  
  
    describe('ErrorRota POST /login -- email invalido ', () => {
      it('Deve retornar status 401', async () => {
        const httpResponse =  chai
          .request(app)
          .post("/login")
          .send({
            "email": "invalidUser@email.com",
            "password": "secret_user"
          });
        expect((await httpResponse).status).to.equal(401)
      })
    })
  
    describe('ErrorRota POST /login -- password invalido ', () => {
      it('Deve retornar status 401', async () => {
        const httpResponse =  chai
          .request(app)
          .post("/login")
          .send({
            "email": "user@user.com",
            "password": "secret_invalido"
          });
        expect((await httpResponse).status).to.equal(401)
      })
    })
  
    describe('ErrorRota POST /login -- sem password ', () => {
      it('Deve retornar status 401', async () => {
        const httpResponse =  chai
          .request(app)
          .post("/login")
          .send({
            "email": "user@user.com",
          });
        expect((await httpResponse).status).to.equal(400)
      })
    })

});
