const fs = require("fs");
const moment = require("moment");
const puppeteer = require("puppeteer");
const { css } = require("./cssString");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const mockData = {
  last_edit: {
    date: "January 15th 2022, 10:44 am",
    user: {
      projects: [],
      _id: "63caf2f8a1bceeb182ad7ca4",
      email: "any@email.com",
      first_name: "Mark",
      is_active: "false",
      last_name: "Cuban",
      phone: "123-456-7890",
      user_name: "marcub",
    },
  },
  client: {
    logo: {
      public_id: "budgetApp/jcncif0sfywygptmypik",
      url: "https://res.cloudinary.com/sidstore/image/upload/v1680461526/budgetApp/jcncif0sfywygptmypik.jpg",
    },
    name: "marko",
  },
  company_logo: {
    url: "https://res.cloudinary.com/sidstore/image/upload/v1680459186/budgetApp/nhpsbpj3ndnzxifjdbmi.jpg",
    public_id: "budgetApp/nhpsbpj3ndnzxifjdbmi",
  },
  _id: "63c6f48fa1bceeb182ad7c94",
  created_by: {
    projects: [],
    _id: "63caf2f8a1bceeb182ad7ca4",
    email: "any@email.com",
    first_name: "Mark",
    is_active: "false",
    last_name: "Cuban",
    phone: "123-456-7890",
    user_name: "marcub",
  },
  title: "Hit-Boy",
  time_stamp: "January 15th 2022, 10:44 am",
  editors: [
    {
      _id: "63caf2f8a1bceeb182ad7ca4",
    },
  ],
  sections: [
    {
      title: "asdf",
      line_items: [
        {
          title: "Cam",
          days: 5,
          rate: 10,
          entities: 5,
          estimate: 250,
          _id: "641f245151e783742a0dfad1",
        },
        {
          title: "Cam",
          days: 1,
          rate: 1000,
          entities: 15,
          estimate: 15000,
          _id: "641f241651e783742a0df92b",
        },
        {
          title: "Newk",
          days: 100,
          rate: 200,
          entities: 15,
          estimate: 300000,
          _id: "6411f5a57820826f0175cd0d",
        },
        {
          title: "Newk",
          days: 100,
          rate: 200,
          entities: 10,
          estimate: 200000,
          _id: "6411f5b67820826f0175cd5d",
          __v: 0,
        },
        {
          title: "Nick",
          days: 5,
          rate: 6,
          entities: 2,
          estimate: 60,
          _id: "6411f665c3c0a47693be0f21",
          __v: 0,
        },
      ],
      _id: "63eaab9b67c88b2279e2489a",
    },
    {
      title: "baller",
      line_items: [
        {
          title: "test",
          days: 5,
          rate: 5,
          entities: 5,
          estimate: 125,
          _id: "63f6c4355e8358c0b10191f9",
          __v: 0,
        },
      ],
      _id: "63eaaea8b06abb9edfaa7515",
    },
    {
      title: "Holla",
      line_items: [
        {
          title: "shush",
          days: 4,
          rate: 50,
          entities: 4,
          estimate: 800,
          _id: "64121b28cd97c71e5a7af288",
          __v: 0,
        },
      ],
      _id: "63eab06ab06abb9edfaa7545",
    },
    {
      title: "asdfg",
      line_items: [],
      _id: "63eab114b06abb9edfaa7553",
    },
    {
      title: "asdf",
      line_items: [],
      _id: "63eab1b5b06abb9edfaa755b",
    },
    {
      title: "asdfs",
      line_items: [],
      _id: "63eab1cdb06abb9edfaa7564",
    },
    {
      title: "test",
      line_items: [],
      _id: "63eab230b06abb9edfaa7584",
    },
    {
      title: "asdf",
      line_items: [],
      _id: "63eab296ac13867c7268a304",
    },
    {
      title: "test2",
      line_items: [],
      _id: "63eab69c7ef5750bc5a57965",
    },
    {
      title: "test2",
      line_items: [],
      _id: "63eab772bb5848ceec2672fd",
    },
    {
      title: "cool",
      line_items: [],
      _id: "63ec0cc0c16036fcc12fd11e",
    },
    {
      title: "mark",
      line_items: [],
      _id: "63ec1150c16036fcc12fd12d",
    },
    {
      title: "asdf",
      line_items: [],
      _id: "63ec12b4e1adbda695f614b7",
    },
    {
      title: "zzzz",
      line_items: [],
      _id: "63ec157441ddc5cb34ac808d",
    },
    {
      title: "nun",
      line_items: [],
      _id: "63ec15aa84fa9cc833ae887e",
    },
    {
      title: "nothing",
      line_items: [],
      _id: "63ec15f608336cac7246b801",
    },
    {
      title: "miek",
      line_items: [],
      _id: "63ec164026b82131f6994a68",
    },
    {
      title: "as",
      line_items: [],
      _id: "63ec17181fae713e7cc5c086",
    },
    {
      title: "butt",
      line_items: [],
      _id: "63ec23c5df11886517554d66",
    },
  ],
  codirector: "HH",
  delivery_format: "Digital",
  director: "HH",
  executive_producer: ["HH"],
  location: "LA",
  shooting_format: "Digital",
  type: "Music Video",
  notes: [],
};

