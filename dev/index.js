var core = require('./raphael.core');
if(core.svg){
  require('./raphael.svg');
}
if(core.vml){
  require('./raphael.vml');
}
module.exports = core;