"use strict";

const expect = require( "must" );
const fx = require( "./fixtures" );

const subject = require( "../lib/comparativeSelection" );

describe( "comparativeSelection", ()=>{
  describe( "spec file", ()=>{
    it( "should be found", () => expect( true ).to.be.true() );
  } );
  describe( "module", ()=>{
    it( "should export an object", ()=>expect( subject ).to.be.an.object() );
  } );
  describe( "#select", () => {
    it( "should be a function", () => expect( subject.select ).to.be.a.function() );
    it( "should throw an error when `payload` is `undefined`", () => {
      expect( () => subject.select() ).to.throw( /invalid/i );
    } );
    it( "should throw an error when `payload.representations` is `undefined`", () => {
      expect( () => subject.select( {} ) ).to.throw( /invalid/i );
    } );
    it( "should throw an error when `payload.representations` has length < 2", () => {
      expect( () => subject.select( { representations : [] } ) ).to.throw( /invalid/i );
    } );
    it( "should throw an error if any representation is missing a `compared` field", () => {
      expect( () => {
        subject.select( { representations : [{
          _id: "a"
        }] } );
      } ).to.throw( /invalid/i );
    } );
    it( "should return the first two elements in an ordered queue", () => {
      const selected = subject.select( { representations : fx.ordered } ).result;
      expect( selected[ 0 ] ).to.be( fx.ordered[ 0 ] );
      expect( selected[ 1 ] ).to.be( fx.ordered[ 1 ] );
    } );
    it( "should sort them by number of comparisons", () => {
      const selected = subject.select( { representations : fx.shuffled } ).result;
      expect( selected[ 0 ].compared.length ).to.be( 0 );
      expect( selected[ 1 ].compared.length ).to.be( 1 );
    } );
    it( "should pick an `opponent` uncompared with `selected`", () => {
      const selected = subject.select( { representations : fx[ "once-compared" ] } ).result;
      expect( selected[ 0 ]._id ).to.be( "selected" );
      expect( selected[ 1 ]._id ).to.be( "opponent" );
    } );
    it( "should pick the next in queue as `opponent` when `selected` compared to all", () => {
      const selected = subject.select( { representations : fx[ "all-compared" ] } ).result;
      expect( selected[ 0 ]._id ).to.be( "selected" );
      expect( selected[ 1 ]._id ).to.be( "opponent" );
    } );
  } );
} );
