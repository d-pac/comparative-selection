"use strict";
/* global describe, it, beforeEach */
/* jshint unused:false */

var _ = require( "lodash" );
var sinon = require( "sinon" );
var stub = require( "proxyquire" );
var expect = require( "must" );
var fx = require( "./fixtures" );

var subject = require( "../lib/comparativeSelection" );

describe( "comparativeSelection", function(){
  describe( "spec file", function(){
    it( "should be found", function(){
      expect( true ).to.be.true();
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
    it( "should return the first two elements in an ordered queue", function(){
      var selected = subject.select( fx.ordered );
      expect( selected[ 0 ] ).to.be( fx.ordered[ 0 ] );
      expect( selected[ 1 ] ).to.be( fx.ordered[ 1 ] );
    } );
    it( "should sort them by number of comparisons", function(){
      var selected = subject.select( fx.shuffled );
      expect( selected[ 0 ].compared.length ).to.be( 0 );
      expect( selected[ 1 ].compared.length ).to.be( 1 );
    } );
    it( "should pick an `opponent` uncompared with `selected`", function(){
      var selected = subject.select( fx[ "once-compared" ] );
      expect( selected[ 0 ]._id ).to.be( "selected" );
      expect( selected[ 1 ]._id ).to.be( "opponent" );
    } );
    it( "should pick the next in queue as `opponent` when `selected` compared to all", function(){
      var selected = subject.select( fx[ "all-compared" ] );
      expect( selected[ 0 ]._id ).to.be( "selected" );
      expect( selected[ 1 ]._id ).to.be( "opponent" );
    } );
  } );
} );
