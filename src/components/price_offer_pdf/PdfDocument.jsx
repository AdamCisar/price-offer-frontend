import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logo from '../../assets/cisar_logo.png';

Font.register({
    family: 'NotoSans',
    fonts: [
        {
            src: '/fonts/NotoSans-Regular.ttf',
        }
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'NotoSans',
        display: 'flex',
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
    },
    footer: {
        marginTop: 10,
        border: '1px 1px 1px 1px solid #000', 
        padding: 5,
        backgroundColor: '#f0f0f0', 
    },
    footerRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
        width: '35%',
        padding: 5,
        border: '1px 1px 1px 1px solid black',
        marginBottom: 10,
    },
    userInfo: {
        width: '35%',
        padding: 5,
        border: '1px 1px 1px 1px solid black',
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
    priceCell: {
        fontSize: 12,
        padding: '0 5 0',
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
    <>
    {priceOfferDetails.items && priceOfferDetails.customer && userInfo &&
        <Document title={`cenova_ponuka_${priceOfferDetails.customer?.name}`}>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cenová ponuka</Text>
                    <Image src={logo} style={styles.image} alt="cisar_logo" />
                </View>

                <View style={styles.customerInfo}>
                    <Text style={styles.subTitle}>Zákazník:</Text>
                    <Text style={styles.text}>Meno: {priceOfferDetails.customer?.name}</Text>
                    <Text style={styles.text}>Adresa: {priceOfferDetails.customer?.city} {priceOfferDetails.customer?.address}</Text>
                    <Text style={styles.text}>PSČ: {priceOfferDetails.customer?.zip}</Text>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.subTitle}>Spracoval:</Text>
                    <Text style={styles.text}>{userInfo.name}</Text>
                    <Text style={styles.text}>{userInfo.city} {userInfo.address}</Text>
                    <Text style={styles.text}>{userInfo.zip}</Text>
                </View>

                <View style={[styles.section, { flexDirection: 'row', justifyContent: 'flex-end'}]}>
                    <Text style={[styles.text, { textAlign: 'right' }]}>
                        Vypracované dňa: {new Date().toLocaleDateString()}
                    </Text>
                </View>
                
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCol, { flex: 1 }]}>Názov položky</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>Merná jednotka</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>Množstvo</Text>
                        <Text style={[styles.tableCol, { flex: 1 }]}>Cena {priceOfferDetails.is_vat ? 'bez DPH' : ''}</Text>
                        {
                            priceOfferDetails.is_vat &&
                                <Text style={[styles.tableCol, { flex: 1 }]}>DPH %</Text>
                        }
                        <Text style={[styles.tableCol, { flex: 1 }]}>Spolu {priceOfferDetails.is_vat ? 'bez DPH' : ''}</Text>
                    </View>
                    
                    {priceOfferDetails.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.tableCol, { flex: 1, textAlign: 'left' }]}>{item.title}</Text>
                            <Text style={[styles.tableCol, { flex: 1 }]}>{item.unit}</Text>
                            <Text style={[styles.tableCol, { flex: 1 }]}>{item.quantity}</Text>
                            <Text style={[styles.tableCol, { flex: 1 }]}>{String(item.price).replace('.', ',')}</Text>
                            {
                                priceOfferDetails.is_vat && 
                                    <Text style={[styles.tableCol, { flex: 1 }]}>{23}</Text>
                            }
                            <Text style={[styles.tableCol, { flex: 1 }]}>{String(item.total).replace('.', ',')}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    {priceOfferDetails.is_vat && 
                    <>
                        <View style={styles.footerRow}>
                            <Text style={styles.priceCell}>Základ DPH:</Text>
                            <Text style={[{width: 'auto'}, styles.priceCell]}>{String(priceOfferDetails.vatBase).replace('.', ',')} €</Text>
                        </View>
                        <div style={{borderBottom: '1px solid #000'}}>
                        <View style={styles.footerRow}>
                            <Text style={styles.priceCell}>DPH:</Text>
                            <Text style={[{width: 'auto'}, styles.priceCell]}>{String(priceOfferDetails.vat).replace('.', ',')} €</Text>
                        </View>
                        </div>
                        </>
                    }

                    <View style={styles.footerRow}>
                        <Text style={styles.totalPriceCell}>Celkom:</Text>
                        <Text style={[{width: 'auto'}, styles.totalPriceCell]}>{String(priceOfferDetails.is_vat ? priceOfferDetails.total : priceOfferDetails.vatBase).replace('.', ',')} €</Text>
                    </View>
                </View>
            </Page>
        </Document>
    }
    </>
  );
};

export default PdfDocument;