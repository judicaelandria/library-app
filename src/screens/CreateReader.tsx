import React from "react";
import useSave from "../hooks/useSave";
import { TextField } from "../ui/TextField";
import { WrapperWithHeader } from "../ui/wrapper";

const CreateReader = () => {
  const [name, setName] = React.useState("");
  const reader = useSave("reader/createReader", "readers");
  const saveReader = () => {
    const lec = {
      name: name,
    };
    reader.mutate(JSON.stringify(lec));
  };
  return (
    <WrapperWithHeader
      disabled={name.length < 4 ? true : false}
      onPress={saveReader}
    >
      <TextField
        placeholder="Nom du lecteur"
        value={name}
        onChange={(prevState) => setName(prevState)}
      />
    </WrapperWithHeader>
  );
};
export default CreateReader;
