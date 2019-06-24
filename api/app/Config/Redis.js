const frondEnv = require('../../../env.json')
const optionUpdateSecs = frondEnv.optionUpdateSecs

module.exports = {
  'OptionItemInformed': optionUpdateSecs,
  'TXO': optionUpdateSecs,
  'FuturesChip': optionUpdateSecs,
  'OptionChip': optionUpdateSecs
}
