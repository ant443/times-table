// ************************************************************************* \\
// output a multiplication table to console:

// function consoleLogTimesTable(upToNum) {
//   let table = [];
//   for (let i=1; i < upToNum+1; i++) {
//     table[i-1] = [];
//     for (let j = 1; j < upToNum+1; j++) {
//       if (i !== 0) {table[i-1][j-1] = i * j};
//     }
//     if (i === 1) {console.log("X", ...table[i-1])}
//     console.log(table[i-1][0], ...table[i-1]);
//   }
// }

// consoleLogTimesTable(5);
// ************************************************************************* \\

(function timesTable(){
  "use strict";

  const tableSizeInput = document.getElementById("table_size");
  tableSizeInput.addEventListener("input", adjustTableSize, false);

  function adjustTableSize(e) {
    const sizeNow = parseInt(e.target.attributes[3].value, 10);
    const newSize = parseInt(e.target.value, 10);
    if (isNaN(newSize) || newSize < 1 || newSize > 20
      || sizeNow === newSize) {return;}

    const sizeDif = sizeNow - newSize;
    const table = document.getElementById("times_table");
    const theadRow = table.querySelector("tr"); 
    const tbody = table.querySelector("tbody");
    const bodyRows = tbody.getElementsByTagName("tr");

    if (newSize > sizeNow) {
      createRowsAndHeaders(tbody, theadRow);
      createCells(bodyRows, newSize, sizeNow);
    } else {
      reduceTableSize(table, newSize, sizeDif);
    }

    e.target.attributes[3].value = newSize;

    function createTableHeader(content, scope, location) {
      const new_th = document.createElement("th");
      new_th.textContent = content;
      new_th.setAttribute("scope", scope);
      location.appendChild(new_th);
    }

    function createRowsAndHeaders(tbody, theadRow) {
      for (let i = sizeNow + 1; i <= newSize; i++) {
        const newRow = tbody.insertRow(-1);
        createTableHeader(i, "row", newRow);
        createTableHeader(i, "col", theadRow);
      }
    }

    function createCells(bodyRows, newSize, sizeNow) {
      for (let i = 1; i < newSize + 1; i++) {
        for (let j = 1; j < newSize + 1; j++) {
          if (i > sizeNow || j > sizeNow) {
            const new_td = bodyRows[i-1].insertCell(-1);
            new_td.textContent = i * j;
          }
        }
      }
    }

    function reduceTableSize(table, newSize, sizeDif) {
      const tableRows = table.getElementsByTagName("tr");
      for (let i=0; i <= newSize; i++) {
        for (let j=0; j < sizeDif; j++) {
          tableRows[i].deleteCell(-1);
          if (i === 0) {
            table.deleteRow(-1);
          }
        }
      }
    }
  }
})();

// ************************************************************************* \\

// TODO:

  // make a little prettier, such as padding for the text in the form.
  // highlight column+row on hover one color and a different color for hovered cell.
  // display calculation at bottom.