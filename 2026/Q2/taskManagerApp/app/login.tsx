import { useState } from "react";
import { Button, TextInput, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "@/src/services/api";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      if (response.token) {
        await AsyncStorage.setItem("authToken", response.token);
        // Navigate to the main app screen after successful login
      } else {
        alert("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10, borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20, borderWidth: 1, padding: 8 }}
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "blue", padding: 10 }}>
        <Button title="Login" color="#fff" onPress={handleLogin} />
      </TouchableOpacity>
    </View>
  );
}