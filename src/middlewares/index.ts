import * as validateResults from './validate-results.js';
import * as validateJWT from './validate-jwt.js';
import * as validateRoles from './validate-roles.js'

export default {
  ...validateResults,
  ...validateJWT,
  ...validateRoles,
}
