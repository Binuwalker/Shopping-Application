import React, {useEffect, useState} from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backGroundColor: '#E4E4E4',
        padding: 20
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 10
    }
})

const Invoice = () => {

    const [shippingInfo, setShippingInfo] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const shippingAddress = JSON.parse(localStorage.getItem('shipping-info'));
        const cartItems = JSON.parse(localStorage.getItem('cart-list'));
        setShippingInfo(shippingAddress);
        setCartItems(cartItems);
    }, [])

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View>
                    <Text style={styles.title}>Order Details</Text>
                    <Text style={styles.subTitle}>Your Orders</Text>
                    <Text style={styles.detail}>Address: {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.country} - {shippingInfo.postalCode}</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Invoice
