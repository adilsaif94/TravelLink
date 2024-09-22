import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import RazorpayCheckout from 'react-native-razorpay';

const Payment = () => {


    const handlePayment = async () => {
        const options = {
            description: 'Purchase Description',
            image: 'https://your-logo-url.com/logo.png',
            currency: 'INR',
            key: 'rzp_test_CM0Qfrf8C6BSPl',
            amount: 47500 * 100, // Amount in paise
            name: 'Travel Link',
            prefill: {
                email: 'customer@example.com',
                contact: '9999999999',
                name: 'Customer Name',
            },
            theme: { color: '#F37254' },
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                console.log('Payment Success:', data);
                Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);
            })
            .catch((error) => {
                if (error.code === 3) {
                    Alert.alert('Payment Cancelled', 'You cancelled the payment.');
                } else {
                    Alert.alert('Payment Failed', `Error: ${error.description}`);
                }
            });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keycontainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <Text style={styles.cartTitle}>My Cart</Text>

                <View style={styles.card}>
                    <Image style={styles.touristImage} source={require('../Assets/images/bali.jpeg')} />
                    <View style={styles.cardDetails}>
                        <Text style={styles.tripText}>Trip to Bali</Text>
                        <Text style={styles.priceText}>Price: <Text style={{ fontWeight: '500', color: '#000' }}>₹20,000</Text></Text>
                        <Text style={styles.daysText}>Days: <Text style={{ fontWeight: '500', color: '#000' }}>7</Text></Text>
                    </View>
                    <AntDesign name="infocirlce" size={18} color="#F368FF" style={styles.infoIcon} />
                </View>

                <View style={styles.card}>
                    <Image style={styles.touristImage} source={require('../Assets/images/maldives.jpg')} />
                    <View style={styles.cardDetails}>
                        <Text style={styles.tripText}>Trip to Maldives</Text>
                        <Text style={styles.priceText}>Price: <Text style={{ fontWeight: '500', color: '#000' }}>₹30,000</Text></Text>
                        <Text style={styles.daysText}>Days: <Text style={{ fontWeight: '500', color: '#000' }}>5</Text></Text>
                    </View>
                    <AntDesign name="infocirlce" size={18} color="#F368FF" style={styles.infoIcon} />
                </View>

                {/* Payment Summary */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>₹50,000</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Discount (10%) :</Text>
                        <Text style={styles.summaryValue}>-₹5,000</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Taxes:</Text>
                        <Text style={styles.summaryValue}>₹2,500</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total Amount:</Text>
                        <Text style={styles.totalValue}>₹47,500</Text>
                    </View>
                </View>

                <LinearGradient colors={['#F368FF', '#ADBAFD']} style={styles.linearButton}>
                    <TouchableOpacity style={styles.googleButton} onPress={handlePayment}>
                        <Text style={styles.buttonText}>Confirm Payment</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Payment;

const styles = StyleSheet.create({
    keycontainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    container: {
        backgroundColor: '#fff',
    },
    cartTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        alignItems: 'center',
    },
    infoIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    touristImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    cardDetails: {
        flex: 1,
    },
    tripText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 3,
    },
    daysText: {
        fontSize: 14,
        color: '#777',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F368FF',
    },
    linearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 20,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 11,
    },
    buttonText: {
        fontSize: 19,
        color: '#fff',
        fontWeight: '500',
    },
});
