"use strict"

 import * as QuickMath from './QuickMath'

const list = [
  QuickMath.config
 ];

const engines = {
  [QuickMath.config.name]:  QuickMath.engines
};

export default { list, engines };
