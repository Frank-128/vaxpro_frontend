
import axios from '../axios'
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import globalAlert from "@/store/alert";
import {useRouter} from "next/navigation";

export const CertificateGenerator = () =>{

const alert = globalAlert((state) => state.alert);
  const setAlert = globalAlert((state) => state.setAlert);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [name, setName] = useState("DENIS MGAYA");
  const [vaccine, setVaccine] = useState("BCG");

  const base64ToFile = (base64, filename, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mime });
  };

    const generateCertificate = async (card_no,handleGenerate) => {
        setLoading(true);
        const certificate = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          // format: [190, 190],
        });
        var startX = 0;
        var startY = 0;

        const pageWidth = certificate.internal.pageSize.getWidth();
        const pageHeight = certificate.internal.pageSize.getHeight();
        var pageSize = { width: 210, height: 297 };

        const color = "#1e3a8a";
        const fontSizeColoredText = 14;
        const fontSizeNormalText = 12;

        const imageUrl = "images/file.png";
        // const base64Image = await getBase64Image(imageUrl);

        certificate.addImage(imageUrl, "PNG", 100, 20, 18, 20);

        certificate
          .setFillColor(color)
          .setFont("Helvetica", "bold")
          .setFontSize(20)
          .rect(startX, startY, pageWidth, 15, "F")
          .setTextColor("#1e3a8a")
          .text("VACCINATION CERTIFICATE", 60, 50);

        const text = "This is to certify that";
        const textWidth = certificate.getTextWidth(text) + 2;
        certificate
          .setTextColor("black")
          .setFontSize(fontSizeNormalText)
          .setFont("Helvetica", "normal")
          .text(`${text}`, 30, 70);

        const nameWidth = certificate.getTextWidth(name);
        const nameX = textWidth;
        const nameY = 70;
        const underlineY = nameY + 1;
        certificate
          .setFont("Helvetica", "bold")
          .setTextColor(color)
          .setFontSize(fontSizeColoredText)
          .text(`${name}`, nameX, 70)
          .moveTo(nameX, underlineY)
          .lineTo(nameX + nameWidth, underlineY)
          .stroke();

        certificate
          .setFont("Helvetica", "normal")
          .setTextColor("black")
          .setFontSize(fontSizeNormalText)
          .text(
            `has successfully completed the following vaccinations:
    
          `,
            30,
            80
          );

        const vaccineWidth = certificate.getTextWidth(vaccine) + 10;
        certificate
          .setTextColor(color)
          .setFont("Helvetica", "bold")
          .setFontSize(fontSizeColoredText)
          .text(`${vaccine}`, 115, 80)
          .moveTo(115, 81)
          .lineTo(vaccineWidth + 115, 81)
          .stroke();

        const text2 = "Certificate made at";
        const text2Width = certificate.getTextWidth(text2);
        certificate
          .setTextColor("black")
          .setFont("Helvetica", "normal")
          .setFontSize(fontSizeNormalText)
          .text("Certificate made at", 30, 100);

        certificate
          .setTextColor(color)
          .setFont("Helvetica", "bold")
          .setFontSize(fontSizeColoredText)
          .text("Mbeya regional hospital", text2Width + 23, 100)
          .moveTo(66, 101)
          .lineTo(certificate.getTextWidth("Mbeya regional hospital") + 69, 101)
          .stroke();

        // console.log(certificate.getTextWidth("Mbeya regional hospital"));

        certificate
          .setTextColor("black")
          .setFont("Helvetica", "normal")
          .setFontSize(fontSizeNormalText)
          .text("Date:", 150, 100);

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

        certificate
          .setTextColor(color)
          .setFont("Helvetica", "bold")
          .setFontSize(fontSizeColoredText)
          .text(formattedDate, 162, 100)
          .moveTo(162, 101)
          .lineTo(certificate.getTextWidth(formattedDate) + 162, 101)
          .stroke();

        certificate
          .setTextColor("black")
          .setFontSize(12)
          .setFont("", "normal")
          .text("Signature", 30, 135);

        certificate.setFont("", "bold").text("Denis Mgaya", 30, 140);

        certificate.setFont("", "normal").text("Chief Doctor", 30, 145);

        certificate.text("Ministry of health", 30, 180);

        certificate.text("Ministry of health", 162, 180);

        const pdfBase64 = certificate.output("datauristring").split(",")[1];
        const pdfFile = base64ToFile(
          pdfBase64,
          "certificate.pdf",
          "application/pdf"
        );
        // setPdfContent(pdfBase64);

        const formData = new FormData();
        formData.append("child_id", card_no);
        formData.append("certificate", pdfFile);

        for (let pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        setTimeout(() => {
          axios
            .post("certificates", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.status) {
                setAlert({
                  alert,
                  visible: true,
                  message: res.data.message,
                  type: "success",
                });

                setLoading(false);
              } else {
                setAlert({
                  alert,
                  visible: true,
                  message: res.data.message,
                  type: "error",
                });
                setLoading(false);
              }
            });
        }, [3000]);

        // setLoading(false);

        handleGenerate();

    };

      return {generateCertificate, loading, setLoading};
}
