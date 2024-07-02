import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol1: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
    tableCol2: {
      width: '30%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCol3: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol4: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol5: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol6: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
    tableCell: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 10,
    },
  });

  const ReportPdf = ({reportData,title}) => {

    return (

    <Document>
      <Page size="A4" style={{ padding: 10 }}>

      <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{title}</Text>
            </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>No</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>Description</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>Male</Text>
            </View>
            <View style={styles.tableCol5}>
              <Text style={styles.tableCell}>Female</Text>
            </View>
            <View style={styles.tableCol6}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
          </View>
        { reportData?.map((item,index)=>
             <View key={index} style={styles.tableRow}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableCell}>{item.No}</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>{item.Description}</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>{item.Dose}</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableCell}>{item.Male}</Text>
            </View>
            <View style={styles.tableCol5}>
              <Text style={styles.tableCell}>{item.Female}</Text>
            </View>
            <View style={styles.tableCol6}>
              <Text style={styles.tableCell}>{item.Total}</Text>
            </View>
          </View>)}
        </View>
      </Page>
    </Document>)}



export default ReportPdf



