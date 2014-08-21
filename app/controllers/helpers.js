'use strict';

module.exports = {
  Ok: function(response){
    return [200, response];
  },
  Created: function(response){
    return [201, response];
  },
  NotFound: function(){
    return [404];
  }
};
