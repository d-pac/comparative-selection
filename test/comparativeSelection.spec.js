"use strict";

const expect = require( "must" );
const {
  ordered,
  shuffled,
  onceCompared,
  allCompared
} = require( "./fixtures" );

const subject = require( "../lib/comparativeSelection" );

/**
 *
 * @param representations
 * @return {Item[]}
 */
function convertRepresentations( representations ){
  return representations.map(
    r => ({
      id       : r._id,
      compared : r.compared
    }) );
}

describe( "comparativeSelection", () =>{
  describe( "spec file", () =>{
    it( "should be found", () => expect( true ).to.be.true() );
  } );
  describe( "module", () =>{
    it( "should export an object", () => expect( subject ).to.be.an.object() );
  } );
  describe( "#select", () =>{
    it( "should be a function", () => expect( subject.select ).to.be.a.function() );
    it( "should throw an error if any representation is missing a `compared` field", () =>{
      expect( () =>{
        subject.select( {
          items : [
            {
              id : "a"
            }
          ]
        } );
      } ).to.throw();
    } );
    it( "should return the first two elements in an ordered queue", () =>{
      const items = convertRepresentations( ordered );
      const selected = subject.select( { items : items } );
      expect( selected.a ).to.be( items[ 0 ].id );
      expect( selected.b ).to.be( items[ 1 ].id );
    } );
    it( "should sort them by number of comparisons", () =>{
      const items = convertRepresentations( shuffled );
      const selected = subject.select( { items : items } );
      expect( selected.a ).to.be( "1" );
      expect( selected.b ).to.be( "2" );
    } );
    it( "should pick an `opponent` uncompared with `selected`", () =>{
      const items = convertRepresentations( onceCompared );
      const selected = subject.select( { items : items } );
      expect( selected.a ).to.be( "selected" );
      expect( selected.b ).to.be( "opponent" );
    } );
    it( "should pick the next in queue as `opponent` when `selected` compared to all", () =>{
      const items = convertRepresentations( allCompared );
      const selected = subject.select( { items : items } );
      expect( selected.a ).to.be( "selected" );
      expect( selected.b ).to.be( "opponent" );
    } );
  } );
} );
