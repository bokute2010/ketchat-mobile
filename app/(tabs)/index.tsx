import {
  Image,
  StyleSheet,
  Platform,
  TextInput,
  View,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native";
import { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
export default function HomeScreen() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const flatListRef = useRef<FlatList>(null);

  async function sendMessage() {
    console.log("Message sent:", message);
    setSentMessages([...sentMessages, message]);
    try {
      const docRef = await addDoc(collection(db, "chat"), {
        message: message,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setMessage("");
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
