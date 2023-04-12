const css = `
body {
    padding: 0;
    margin: 0;
    font-family: "Inter", sans-serif;
    font-size: 10px;
    font-weight: normal;
  }
  
  section {
    margin-bottom: 2px;
  }
  
  .cost-summary-page {
    padding: 0px 96px;
  }
  
  .border {
    border: 1px solid black;
  }
  
  .main-header {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .main-header__info-1 {
    font-size: 10px;
    font-weight: bold;
  }
  .main-header__info-2 {
    font-size: 12px;
    font-weight: bolder;
  }
  .main-header__info-3 {
    font-size: 10px;
    font-weight: normal;
    text-align: end;
  }
  .main-header__info-4 {
    font-size: 10px;
    font-weight: bold;
    text-align: end;
  }
  
  .page-header {
    width: 100%;
    height: 72px;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }
  .page-header__info-1 {
    font-size: 10px;
    font-weight: bold;
  }
  .page-header__info-2 {
    font-size: 12px;
    font-weight: bolder;
  }
  .page-header__info-3 {
    font-size: 10px;
    font-weight: normal;
    font-weight: 600;
    text-align: end;
  }
  
  .hero {
    width: 100%;
    height: 176px;
    display: flex;
    border-bottom: 1px solid black;
  }
  .hero__team-roles {
    display: flex;
    padding: 10px 16px 0px 34px;
  }
  .hero__team-titles {
    text-align: end;
  }
  .hero__team-section {
    width: 50%;
  }
  .hero__client-section {
    width: 50%;
    border-left: 1px solid black;
  }
  .hero__team-logo, .hero__client-logo {
    padding: 30px 34px;
    display: flex;
    justify-content: center;
  }
  .hero__client-days {
    height: 76;
    border-top: 1px solid black;
  }
  
  .project-info {
    height: 26px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    padding-left: 40px;
    padding-top: 2px;
  }
  .project-info > div {
    width: 33%;
  }
  .project-info .ot {
    border: 1px solid black;
    padding: 0 8px;
  }
  .project-info .shooting-format {
    border: 1px solid black;
    padding: 0 24px 0 4px;
  }
  .project-info .delivery-format {
    border: 1px solid black;
    padding: 0 24px 0 4px;
  }
  
  .page {
    width: 816px;
    height: 1054px;
    -moz-column-break-inside: avoid;
         break-inside: avoid;
  }
  .page .section {
    padding: 0px 96px;
  }
  
  .section-table {
    width: 100%;
    border-top: 1px solid black;
    border-collapse: collapse;
  }
  .section-table__wrapper {
    width: 100%;
  }
  .section-table__wrapper td {
    font-size: 10px;
  }
  .section-table thead th {
    border-right: 1px solid black;
    border-left: 1px solid black;
    font-size: 10px;
  }
  .section-table__header-1 {
    color: blue;
    text-transform: capitalize;
    width: 24px;
  }
  .section-table__header-3 {
    width: 34px;
  }
  .section-table__header-4 {
    width: 34px;
  }
  .section-table__header-5 {
    width: 34px;
  }
  .section-table__header-6 {
    width: 34px;
  }
  .section-table__header-7 {
    width: 34px;
  }
  .section-table__header-8 {
    width: 68px;
  }
  .section-table__row {
    border-top: 1px solid black;
  }
  .section-table__cell {
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 10px;
  }
  .section-table__cell.index {
    font-weight: 600;
    text-transform: capitalize;
    font-size: 10px;
  }
  .section-table__footer th {
    font-size: 10px;
  }
  .section-table__footer-cell {
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    font-size: 10px;
  }
  .section-table__footer-cell.empty {
    border: none;
  }
  .cost-summary__table {
    width: 100%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    border-collapse: collapse;
  }
  .cost-summary__table-text {
    font-size: 10px;
    font-weight: bold;
  }
  .cost-summary__table-text:nth-of-type(1), .cost-summary__table-text:nth-of-type(2) {
    border-right: 1px solid black;
  }
  .cost-summary__table-text:nth-of-type(2) {
    width: 122px;
  }
  .cost-summary__table-head {
    border-bottom: 1px solid black;
    background-color: rgba(0, 0, 0, 0.143);
  }
  .cost-summary__table .row {
    border-bottom: 1px solid black;
  }
  .cost-summary__table .cell.col-1 {
    width: 16px;
    font-size: 10px;
    font-weight: bold;
    color: red;
    text-align: center;
  }
  .cost-summary__table .cell.col-2 {
    width: 227px;
    font-size: 10px;
    font-weight: 500;
  }
  .cost-summary__table .cell.col-3 {
    width: 86px;
    font-size: 10px;
    font-weight: 500;
  }
  .cost-summary__table .cell.col-4 {
    width: 18px;
    font-size: 10px;
    font-weight: 500;
    border-left: 1px solid black;
    text-align: center;
  }
  .cost-summary__table .cell.col-5 {
    font-size: 10px;
    font-weight: 500;
    border-left: 1px solid black;
  }
  .cost-summary__table .cell.col-6 {
    width: 121px;
    border-left: 1px solid black;
  }
  .cost-summary__table .contract-total {
    width: 157px;
    color: red;
    font-weight: bold;
    font-size: 10px;
  }
  .cost-summary__table .grand-total {
    border-left: 1px solid black;
    border-right: 1px solid black;
    font-size: 10px;
  }
  .cost-summary__table .row-total {
    height: 22px;
    font-size: 10px;
  }
  .cost-summary__table .total {
    font-weight: bold;
    border-right: 1px solid black;
    font-size: 10px;
  }
  
  .notes {
    border-top: 1px solid black;
    font-size: 10px;
  }
  .notes-table {
    border-collapse: collapse;
    width: 100%;
    font-size: 10px;
  }
  .notes-table__head {
    background-color: rgba(0, 0, 0, 0.143);
    border-bottom: 1px solid black;
  }
  .notes-table__cell-head {
    font-size: 10px;
  }
  .notes-table__cell {
    font-size: 10px;
  }/*# sourceMappingURL=style.css.map */`;

module.exports.css = css;
