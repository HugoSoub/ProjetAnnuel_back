var assert = require('assert');
var chai = require('chai');
var expect = chai.expect
var updateValue = null;

const request = require('supertest')('http://localhost:8080');

describe("Test de la table formation :", function(){

    // Test la méthode POST
    it('POST /formations', () => {
        const data = {
            name:'Découverte HTML',
         };
        return request
            .post ('/formations')
            .send(data)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("POST ne marche pas");
                }
        });
     });

    // Test la méthode GET
    it('GET /formations', () => {
        return request
            .get ('/formations')
            .then((res) => {

                if(Object.keys(res.body).length === 0){  
                    assert.fail("GET ne marche pas");
                }
                else {
                    updateValue = res.body[0];
                }
        });
    });

    // Test la méthode PUT
    it('PUT /formations', () => {

        console.log(updateValue[0]);
        const data = {
            id: updateValue[0]
         };
        return request
            .put ('/formations')
            .send(data)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("PUT ne marche pas");
                }
        });
    });


})