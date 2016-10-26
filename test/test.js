const server = require('../server');
const router = require('../router');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);


//  let request = chai.request(server.start(router.route);



describe('HTML webapp that has routes', function(){

    it('loads the webpage', function(done){
        server.start(router.route);
        chai.request('http://localhost:8080')
        .get('/')
        // .get('/Swahili')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert(res.text ==='Which language; English, Spanish, French, German, Swahili, or Mandarin?');
            done();
        });
    });
    it('routes to different pages', function(done){
        console.log('in 2nd test');
        chai.request('http://localhost:8080')
        .get('/Swahili')
        .end(function (err, res) {
            console.log(res.text);
            expect(err).to.be.null;
            assert(res.text ==='Salamu, Dunia.');
            done();
        });
    });
    it('displays different messages on different pages', function(done){
        console.log('in 2nd test');
        chai.request('http://localhost:8080')
        .get('/French')
        .end(function (err, res) {
            console.log(res);
            expect(err).to.be.null;
            assert(res.text ==='Bonjour le monde.');
            done();
        });
    });

    it('sends back text with format=text in query string', function(done){
        chai.request('http://localhost:8080')
            .get('/?format=text')
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.type, 'text/plain');
                assert.equal(res.text, `{"name":"foo"}`);
                done();
            });
    });
});








