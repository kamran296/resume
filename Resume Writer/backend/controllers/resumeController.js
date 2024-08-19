const fs = require("fs");
const path = require("path");
const { compileLatex } = require("../utils/compileLatex");

const isSectionFilled = (section) => {
  return section.some((item) =>
    Object.values(item).some((value) => value && value.trim() !== "")
  );
};

const generateLatexDocument = (data) => {
  let latexContent = `
    \\documentclass{resume}
    \\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry}
    \\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}}
    \\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
    \\name{${data.personalInfo.Name || ""}} 
    \\address{${data.personalInfo.Address || ""}} 
    \\address{${data.personalInfo.Phone || ""} \\\\ ${
    data.personalInfo.Email || ""
  }}

    \\begin{document}
  `;

  if (data.education && isSectionFilled(data.education)) {
    latexContent += `
      \\begin{rSection}{Education}
    `;
    data.education.forEach((edu) => {
      latexContent += `
        \\textbf{${edu.University_Name || ""}} \\hfill ${
        edu.Graduation_Date || ""
      }
        \\\\ ${edu.Degree || ""}
        \\\\ ${edu.Department || ""}
        \\vspace{1ex}
      `;
    });
    latexContent += `
      \\end{rSection}
    `;
  }

  if (data.work && isSectionFilled(data.work)) {
    latexContent += `
      \\begin{rSection}{Work Experience}
    `;
    data.work.forEach((work) => {
      latexContent += `
        \\begin{rSubsection}{${work.Company || ""}}{${work.Date || ""}}{${
        work.Title || ""
      }}{}
        \\item ${work.Description || ""}
        \\end{rSubsection}
      `;
    });
    latexContent += `
      \\end{rSection}
    `;
  }

  if (data.projects && isSectionFilled(data.projects)) {
    latexContent += `
      \\begin{rSection}{Projects}
    `;
    data.projects.forEach((project) => {
      latexContent += `
        \\begin{rSubsection}{${project.ProjectTitle || ""}}{${
        project.Year || ""
      }}{${project.Role || ""}}{${project.Location || ""}}
        \\item ${project.Description || ""}
        \\end{rSubsection}
      `;
    });
    latexContent += `
      \\end{rSection}
    `;
  }

  if (data.skills && isSectionFilled(data.skills)) {
    latexContent += `
      \\begin{rSection}{Skills}
    `;
    data.skills.forEach((skill) => {
      latexContent += `
        \\textbf{${skill.TITLE || ""}}
        \\vspace{0.5em}
        ${skill.Skills || ""}
        \\vspace{1ex}
      `;
    });
    latexContent += `
      \\end{rSection}
    `;
  }

  if (data.extra && isSectionFilled(data.extra)) {
    latexContent += `
      \\begin{rSection}{Extra-Curricular Activities}
    `;
    data.extra.forEach((activity) => {
      latexContent += `
        \\textbf{${activity.Title || ""}}
        ${activity.Description || ""}
      `;
    });
    latexContent += `
      \\end{rSection}
    `;
  }

  latexContent += `
    \\end{document}
  `;

  return latexContent;
};

exports.generateResume = async (req, res) => {
  const data = req.body;
  console.log("datad", data);
  const latexContent = generateLatexDocument(data);

  const firstName = data.personalInfo.Name.split(" ")[0];
  const resumePath = path.join(__dirname, `../${firstName}.tex`);
  fs.writeFileSync(resumePath, latexContent);

  try {
    await compileLatex(resumePath, firstName);

    const pdfPath = path.join(__dirname, `../${firstName}.pdf`);
    const logPath = path.join(__dirname, `../${firstName}.log`);
    const auxPath = path.join(__dirname, `../${firstName}.aux`);

    const pdfBuffer = fs.readFileSync(pdfPath);

    const base64PDF = pdfBuffer.toString("base64");
    res.json({ pdf: base64PDF });

    // Wait until the response is fully sent
    res.on("finish", () => {
      // Delete the files asynchronously
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error(`Error deleting PDF file: ${err}`);
        } else {
          console.log(`PDF file ${pdfPath} deleted successfully.`);
        }
      });
      fs.unlink(logPath, (err) => {
        if (err) {
          console.error(`Error deleting log file: ${err}`);
        } else {
          console.log(`log file ${pdfPath} deleted successfully.`);
        }
      });
      fs.unlink(auxPath, (err) => {
        if (err) {
          console.error(`Error deleting aux file: ${err}`);
        } else {
          console.log(`aux file ${pdfPath} deleted successfully.`);
        }
      });

      fs.unlink(resumePath, (err) => {
        if (err) {
          console.error(`Error deleting resume file: ${err}`);
        } else {
          console.log(`Resume file ${resumePath} deleted successfully.`);
        }
      });
    });
  } catch (error) {
    console.error("Error compiling LaTeX document", error);
    res.status(500).send("Error compiling LaTeX document");
  }
};
