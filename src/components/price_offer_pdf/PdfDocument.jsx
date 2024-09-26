import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

const logo = require('../../assets/cisar_logo.png');

Font.register({
    family: "Noto sans",
    fonts: [
        {src: "http://fonts.gstatic.com/s/notosans/v6/LeFlHvsZjXu2c3ZRgBq9nKCWcynf_cDxXwCLxiixG1c.ttf"},
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Noto sans',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    subHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    footer: {
        flexDirection: 'row', 
        marginTop: 10,
        justifyContent: 'space-between', 
        border: '1px 1px 1px 1px solid #000', 
        padding: 5,
        backgroundColor: '#f0f0f0', 
    },
    totalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 2,
        borderRight: '1px solid #000',
        backgroundColor: '#f0f0f0', 
    },
    totalAmount: {
        fontSize: 12,
        fontWeight: 'bold',
        padding: 2,
        textAlign: 'right', 
        backgroundColor: '#f0f0f0', 
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 10,
    },
    customerInfo: {
        width: '50%',
        float: 'left',
    },
    userInfo: {
        float: 'right',
        textAlign: 'right',
    },
    itemsContainer: {
        border: '1px 1px 1px 1px solid black',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 5,
    },
    itemHeader: {
        fontWeight: 'bold',
        textDecoration: 'underline'
    },
    itemCell: {
        width: '15%', 
    },
    space: {
        margin: 10,
    },
    text: {
        fontSize: 10,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecoration: 'underline',
        marginBottom: 5,
    },
    totalPriceCell: {
        fontWeight: 'bold',
        padding: 5,
    },
    image: {
        width: 100,
        height: 30,
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    tableCol: {
        padding: 5,
        fontSize: 10,
        borderRightWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        textAlign: 'center',
    },
    tableColTitle: {
        padding: 2,
        fontSize: 10,
        textAlign: 'left', 
        flexGrow: 2, 
        borderRightWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
    },
});


const PdfDocument = ({ priceOfferDetails, userInfo }) => {
  return (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Cenová ponuka</Text>
                <Image src={logo} style={styles.image} />
            </View>

            <View style={styles.subHeader}>
                <View style={styles.customerInfo}>
                    <Text style={styles.subTitle}>Zákazník:</Text>
                    <Text style={styles.text}>Meno: {priceOfferDetails.customer.name}</Text>
                    <Text style={styles.text}>Adresa: {priceOfferDetails.customer.city} {priceOfferDetails.customer.address}</Text>
                    <Text style={styles.text}>PSČ: {priceOfferDetails.customer.zip}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={[styles.subTitle, { textAlign: 'center'}]}>Spracoval:</Text>
                    <Text style={styles.text}>{userInfo.name}</Text>
                    <Text style={styles.text}>{priceOfferDetails.customer.city} {userInfo.address}</Text>
                    <Text style={styles.text}>{userInfo.zip}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.space}> </Text>
                <Text style={styles.text}>Vypracované: {new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableColTitle, { flex: 2, textAlign: 'start' }]}>Názov položky</Text>
                    <Text style={[styles.tableCol, { flex: 1 }]}>Jednotka</Text>
                    <Text style={[styles.tableCol, { flex: 1 }]}>Množstvo</Text>
                    <Text style={[styles.tableCol, { flex: 1 }]}>Cena</Text>
                    <Text style={[styles.tableCol, { flex: 1 }]}>Celkom</Text>
                </View>
                
                {priceOfferDetails.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={[styles.tableColTitle, { flex: 2 }]}>{item.title}</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>{item.unit}</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>{item.quantity}</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>{String(item.price).replace('.', ',')}</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>{String(item.total).replace('.', ',')}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <Text style={styles.totalPriceCell}>Spolu: </Text>
                <Text style={[{width: 'auto'}, styles.totalPriceCell]}>{String(priceOfferDetails.total).replace('.', ',')} €</Text>
            </View>
        </Page>
    </Document>
  );
};

export default PdfDocument;