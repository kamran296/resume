// latexGenerator.js

const generateLatexResume = (data) => {
  return `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Important note:
% This template requires the resume.cls file to be in the same directory as the
% .tex file. The resume.cls file provides the resume style used for structuring the
% document.
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

%----------------------------------------------------------------------------------------
%    PACKAGES AND OTHER DOCUMENT CONFIGURATIONS
%----------------------------------------------------------------------------------------

\\documentclass{resume} % Use the custom resume.cls style

\\usepackage[left=0.75in,top=0.6in,right=0.75in,bottom=0.6in]{geometry} % Document margins
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}}
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}
\\name{${data.name}} % Your name
\\address{${data.address}} % Your address
\\address{${data.phone} \\\\ ${data.email}} % Your phone number and email

\\begin{document}

%----------------------------------------------------------------------------------------
%    EDUCATION SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{Education}
${data.education
  .map(
    (edu) => `
{\\bf ${edu.school}} \\hfill {\\em ${edu.startDate} - ${edu.endDate}} 
\\\\ ${edu.degree} \\hfill { GPA: ${edu.gpa} }
\\\\ Course work includes: ${edu.coursework}
\\\\`
  )
  .join("")}
\\end{rSection}

%----------------------------------------------------------------------------------------
%    EXPERIENCE SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{Experience}
${data.experience
  .map(
    (exp) => `
{\\bf ${exp.title}}{, ${exp.institution}} \\hfill {\\em ${exp.startDate} - ${exp.endDate}}
\\\\ ${exp.description}
\\\\`
  )
  .join("")}
\\end{rSection}

%--------------------------------------------------------------------------------
%    PROJECTS
%--------------------------------------------------------------------------------

\\begin{rSection}{Projects}
${data.projects
  .map(
    (proj) => `
{\\bf ${proj.title}}{, ${proj.institution}} \\hfill {\\em ${proj.startDate} - ${proj.endDate}}
\\\\ ${proj.description}
\\\\`
  )
  .join("")}
\\end{rSection}

%--------------------------------------------------------------------------------
%    ACTIVITIES
%--------------------------------------------------------------------------------

\\begin{rSection}{Activities}
${data.activities
  .map(
    (act) => `
{\\bf ${act.title}}{, ${act.institution}} \\hfill {\\em ${act.startDate} - ${act.endDate}}
\\\\ ${act.description}
\\\\`
  )
  .join("")}
\\end{rSection}

%----------------------------------------------------------------------------------------
%    SKILLS SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{Skills}
{\\bf Programming Languages and Frameworks}
\\\\ ${data.skills.programming}
\\\\\\\\
{\\bf Languages}
\\\\ ${data.skills.languages}
\\end{rSection}

%----------------------------------------------------------------------------------------
%    AWARDS AND SCHOLARSHIPS SECTION
%----------------------------------------------------------------------------------------

\\begin{rSection}{Awards and Scholarships}
${data.awards
  .map(
    (award) => `
{\\bf ${award.name}}{, ${award.institution}} \\hfill {\\em ${award.date}}
\\\\ ${award.description}
\\\\`
  )
  .join("")}
\\end{rSection}

\\end{document}
`;
};

module.exports = generateLatexResume;
