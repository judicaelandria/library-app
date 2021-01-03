import React from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

interface Props {
  sheetRef: React.RefObject<BottomSheet> | null | undefined;
  onDelete: any;
  onUpdate: any;
}

const Sheet = ({ sheetRef, onDelete, onUpdate }: Props) => {
  const renderHeader = () => (
    <Animated.View
      style={{
        width: "100%",
        height: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: 50,
          backgroundColor: "#c4c4c4",
        }}
      />
    </Animated.View>
  );
  const renderContent = () => (
    <Animated.View style={styles.container}>
      <TouchableNativeFeedback style={styles.btnContainer} onPress={onUpdate}>
        <MaterialIcons name="mode-edit" size={20} color="#191919" />
        <Text style={styles.label}>Modifier</Text>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        style={[styles.btnContainer, { marginTop: 5 }]}
        onPress={onDelete}
      >
        <Ionicons name="trash" size={20} color="#191919" />
        <Text style={styles.label}>Supprimer</Text>
      </TouchableNativeFeedback>
    </Animated.View>
  );
  return (
    <BottomSheet
      ref={sheetRef}
      initialSnap={2}
      snapPoints={[120, 100, 0]}
      renderContent={renderContent}
      renderHeader={renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 20,
    height: 120,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    height: 40,
    width: Dimensions.get("screen").width,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: "#191919",
  },
});

export default Sheet;
