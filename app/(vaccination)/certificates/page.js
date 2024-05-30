"use client";
import { Button, Dialog } from "@material-tailwind/react";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "../../../axios";
import globalAlert from "@/store/alert";
import { CertificateGenerator } from "@/constants/certificate_generator";

function Certificates() {
  const {loading, generateCertificate, setLoading} = CertificateGenerator();


  return (
    <main className="flex flex-col gap-4">
      <Button
        ripple={false}
        loading={loading}
        className="bg-[#212b36] shadow-none rounded-sm w-[40%] flex justify-center items-center"
        onClick={() => {
          generateCertificate();
          setLoading(true);
        }}
      >
        {loading ? "Generating certificate" : "Generate certificate"}
      </Button>

     ``
      {/* <Dialog
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
      </Dialog> */}
    </main>
  );
}
export default Certificates;
