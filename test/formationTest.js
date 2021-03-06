var assert = require('assert');
var chai = require('chai');
var updateValue = null;

const request = require('supertest')('http://localhost:8080');

describe("Test de la table formation :", function(){

    // Test la méthode POST
    it('POST /formations', () => {
        const data = {
            name:'Test nom oui',
            date: '2021-07-08',
            id_certification: 1
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
                    assert.fail("GET ne marche pas (Attention si le GET ne marche le PUT et DELETE ne peux pas marcher)");
                }
                else {
                    var nbObject = Object.keys(res.body).length;
                    updateValue = res.body[nbObject - 1];
                }
        });
    });

    // Test la méthode PUT
    it('PUT /formations', () => {

        var numId = updateValue.id;
        var urlUpdate = "/formations/" + numId.toString();

        const data = {
            name:'Update nom',
            date: '1800-07-08',
            id_certification: 2
         };
        return request
            .put (urlUpdate)
            .send(data)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("PUT ne marche pas");
                }
        });
    });

    // Test la méthode DELETE
    it('DELETE /formations', () => {

        var numId = updateValue.id;
        var urlUpdate = "/formations/" + numId.toString();

        return request
            .delete(urlUpdate)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("DELETE ne marche pas");
                }
        });
    });


})