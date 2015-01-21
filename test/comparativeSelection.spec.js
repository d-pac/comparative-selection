"use strict";
/* global describe, it, beforeEach */
/* jshint unused:false */

var _ = require( "lodash" );
var sinon = require( "sinon" );
var stub = require( "proxyquire" ).noCallThru();
var expect = require( "must" );

var subject = require( "../lib/comparativeSelection" );

describe( "comparativeSelection", function(){
  describe( "spec file", function(){
    it( "should be found", function(){
      expect( false ).to.be.false();
    } );
  } );
  describe( "module", function(){
    it( "should export an object", function(){
      expect( subject ).to.be.an.object();
    } );
  } );
  describe( "#select", function(){
    var inputError = /should be an Array with/;
    it( "should be a function", function(){
      expect( subject.select ).to.be.a.function();
    } );
    it( "should throw an error when `items` is `undefined`", function(){
      expect( function(){
        subject.select();
      } ).to.throw( inputError );
    } );
    it( "should throw an error when `items` is not an `Array`", function(){
      expect( function(){
        subject.select( {} );
      } ).to.throw( inputError );
    } );
    it( "should throw an error when `items` has length < 2", function(){
      expect( function(){
        subject.select( [ {} ] );
      } ).to.throw( inputError );
    } );
  } );
} );
