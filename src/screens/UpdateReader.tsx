import React from "react";
import useUpdate from "../hooks/useUpdate";
import { TextField } from "../ui/TextField";
import { WrapperWithHeader } from "../ui/wrapper";
import { useRoute } from "@react-navigation/native";
import { UpdateReaderRouteProp } from "../types";

const UpdateReader = () => {
  const { params } = useRoute<UpdateReaderRouteProp>();
  const reader = useUpdate(`reader/updateReader/${params._id}`, "reader");
  const [name, setName] = React.useState(params.name);
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
export default UpdateReader;
