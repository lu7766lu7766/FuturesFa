const frondEnv = require('../../../env.json')
const optionUpdateSecs = frondEnv.optionUpdateSecs,
  accumulationUpdateSecs = frondEnv.accumulationUpdateSecs

module.exports = {
  'OptionItemInformed': optionUpdateSecs,
  'OptionChipAccumulation': accumulationUpdateSecs,
  'TXO': optionUpdateSecs,
  'FuturesChip': optionUpdateSecs,
  'OptionChip': optionUpdateSecs
}
