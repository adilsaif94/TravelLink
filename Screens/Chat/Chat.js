import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native';
import { getDatabase, get, ref, onValue, off, update } from 'firebase/database';
import Icon from 'react-native-vector-icons/AntDesign';

export default function Chat({ onBack, myData, selectedUser }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollViewRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            const myChatroom = await fetchMessages();
            if (myChatroom && myChatroom.messages) {
                setMessages(renderMessages(myChatroom.messages));
            } else {
                setMessages([]); // Set to an empty array if there are no messages
            }
        };

        loadData();

        const database = getDatabase();
        const chatroomRef = ref(database, `chatrooms/${selectedUser.chatroomId}`);
        const messageListener = onValue(chatroomRef, snapshot => {
            const data = snapshot.val();
            if (data && data.messages) {
                setMessages(renderMessages(data.messages));
            }
        });

        return () => {
            off(chatroomRef);
        };
    }, [selectedUser.chatroomId]);

    const renderMessages = useCallback(
        (msgs) => {
            return msgs && Array.isArray(msgs)
                ? msgs.map((msg, index) => ({
                    _id: `${index}-${msg.sender}`, // Use a unique ID for each message
                    text: msg.text,
                    createdAt: msg.createdAt,
                    user: {
                        _id: msg.sender === myData.username ? myData.username : selectedUser.username,
                        name: msg.sender === myData.username ? myData.username : selectedUser.username,
                        avatar: msg.sender === myData.username ? myData.avatar : selectedUser.avatar,
                    },
                }))
                : [];
        },
        [myData, selectedUser],
    );

    const fetchMessages = useCallback(async () => {
        const database = getDatabase();
        const snapshot = await get(ref(database, `chatrooms/${selectedUser.chatroomId}`));
        return snapshot.val() || { messages: [] }; // Return an object with an empty messages array if null
    }, [selectedUser.chatroomId]);

    const onSend = useCallback(async () => {
        if (newMessage.trim()) {
            const database = getDatabase();
            const currentChatroom = await fetchMessages();
            const lastMessages = currentChatroom.messages || []; // Default to an empty array

            // Only send message if there is a selected user
            if (selectedUser && myData) {
                const newMsg = {
                    text: newMessage,
                    sender: myData.username,
                    recipient: selectedUser.username, // Mark the recipient
                    createdAt: new Date().toISOString(),
                };

                // Add the new message to the chatroom
                await update(ref(database, `chatrooms/${selectedUser.chatroomId}`), {
                    messages: [...lastMessages, newMsg],
                });

                setNewMessage(''); // Reset the message input field
            }
        }
    }, [fetchMessages, myData, newMessage, selectedUser]);

    const renderMessage = (msg) => {
        const isMine = msg.user._id === myData.username;

        return (
            <View key={msg._id} style={[styles.messageContainer, isMine ? styles.myMessage : styles.receivedMessage]}>
                <Text style={styles.messageText}>{msg.text}</Text>
                <Text style={styles.messageTime}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <View style={styles.container}>
            <Pressable onPress={onBack} style={styles.header}>
                <Icon name="arrowleft" size={22} color="#000" />
                <Text style={styles.headerText}>{selectedUser?.username}</Text>
            </Pressable>
            <ScrollView ref={scrollViewRef} style={styles.messagesContainer}>
                {messages.map(renderMessage)}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                />
                <Pressable style={styles.sendButton} onPress={onSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dddddc',
        padding: 10,
    },
    headerText: {
        marginLeft: 25,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    messagesContainer: { flex: 1, padding: 10 },
    messageContainer: { marginBottom: 10, padding: 10, borderRadius: 8 },
    myMessage: {
        backgroundColor: '#d1e7dd',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#f8d7da',
        alignSelf: 'flex-start',
    },
    messageText: { fontSize: 16 },
    messageTime: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        paddingLeft: 25,
        backgroundColor: '#fff',
    },
    sendButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
    },
});