async function generateCsv() {
  const csvWriter = createCsvWriter({
    path: "output.csv",
    header: [
      { id: "sectionTitle", title: "SECTION" },
      { id: "itemTitle", title: "ITEM" },
      { id: "days", title: "DAYS" },
      { id: "rate", title: "RATE" },
      { id: "entities", title: "ENTITIES" },
      { id: "estimate", title: "ESTIMATE" },
    ],
  });

  const records = [];

  mockData.sections.forEach((section) => {
    section.line_items.forEach((item) => {
      records.push({
        sectionTitle: section.title,
        itemTitle: item.title,
        days: item.days,
        rate: item.rate,
        entities: item.entities,
        estimate: item.estimate,
      });
    });
  });

  await csvWriter.writeRecords(records);
}

function createHeader(pageType) {
  const projectTitle = mockData.title;
  const clientName = mockData.client.name;
  const projectType = mockData.type;
  const projectLocation = mockData.location;
  const projectDate = moment().format("MMMM Do, YYYY");
  const topLeftHeaderString = `${projectTitle} // ${projectType} // ${projectLocation}`;
  const bottomLeftHeaderString =
    pageType === "summary" ? "Cost Summary" : projectTitle;
  const bottomRightHeaderString =
    pageType === "summary" &&
    `${projectTitle} - ${clientName} | Job Number ###`;
  const topRightHeaderString = projectDate;

  const htmlString = `<header class="main-header">
<div class="main-header__left">
  <div class="main-header__info-1">${topLeftHeaderString}</div>
  <div class="main-header__info-2">${bottomLeftHeaderString}</div>
</div>
<div class="main-header__right">
  <div class="main-header__info-3">
  ${topRightHeaderString}
  </div>
  <div class="main-header__info-4">
    ${bottomRightHeaderString}
  </div>
</div>
</header>`;

  return htmlString;
}

function createHero() {
  const teamLogo = mockData.company_logo.url;
  const clientLogo = mockData.client.logo.url;

  const htmlString = `
  <section class="hero">
  <div class="hero__team-section">
    <div class="hero__team-logo">
      <img height="40" src="${teamLogo}" alt="" srcset="" />
      <!-- <img> here -->
    </div>
    <div class="hero__team-roles">
      <div class="hero__team-titles">
      <div class="role">Executive Producer:</div>
      <div class="role">Executive Producer:</div>
      <div class="role">Director:</div>
      <div class="role">Co-Director:</div>
      </div>
      <div class="hero__team-names">
      <div class="names">Patrick Koi</div>
      <div class="names">ThirdEye</div>
      <div class="names">HalfTime Huey</div>
      <div class="names">HH</div>
      </div>
    </div>
  </div>
  <div class="hero__client-section">
    <div class="hero__client-logo">
      <img height="40" src="${clientLogo}" alt="" srcset="" />

      <!-- <img> here -->
    </div>
    <div class="hero__client-days"></div>
  </div>
</section>`;
  return htmlString;
}

