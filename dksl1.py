example_dksl = '''__dksl__
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
_-main_'''

def get(dksl=example_dksl, take='main'):
    if dksl.startswith('__dksl__'):
        start_idx = dksl.find('_' + take + '_') + len(take) + 1
        end_idx = dksl.find('_-' + take + '_')
        
        main_block = dksl[start_idx:end_idx].strip()
        sub_blocks = []
        current_block = ''
        in_block = False
        
        for char in main_block:
            if char == '_' and not in_block:
                in_block = True
            elif char == '_' and in_block:
                in_block = False
                if current_block:
                    sub_blocks.append(current_block.strip())
                    current_block = ''
            elif in_block:
                current_block += char
        
        if current_block:
            sub_blocks.append(current_block.strip())
        
        return [block for block in sub_blocks if block]
    
    return None




