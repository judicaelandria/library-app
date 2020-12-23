import React from "react";
import { Text } from "react-native";

interface HeadingProps {
  title: string;
  size?: "small" | "medium" | "big";
  weight?: "regular" | "medium" | "bold";
}

const Heading = ({
  title,
  size = "medium",
  weight = "medium",
}: HeadingProps) => (
  <Text
    style={{
      fontSize: size == "small" ? 16 : size == "medium" ? 24 : 32,
      color: "black",
      fontWeight:
        weight == "regular" ? "400" : weight == "medium" ? "700" : "bold",
    }}
  >
    {title}
  </Text>
);

export default Heading;