function createSubHero() {
  const shooting_format = mockData.shooting_format.toUpperCase();
  const delivery_format = mockData.delivery_format.toUpperCase();
  const ot = mockData?.ot || "";
  const delivery_date = mockData?.delivery_date || "";
  const shooting_dates = mockData?.shooting_dates || "";

  const htmlString = `
  <section class="project-info">
  <div class="project-info__field-1"> 
    <span>OT based on: </span>
    <span class="ot">${ot}</span>
  </div>
  <div class="project-info__field-2">
    <span>Shooting Format: </span>
    <span class="shooting-format">${shooting_format}</span>
  </div>
  <div class="project-info__field-3">
    <span>Delivery Format: </span>
    <span class="delivery-format">${delivery_format}</span>
  </div>
  <div class="project-info__field-4">
    <span>Delivery Date: </span>
    <span class="delivery-date">${delivery_date}</span>
  </div>
  <div class="project-info__field-5">
    <span>Shooting Dates: </span>
    <span class="shooting-dates">${shooting_dates}</span>
  </div>
</section>
  `;
  return htmlString;
}

function createCostSummaryTable() {
  const rows = createCostSummaryRows();
  console.log(createCostSummaryRows());
  const htmlString = `
  <section class="cost-summary">
    <table class="cost-summary__table">
    ${createCostSummaryHeaderRow()} 
    <tbody>
      ${rows}
      </tbody>
      ${createCostSummaryFooter()}
      </table>
  </section>
  `;
  return htmlString;
}
function createCostSummaryHeaderRow() {
  const htmlString = `
  <thead class="cost-summary__table-head">
    <tr class="cost-summary__table-head-row">
      <th class="cost-summary__table-text" align="left" colspan="4">
        Estimated Cost Summary
      </th>
      <th class="cost-summary__table-text" align="right">
        Bid Totals
      </th>
      <th class="cost-summary__table-text" align="right"></th>
    </tr>
  </thead>`;

  return htmlString;
}

const letters = "abcdefghijklmnopqrstuvwxyz";
const totals = (section) => {
  let acc = 0;

  const totals = section.line_items.reduce((prev, current, i) => {
    console.log(prev, current.estimate, i, acc);
    acc = prev + Number(current.estimate);
    return acc;
  }, acc);

  return totals;
};

const totalDays = (section) => {
  let acc = 0;

  const totals = section.line_items.reduce((prev, current, i) => {
    console.log(prev, current.estimate, i, acc);
    acc = prev + Number(current.days);
    return acc;
  }, acc);

  return totals;
};

const totalEntities = (section) => {
  let acc = 0;

  const totals = section.line_items.reduce((prev, current, i) => {
    console.log(prev, current.estimate, i, acc);
    acc = prev + Number(current.entities);
    return acc;
  }, acc);

  return totals;
};
function createCostSummaryRows(params) {
  let acc = 0;

  const rows = mockData.sections.map((section, i) => {
    return (
      section.title &&
      `<tr class="row"><td class="cell col-1">${i + 1}</td>
    <td class="cell col-2" align="left">${section.title}</td>
    <td class="cell col-3" align="left"></td>
    <td class="cell col-4">${letters[i].toUpperCase()}</td>
    <td class="cell col-5" align="right">${totals(section, acc)}</td>
    <td class="cell col-6"></td>
  </tr>`
    );
  });

  return rows.join("");
}

function createCostSummaryFooter(params) {
  const htmlString = `
  <tfoot class="cost-summary__table-footer">
  <tr class="row-total">
    <th class="contract-total" colspan="2" scope="row" align="left">
      Contracted Total: ####
    </th>
    <th colspan="2" class="grand-total" align="right">
      Grand Total
    </th>
    <td class="total" align="right">####</td>
    <td></td>
  </tr>
</tfoot>
`;
  return htmlString;
}

