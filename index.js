class GridBuilder {
  // creates a card in the main container
  constructor(container) {
    this.container = container;
  }

  clearContainer() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  buildRow(id) {
    const row = document.createElement("div");
    row.className = "row";
    row.id = id;
    this.container.appendChild(row);
    return row;
  }

  buildCol(row, id, size = "") {
    const col = document.createElement("div");
    col.className = size === "" ? "col" : `col-${size}`;
    col.id = id;
    row.appendChild(col);
    return col;
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  const mainContainer = document.querySelector("div.container");
  const grid = new GridBuilder(mainContainer);
  const row1 = grid.buildRow("first-row");
  const col1 = grid.buildCol(row1, "first-col", 3);
  const col2 = grid.buildCol(row1, "first-col");
  col1.innerText = "Hello";
  col2.innerText = "World";
});

//ok so let's talk oo structure:
//gonna have a few different objects
