import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons(undefined, { disableWarnings: true });
const dropdownStyles = {
    dropdown: { 
        width: '100%',
     }
  };
  const options = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' }
  ];
  
  const stackTokens = { childrenGap: 20 };

function DropdownElement(){
       
        return(
            <div className="drpdwn">
                <Stack tokens={stackTokens}>
                    <Dropdown placeholder="Select an option" options={options} className="dropdown-inr" styles={dropdownStyles} />
                </Stack>
            </div>
        );
}

export default DropdownElement;