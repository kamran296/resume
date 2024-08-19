const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
exports.compileLatex = (filePath, name) => {
  return new Promise((resolve, reject) => {
    const command = `pdflatex -output-directory=${path.dirname(
      filePath
    )} ${filePath}`;
    console.log("inside the complire ", name);
    exec(`pdflatex ${name}.tex`, (error, stdout, stderr) => {
      console.log("converting...");
      if (error) {
        console.error(`Error: ${stderr}`);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });

    // exec(`pdflatex resume.tex`, (err, stdout, stderr) => {
    //   console.log("converting..");
    //   if (err) {
    //     console.error("Error compiling LaTeX:", stderr);
    //     return res.status(500).send("Error generating resume");
    //   }
    //   const pdfFilePath = path.join(__dirname, `resume.pdf`);
    //   console.log(pdfFilePath);
    //   console.log("PDF File Path:", pdfFilePath);
    //   fs.access(pdfFilePath, fs.constants.F_OK, (err) => {
    //     if (err) {
    //       console.error("PDF file does not exist:", err);
    //       return res.status(500).send("Error generating resume");
    //     }

    //     res.sendFile(pdfFilePath, (err) => {
    //       if (err) {
    //         console.error("Error sending file:", err);
    //         res.status(err.status).end();
    //       }
    //     });
    //   });
    //   //   return res.json("Done.");
    //   return res.download(pdfFilePath);
    // });
  });
};
