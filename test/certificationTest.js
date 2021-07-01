var assert = require('assert');
var chai = require('chai');
var updateValue = null;

const request = require('supertest')('http://localhost:8080');

describe("Test de la table certification :", function(){

    // Test la méthode POST
    it('POST /certifications', () => {
        const data = {
            name:'Test nom oui',
            description: 'Test de desciption'
         };
        return request
            .post ('/certifications')
            .send(data)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("POST ne marche pas");
                }
        });
     });

    // Test la méthode GET
    it('GET /certifications', () => {
        return request
            .get ('/certifications')
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
    it('PUT /certification', () => {

        var numId = updateValue.id;
        var urlUpdate = "/certifications/" + numId.toString();

        const data = {
            name: "Update certification Test",
            description: "Modification"
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
    it('DELETE /certification', () => {

        var numId = updateValue.id;
        var urlUpdate = "/certifications/" + numId.toString();

        return request
            .delete(urlUpdate)
            .then((res) => {
                if(typeof(res.body.insertId) == "undefined"){  
                    assert.fail("DELETE ne marche pas");
                }
        });
    });


})