import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logo from '../../assets/cisar_logo.png';
import parse, { domToReact } from "html-react-parser";

Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/NotoSans-Medium.ttf', fontWeight: '500' },
    { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 'bold' },
    { src: '/fonts/NotoSans-SemiBold.ttf', fontWeight: '600' },
  ],
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
        fontWeight: '500',
        padding: 2,
        borderRight: '1px solid #000',
        backgroundColor: '#f0f0f0', 
    },
    totalAmount: {
        fontSize: 12,
        fontWeight: '500',
        padding: 2,
        textAlign: 'right', 
        backgroundColor: '#f0f0f0', 
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: '500',
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
        fontWeight: '500',
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
        fontWeight: '500',
        textDecoration: 'underline',
        marginBottom: 5,
    },
    totalPriceCell: {
        fontWeight: '500',
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
    tableRowLast: {
        flexDirection: 'row',
        borderColor: '#000',
        borderStyle: 'solid',
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: '500',
    },
    tableCol: {
        padding: 5,
        fontSize: 10,
        borderRightWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid',
        textAlign: 'center',
    },
    tableColLast: {
        padding: 5,
        fontSize: 10,
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
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

  return (
    <Document title={`cenova_ponuka_${priceOfferDetails?.customer?.name}`}>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Cenová ponuka</Text>
                <Image src={logo} style={styles.image} alt="cisar_logo" />
            </View>

            <View style={styles.customerInfo}>
                <Text style={styles.subTitle}>Zákazník:</Text>
                <Text style={styles.text}>Meno: {priceOfferDetails?.customer?.name}</Text>
                <Text style={styles.text}>Adresa: {priceOfferDetails?.customer?.city} {priceOfferDetails?.customer?.address}</Text>
                <Text style={styles.text}>PSČ: {priceOfferDetails?.customer?.zip}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.subTitle}>Spracoval:</Text>
                <Text style={styles.text}>{userInfo?.name}</Text>
                <Text style={styles.text}>{userInfo?.city} {userInfo?.address}</Text>
                <Text style={styles.text}>{userInfo?.zip}</Text>
            </View>

            <View style={[styles.section, { flexDirection: 'column', justifyContent: 'flex-end' }]}>
                <Text style={[styles.text, { textAlign: 'right' }]}>
                    Vypracované dňa: {new Date().toLocaleDateString()}
                </Text>
                    <Text style={[styles.text, { textAlign: 'right' }]}>
                    Dátum platnosti: {expirationDate.toLocaleDateString()}
                </Text>
            </View>
            
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={[styles.tableCol, { flex: 1 }]}>Názov položky</Text>
                    <Text style={[styles.tableCol, { width: 60 }]}>Merná jednotka</Text>
                    <Text style={[styles.tableCol, { width: 60 }]}>Množstvo</Text>
                    <Text style={[styles.tableCol, { width: 60 }]}>Cena {priceOfferDetails?.is_vat ? 'bez DPH' : ''}</Text>
                    {
                        priceOfferDetails?.is_vat &&
                            <Text style={[styles.tableCol, { width: 50 }]}>DPH %</Text>
                    }
                    <Text style={[styles.tableColLast, { width: 60 }]}>Spolu {priceOfferDetails?.is_vat ? 'bez DPH' : ''}</Text>
                </View>
                
                {priceOfferDetails?.items?.map((item, index) => {
                    if (item.price < 0) {
                        return;
                    }

                    return (
                        <View key={index} style={index === priceOfferDetails?.items?.length - 1 ? styles.tableRowLast : styles.tableRow}>
                            <Text style={[styles.tableCol, { flex: 1, textAlign: 'left' } ]}>{htmlParser(item.title)}</Text>
                            <Text style={[styles.tableCol, { width: 60 }]}>{item.unit}</Text>
                            <Text style={[styles.tableCol, { width: 60 }]}>{item.quantity}</Text>
                            <Text style={[styles.tableCol, { width: 60 }]}>{Number(item.price)?.round()}</Text>
                            {
                                priceOfferDetails.is_vat && 
                                    <Text style={[styles.tableCol, { width: 50 }]}>{23}</Text>
                            }
                            <Text style={[styles.tableColLast, { width: 60 }]}>{Number(item.total)?.round()}</Text>
                        </View>
                    );
                })}

            </View>

            <View style={styles.footer}>
                {priceOfferDetails?.is_vat && (
                    <View>
                        <View style={styles.footerRow}>
                        <Text style={styles.priceCell}>Základ DPH:</Text>
                        <Text style={[{ width: 'auto' }, styles.priceCell]}>
                            {Number(priceOfferDetails.vatBase)?.round()} €
                        </Text>
                        </View>
                        
                        <View style={styles.footerRow}>
                        <Text style={styles.priceCell}>DPH:</Text>
                        <Text style={[{ width: 'auto' }, styles.priceCell]}>
                            {Number(priceOfferDetails.vat)?.round()} €
                        </Text>
                        </View>

                        <View style={styles.footerRow}>
                            <Text style={styles.priceCell}>Spolu s DPH:</Text>
                            <Text style={[{ width: 'auto' }, styles.priceCell]}>
                                {(priceOfferDetails.total + Math.abs(priceOfferDetails.discount)).round()} €
                            </Text>
                        </View>
                        
                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', marginTop: 5 }} />
                    </View>
                )}

                {priceOfferDetails?.discount < 0 && (
                    <>
                        {priceOfferDetails.items.map((item, index) => {
                            if (item.price >= 0) {
                                return null;
                            }

                            return (
                                <View key={index} style={{...styles.footerRow, marginTop: 5}}>
                                    <Text style={[styles.priceCell, { color: '#cb1819' }]}>{item.title}:</Text>
                                    <Text style={[{ width: 'auto', color: '#cb1819' }, styles.priceCell]}>
                                        {Number(item.price)?.round()} €
                                    </Text>
                                </View>
                            );
                        })}

                        <View style={{ borderBottomWidth: 1, borderBottomColor: '#000', marginTop: 5, marginBottom: 5 }} />
                    </>
                )}  

                <View style={styles.footerRow}>
                    <Text style={styles.totalPriceCell}>Celkom:</Text>
                    <Text style={[{width: 'auto'}, styles.totalPriceCell]}>{Number(priceOfferDetails?.is_vat ? priceOfferDetails?.total : priceOfferDetails?.vatBase)?.round()} €</Text>
                </View>
            </View>
        </Page>
    </Document>
  );
};

export default PdfDocument;

const htmlParser = (taskDescription) => {
  if (!taskDescription) return null;

  const options = {
    replace: (domNode) => {
      if (!domNode.name) return;

      const children = domToReact(domNode.children, options);

      let style = {};

      if (domNode.name === "font" && domNode.attribs?.color) {
        style.color = domNode.attribs.color;
      }

      switch (domNode.name) {
        case "b":
          return (
            <Text key={Math.random()} style={{ fontWeight: "700", ...style }}>
              {children}
            </Text>
          );
        case "i":
          return (
            <Text key={Math.random()} style={{ fontStyle: "italic", ...style }}>
              {children}
            </Text>
          );
        case "font":
          return <Text key={Math.random()} style={style}>{children}</Text>;
        case "br":
          return <Text key={Math.random()}>{'\n'}</Text>;
        default:
          return <Text key={Math.random()}>{children}</Text>;
      }
    },
  };

  return <>{parse(taskDescription, options)}</>;
};

