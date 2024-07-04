import {
  Document,
  Image,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import globalUser from "@/store/user";

export const CertificateGenerator = () => {

  const loggedInUser = globalUser((state) => state.loggedInUser);
  const generateCertificate = async (
    card_no,
    firstname,
    middlename,
    surname
  ) => {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    const pdfContent = (
      <Document>
        <Page style={styles.page} size={{ width: 595.28, height: 600 }}>
          <View style={styles.section}></View>
          <View style={styles.backgroundSection}></View>
          <View style={styles.contentSection}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                alt={"Tanzania logo"}
                src={"/images/file.png"}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { fontFamily: "Helvetica" }]}>
                VACCINATION CERTIFICATE
              </Text>
            </View>
            <View style={styles.contentSectionExceptTitleAndImage}>
              <View style={styles.textContainer1}>
                <Text style={styles.text}>This is to certify that</Text>
                <Text style={[styles.importantText, styles.underlinedText]}>
                  {firstname} {middlename} {surname}
                </Text>
                <Text>,</Text>
              </View>

              <View style={styles.sectionWithStatementAndVaccines}>
                <Text style={styles.text}>
                  has successfully completed the following vaccinations:
                </Text>
                <Text
                  style={[
                    styles.importantText,
                    styles.underlinedText,
                    styles.sectionWithVaccines,
                  ]}
                >
                  BCG, OPV, MR1, MR2
                </Text>
              </View>

              <View style={styles.textContainer3}>
                <View style={styles.sectionWithStatementAndHospital}>
                  <Text style={styles.text}>Certificate made at </Text>
                  <Text style={[styles.importantText, styles.underlinedText]}>
                    {loggedInUser.facilities?.facility_name}
                  </Text>
                </View>
                <View style={styles.textContainer1}>
                  <Text style={styles.text}>Date:</Text>
                  <Text style={[styles.importantText, styles.underlinedText]}>
                    {formattedDate}
                  </Text>
                </View>
              </View>

              <View style={styles.sectionWithSignatureNameAndPosition}>
                <Text style={styles.text}>Signature</Text>
                <Text
                  style={[
                    styles.importantText,
                    styles.underlinedText,
                    styles.sectionWithNameOfTheOneWhoSignCertificate,
                  ]}
                >
                  Denis Mgaya
                </Text>
                <Text style={styles.text}>Chief Doctor</Text>
              </View>

              <View style={styles.sectionWithMinistry}>
                <Text style={styles.text}>Ministry of health office</Text>
                <Text style={styles.text}>Ministry of health</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(pdfContent).toBlob();

    const formData = new FormData();
    formData.append("child_id", card_no);
    formData.append("certificate", blob, "certificate.pdf");

    return formData;
  };

  return { generateCertificate };

};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
  },
  section: {
    backgroundColor: "#1e3a8a",
    height: "42px",
  },
  imageContainer: {
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#1e3a8a",
    fontWeight: "800px",
    fontSize: "20px",
  },
  contentSection: {
    paddingHorizontal: 40,
  },

  contentSectionExceptTitleAndImage: {
    marginTop: 20,
    flexDirection: "column", // justifyContent:"space-around",
    gap: 28,
    height: "70%",
    // , backgroundColor:'yellow'
  },

  sectionWithStatementAndVaccines: {
    flexDirection: "column",
    gap: 4,
  },

  sectionWithVaccines: {
    marginLeft: 280,
    marginRight: 75,
  },

  sectionWithStatementAndHospital: {
    flexDirection: "row",
  },
  sectionWithNameOfTheOneWhoSignCertificate: {
    width: 96,
    marginHorizontal: 0,
  },
  sectionWithMinistry: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionWithSignatureNameAndPosition: {
    flexDirection: "column",
    gap: 6,
    width: 84,
  },

  backgroundSection: {
    position: "absolute",
    top: 540,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1e3a8a",
  },

  textContainer: {
    marginTop: 20,
    flexDirection: "column",
  },
  textContainer1: {
    flexDirection: "row",
  },
  textContainer3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: "14px",
  },

  importantText: {
    fontSize: "16px",
    color: "#1e3a8a",
    marginHorizontal: 6,
  },
  underlinedText: {
    borderBottomWidth: 1,
    borderBottomColor: "#1e3a8a", // paddingBottom: 1,
  },
});
