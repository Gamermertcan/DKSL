export function get(dksl = example_dksl, take = 'main') {
  if (dksl.startsWith('__dksl__')) {
    let startIdx = dksl.indexOf('_' + take + '_') + take.length + 1;
    let endIdx = dksl.indexOf('_-' + take + '_');

    let mainBlock = dksl.slice(startIdx, endIdx).trim();
    let subBlocks = [];
    let currentBlock = '';
    let inBlock = false;

    for (let char of mainBlock) {
      if (char === '_' && !inBlock) {
        inBlock = true;
      } else if (char === '_' && inBlock) {
        inBlock = false;
        if (currentBlock) {
          subBlocks.push(currentBlock.trim());
          currentBlock = '';
        }
      } else if (inBlock) {
        currentBlock += char;
      }
    }

    if (currentBlock) {
      subBlocks.push(currentBlock.trim());
    }

    return subBlocks.filter(block => block);
  }

  return null;
}

let example_dksl = `__dksl__
_main_
_data_
Example
_-data_
_data2_
Example2
_data3_
Example3
_-data3_
_-data2_
_-main_`;