function createNotesSection() {
  const notesHead = `<thead class="notes-table__head">
<!-- colspan value needs to be notes.length  -->
<th align="left" colspan="2" class="notes-table__head-text">
  Notes
</th>
</thead>`;

  const notesTable1 = `
<table class="notes-table-1">
<tbody>
  <thead>
    <th
      align="left"
      scope="row"
      class="notes-table__cell-head"
    >
      HEADER
    </th>
  </thead>
  <tr class="notes-table__row">
    <td class="notes-table__cell">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      At esse aspernatur necessitatibus molestias nulla sunt
      autem pariatur incidunt dignissimos nostrum, doloremque
      quod a reiciendis ipsa. Dolorum necessitatibus aliquid
      perferendis quaerat.
    </td>
  </tr>
</tbody>
</table>
<table class="notes-table-2">
<tbody>
  <thead>
    <th
      align="left"
      scope="row"
      class="notes-table__cell-head"
    >
      HEADER
    </th>
  </thead>
  <tr class="notes-table__row">
    <td class="notes-table__cell">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      At esse aspernatur necessitatibus molestias nulla sunt
      autem pariatur incidunt dignissimos nostrum, doloremque
      quod a reiciendis ipsa. Dolorum necessitatibus aliquid
      perferendis quaerat.
    </td>
  </tr>
</tbody>
</table>
`;

  const htmlString = `
  <section class="notes">
  <table class="notes-table">
${notesHead}
    <tbody>
      <td>
${notesTable1}
      </td>
      <td>
        <table class="notes-table-3">
          <tbody>
            <thead>
              <th
                align="left"
                scope="row"
                class="notes-table__cell-head"
              >
                HEADER
              </th>
            </thead>
            <tr class="notes-table__row">
              <td class="notes-table__cell">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                At esse aspernatur necessitatibus molestias nulla sunt
                autem pariatur incidunt dignissimos nostrum, doloremque
                quod a reiciendis ipsa. Dolorum necessitatibus aliquid
                perferendis quaerat.
              </td>
            </tr>
          </tbody>
        </table>
        <table class="notes-table-3">
          <tbody>
            <thead>
              <th
                align="left"
                scope="row"
                class="notes-table__cell-head"
              >
                HEADER
              </th>
            </thead>
            <tr class="notes-table__row">
              <td class="notes-table__cell">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                At esse aspernatur necessitatibus molestias nulla sunt
                autem pariatur incidunt dignissimos nostrum, doloremque
                quod a reiciendis ipsa. Dolorum necessitatibus aliquid
                perferendis quaerat.
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tbody>
  </table></section>`;

  return htmlString.trim().replace(" ", "");
}

