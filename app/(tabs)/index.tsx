import {
  StyleSheet,
  Platform,
  TextInput,
  View,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { FlatList } from "react-native";
import { useRef, useState } from "react";
export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);

  async function sendMessage() {
    setSentMessages([...sentMessages, message]);

    const response = await fetch(
      "https://o2iyt64b5jzabbnrvch6cohp340igqzt.lambda-url.ap-southeast-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );
    if (response.ok) {
      console.log("Message sent successfully");
    } else {
      console.error("Failed to send message");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.messageList}>
        <FlatList
          ref={flatListRef}
          data={sentMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ThemedText style={styles.message}>{item}</ThemedText>
          )}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Enter your message"
            style={styles.input}
          />
          <Button title="Send" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  message: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
});
