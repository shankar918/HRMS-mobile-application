// NoticeList.tsx
import React, { useEffect, useState, useContext, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../src/context/AuthContext";
import { getNotices, sendReply, sendReplyWithImage } from "../../src/services/api";

const { width } = Dimensions.get("window");

const NoticeList = () => {
  // ✅ Auth context
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { user } = auth;

  // ✅ FIXED LINE (NO ERROR)
  const currentUserId = user?._id;

  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeNotice, setActiveNotice] = useState<any>(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  // 🔹 Fetch notices
  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getNotices();

      const sorted = data.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setNotices(sorted);

      if (activeNotice) {
        const updated = sorted.find(
          (n: any) => n._id === activeNotice._id
        );
        if (updated) setActiveNotice(updated);
      }
    } catch (error) {
      console.error("Fetch notices error:", error);
    } finally {
      setLoading(false);
    }
  }, [activeNotice]);

  useEffect(() => {
    fetchNotices();
    const interval = setInterval(fetchNotices, 5000);
    return () => clearInterval(interval);
  }, [fetchNotices]);

  // 🔹 Pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 🔹 Send reply
  const handleSendReply = async (suggestion?: string) => {
    const text = suggestion || replyText;
    if (!text.trim() && !selectedImage) return;

    setSending(true);

    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("message", text);

        const filename = selectedImage.split("/").pop() || "image.jpg";
        const type = `image/${filename.split(".").pop()}`;

        formData.append("image", {
          uri: selectedImage,
          name: filename,
          type,
        } as any);

        await sendReplyWithImage(activeNotice._id, formData);
      } else {
        await sendReply(activeNotice._id, text);
      }

      setReplyText("");
      setSelectedImage(null);
      fetchNotices();
    } catch {
      Alert.alert("Error", "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  // 🔹 Render notice
  const renderNotice = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.noticeCard}
      onPress={() => {
        setActiveNotice(item);
        setIsChatOpen(true);
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={2}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Notice Board</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item._id}
          renderItem={renderNotice}
        />
      )}

      {/* Chat modal */}
      <Modal visible={isChatOpen} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView ref={scrollViewRef}>
            {activeNotice?.replies?.map((r: any, i: number) => (
              <View key={i} style={styles.messageBubble}>
                {r.image && (
                  <Image source={{ uri: r.image }} style={styles.chatImage} />
                )}
                <Text>{r.message}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={pickImage}>
              <FontAwesome5 name="paperclip" size={20} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              value={replyText}
              onChangeText={setReplyText}
              placeholder="Write reply..."
            />

            <TouchableOpacity onPress={() => handleSendReply()}>
              <FontAwesome5 name="paper-plane" size={18} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  screenTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  noticeCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "700" },
  content: { color: "#555" },
  messageBubble: { padding: 10, margin: 8, backgroundColor: "#eee" },
  chatImage: { width: 150, height: 100, borderRadius: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginHorizontal: 8,
  },
});

export default NoticeList;
