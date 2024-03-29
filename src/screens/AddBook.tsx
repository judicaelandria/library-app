import React from "react";
import { Image, Platform, Text, View } from "react-native";
import { TextField } from "../ui/TextField";
import { WrapperWithHeader } from "../ui/wrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import { event } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../constants";
import { Fontisto } from "@expo/vector-icons";

const AddBook = () => {
  const [author, setAuthor] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [showDate, setShowDate] = React.useState(false);
  const [image, setImage] = React.useState<string | null | any>(null);
  const disabled =
    author.length < 4 || designation.length < 4 || !image ? true : false;
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const mutation = useMutation(
    (newBook: FormData) =>
      fetch(`${API_URL}/book/createBook`, {
        method: "POST",
        body: newBook,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("books");
        navigation.goBack();
      },
    }
  );

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDate(false);
  };
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Désolé, Nous avons besoins de permissions pour acceder au photos!"
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveBook = (event: any) => {
    const formData = new FormData();

    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image";

    formData.append("author", author);
    formData.append("designation", designation);
    formData.append("publishingDate", date.toLocaleString());
    formData.append(
      "image",
      // @ts-ignore
      { uri: image, name: filename, type }
    );
    formData.append("available", "true");
    mutation.mutate(formData);
  };

  return (
    <WrapperWithHeader
      disabled={disabled}
      onPress={() => {
        saveBook(event);
      }}
    >
      <View style={{ display: "flex" }}>
        <TextField
          value={author}
          onChange={(prevState) => setAuthor(prevState)}
          placeholder="Auteur"
        />
        <TextField
          value={designation}
          onChange={(prevState) => setDesignation(prevState)}
          placeholder="Designation"
          mt={20}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#AEAEAE" }}>Date d'édition: </Text>
          <TouchableNativeFeedback
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
            onPress={() => setShowDate(true)}
          >
            <Text style={{ fontSize: 16, color: "#AEAEAE" }}>
              {date.toLocaleDateString()}
            </Text>
          </TouchableNativeFeedback>
        </View>
        {showDate == true ? (
          <DateTimePicker value={date} mode="date" onChange={onChangeDate} />
        ) : null}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Fontisto name="photograph" size={120} color="#C4C4C4" />
          )}
          <TouchableNativeFeedback
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            onPress={pickImage}
          >
            <>
              <Text style={{ color: "#c4c4c4", fontSize: 13, marginLeft: 10 }}>
                Ajouter une image
              </Text>
              <Text style={{ color: "#c4c4c4", fontSize: 13, marginLeft: 10 }}>
                Format (PNG,JPEG,PNG)
              </Text>
            </>
          </TouchableNativeFeedback>
        </View>
      </View>
    </WrapperWithHeader>
  );
};

export default AddBook;
