// https://github.com/brianc/node-postgres/issues/811
import { types } from 'pg';

types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});
