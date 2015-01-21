"use strict";
module.exports = function( grunt ){
  // Show elapsed time at the end
  require( "time-grunt" )( grunt );
  // Load all grunt tasks
  require( "jit-grunt" )( grunt, {
    mochacli : "grunt-mocha-cli"
  } );

  var paths = {
    source : [ "index.js", "lib/**/*.js" ],
    tests  : [ "test/**/*.js" ]
  };

  grunt.initConfig( {

    jshint : {
      options : {
        jshintrc : ".jshintrc",
        reporter : require( "jshint-stylish" )
      },
      build   : {
        src : [ "Gruntfile.js" ]
      },
      source  : {
        src : paths.source
      },
      test    : {
        src : paths.tests
      }
    },

    jscs : {
      options : {
        config : ".jscsrc"
      },
      source  : {
        src : paths.source
      },
      test    : {
        src : paths.tests
      }
    },

    mochacli : {
      options : {
        reporter : "spec",
        bail     : true
      },
      all     : paths.tests
    }

  } );

  grunt.registerTask( "lint", [ "jshint", "jscs" ] );
  grunt.registerTask( "test", [ "mochacli" ] );

  grunt.registerTask( "default", [ "lint", "test" ] );
};
