"use client";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "../../../axios";
import globalAlert from "@/store/alert";

function Certificates() {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [vaccine, setVaccine] = useState("");
  const [pdfContent, setPdfContent] = useState(null);

  const alert = globalAlert((state) => state.alert);
  const setAlert = globalAlert((state) => state.setAlert);

  const getBase64Image = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const base64ToFile = (base64, filename, mime) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new File([byteArray], filename, { type: mime });
};

  const generateCertificate = async () => {
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
    const pdfFile = base64ToFile(pdfBase64, 'certificate.pdf', 'application/pdf'); 
    setPdfContent(pdfBase64);


    const formData = new FormData();
    formData.append("child_id", 87);
    formData.append('certificate', pdfFile);


    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }

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
        } else {
          setAlert({
            alert,
            visible: true,
            message: res.data.message,
            type: "error",
          });
        }
      });
  };

  return (
    <main className="flex flex-col gap-4">
      <Button className="bg-[#212b36] w-[40%]" onClick={generateCertificate}>
        Generate certificate
      </Button>

      <form className="flex flex-col gap-4 justify-center items-center">
        <div className="flex justify-center items-center">
          Name:
          <input
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="border border-black "
          />
        </div>
        <div className="flex justify-center items-center">
          Age:
          <input
            name="age"
            onChange={(e) => setAge(e.target.value)}
            className="border border-black"
          />
        </div>
        <div className="flex justify-center items-center">
          Vaccine:
          <input
            name="vaccine"
            onChange={(e) => setVaccine(e.target.value)}
            className="border border-black"
          />
        </div>
      </form>

      <Dialog
        size="xl"
        open={pdfContent}
        handler={() => {
          setPdfContent(null);
        }}
      >
        <iframe
          src={pdfContent}
          width="100%"
          height="600px"
          frameborder="0"
        ></iframe>
      </Dialog>
    </main>
  );
}
export default Certificates;
