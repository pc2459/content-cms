var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');
var app = require('../app.js');

var userid = '54fe2495d16adbbf824ccad9';

describe('Read Routes', function(){

  describe('GET "/"', function(){
    it('gets all posts', function(done){
      request(app)
        .get('/')
        .expect(200)
        .end(function(err, res){
          expect(err).to.be.null;
          done();
        });    
    }); 
  }); // end index test


  describe('GET "/:userid"', function(){
    it('gets posts by an existing user', function(done){
      request(app)
        .get('/'+userid)
        .expect(200)
        .end(function(err, res){
          expect(err).to.be.null;
          done();
        });
    });
  });

});