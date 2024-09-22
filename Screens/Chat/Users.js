import React from 'react';
import {
    Button,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Users({
    users,
    onClickUser,
    userToAdd,
    setUserToAdd,
    onAddFriend,
}) {
    const renderUser = ({ item }) => {
        return (
            <Pressable onPress={() => onClickUser(item)} style={styles.row}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <Text>{item.username}</Text>
            </Pressable>
        );
    };
    return (
        <>
            <View style={styles.addUser}>
                <TextInput
                    style={styles.input}
                    placeholder="Search to Chat"
                    onChangeText={setUserToAdd}
                    value={userToAdd}
                />
                <LinearGradient colors={['#F368FF', '#ADBAFD']}  style={styles.linearButton}>
                    <TouchableOpacity style={styles.googleButton} onPress={() => onAddFriend(userToAdd)}>
                        <Text style={styles.buttonText}>Add user</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={item => item.username.toString()}
            />
        </>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 20
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#cacaca',
        borderBottomWidth: 1,
    },
    addUser: {
        flexDirection: 'row',
        padding: 10,
        marginTop:10
    },
    input: {
        flex: 1,
        height: 45,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginRight: 10
    },
    linearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '500',
    },
});