function createSectionPages() {
  const projectTitle = mockData.title;
  const clientName = mockData.client.name;
  const projectType = mockData.type;
  const projectLocation = mockData.location;
  const projectDate = moment().format("MMMM Do, YYYY");
  const topLeftHeaderString = `${projectTitle} // ${projectType} // ${projectLocation}`;

  const pages = mockData.sections.map((section, i) => {
    const sectionIndex = i + 1;
    const sectionLetter = letters[i];
    const sectionTitle = section.title;
    const headerString = `
  <header class="page-header">
  <div class="page-header__left">
    <div class="page-header__info-1">${topLeftHeaderString}</div>
    <div class="page-header__info-2">${projectTitle} ####</div>
  </div>
  <div class="page-header__right">
    <!-- section index and letter -->
    <div class="page-header__info-3">Page ${sectionIndex}${sectionLetter}</div>
  </div>
</header>
  `;
    const sectionRows = section.line_items.map((item, i) => {
      const title = item.title;
      const entities = item.entities;
      const days = item.days;
      const rate = item.rate;
      const estimate = item.estimate;

      const htmlString = `
 <tr class="section-table__row">
 <td align="center" class="section-table__cell index">
   <!-- line item index -->
   ${i + 1}
 </td>
 <td class="section-table__cell title">
   <!-- line item title -->
   ${title}
 </td>
 <td align="right" class="section-table__cell entities">
   <!-- line item entities -->
   ${entities}
 </td>
 <td align="right" class="section-table__cell days">
   <!-- line item days -->
   ${days}
 </td>
 <td align="right" class="section-table__cell rate">
   <!-- line item rate -->
   ${rate}
 </td>
 <td align="right" class="section-table__cell 1.5">
   <!-- line item overtime 1.5 -->
 </td>
 <td align="right" class="section-table__cell 2.5">
   <!-- line item overtime 2.5 -->
 </td>
 <td align="right" class="section-table__cell estimate">
   <!-- line item estimate -->
   ${estimate}
 </td>
</tr>
 `;
      return htmlString;
    });

    const tableHead = `
  <thead>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th colspan="2" class="section-table__header-6">Overtime</th>
    <th></th>
  </tr>
  <tr>
    <th class="section-table__header-1">
      <!-- Section Letter -->
      ${sectionLetter}
    </th>
    <th align="left" class="section-table__header-2">
      <!-- Section Title -->
      ${sectionTitle}
    </th>
    <th class="section-table__header-3">No</th>
    <th class="section-table__header-4">Days</th>
    <th class="section-table__header-5">Rate</th>
    <th class="section-table__header-6">1.5</th>
    <th class="section-table__header-7">2.5</th>
    <th class="section-table__header-8">Estimate</th>
  </tr>
</thead>
  `;
    const tableFooter = `
  <tr class="section-table__footer-row">
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td align="right" class="section-table__footer-cell">
  ${totalEntities(section)}
  </td>
  <td align="right" class="section-table__footer-cell">
  ${totalDays(section)}
  </td>
  <th
    align="right"
    scope="row"
    colspan="3"
    class="section-table__footer-cell"
  >
    Subtotal
  </th>
  <td align="right" class="section-table__footer-cell">
  ${totals(section)}
  </td>
  </tr>
  <tr class="section-table__footer-row">
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <th
    align="right"
    scope="row"
    colspan="3"
    class="section-table__footer-cell"
  >
    P&W
  </th>
  <td align="right" class="section-table__footer-cell"></td>
  </tr>
  <tr class="section-table__footer-row">
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <th
    align="right"
    scope="row"
    colspan="3"
    class="section-table__footer-cell"
  >
    Fringe 2
  </th>
  <td align="right" class="section-table__footer-cell"></td>
  </tr>
  <tr class="section-table__footer-row">
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <td class="section-table__footer-cell empty"></td>
  <th
    align="right"
    scope="row"
    colspan="3"
    class="section-table__footer-cell"
  >
    <!-- section index letter -->
    Bid Total ${sectionLetter.toUpperCase()}
  </th>
  <td align="right" class="section-table__footer-cell">${totals(section)}</td>
  </tr>
`;

    const htmlString = `
  <div class="page">
    <div class="section">
    ${headerString}
      <section class="section-table__wrapper">
      <table class="section-table">
      ${tableHead}
      <tbody>
${sectionRows.join("")}
      </tbody>
      <tfoot>
${tableFooter}
      </tfoot>
        </table>
      </section>
    </div>
  </div>
  `;
    return htmlString;
  });

  return pages.join("");
}

async function generatePdf() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const content = fs.readFileSync("output.csv", "utf8");

  const htmlContent = `
    <html>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div class="page">
          <main class="cost-summary-page">
            ${createHeader("summary")}
              <div class="border">
                ${createHero()}
                ${createSubHero()}
                ${createCostSummaryTable()}
                ${createNotesSection()}
              </div>
          </main>
        </div>
${createSectionPages()}
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  await page.emulateMediaType("screen");
  await page.pdf({
    path: "output.pdf",
    format: "letter",
    printBackground: true,
  });

  await browser.close();
}

(async () => {
  // await generateCsv();
  await generatePdf();
})();
