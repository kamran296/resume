import React, { useState } from "react";

const PDFPreview = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          email: "johndoe@example.com",
          // Add more form data as needed
        }),
      });

      const data = await response.json();

      if (data.pdf) {
        // Convert the base64 string back into a Blob
        const binaryData = atob(data.pdf);
        // console.log(binaryData, 123);
        const byteNumbers = new Uint8Array(binaryData.length);
        console.log(byteNumbers, 123);
        for (let i = 0; i < binaryData.length; i++) {
          byteNumbers[i] = binaryData.charCodeAt(i);
          console.log(byteNumbers[i], 123);
        }
        const blob = new Blob([byteNumbers], { type: "application/pdf" });

        // Create an object URL from the Blob
        const url = URL.createObjectURL(blob);

        // Set the PDF URL to the state
        setPdfUrl(url);
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      {pdfUrl && (
        <iframe
          src={`${pdfUrl}#toolbar=0`}
          width="50%"
          height="600px"
          className="bg-yellow-400"
        />
      )}
    </div>
  );
};

export default PDFPreview;
