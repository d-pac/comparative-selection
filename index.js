'use strict';
module.exports = {
    manifest : [
        {
            name        : "d-pac.comparative-selection",
            description : "Simple comparative selection algorithm based on [NoMoreMarking's `cj` module](https://github.com/NoMoreMarking/cj)",
            options     : {
                type : "select",
                n    : 2
            }
        }
    ],
    select   : require( "lib/comparativeSelection" )
};