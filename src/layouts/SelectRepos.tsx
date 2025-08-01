import Combobox from "@/components/costum/Combobox";
import { useState } from "react";

const SelectRepos = () => {
  const [selected, setSelected] = useState<any>([]);
  
  return (
    <Combobox
      options={[
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
      ]}
      value={selected}
      onChange={setSelected}
      displayKey="name"
    />
  );
};

export default SelectRepos;
