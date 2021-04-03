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

  buildRow(id, valign = "") {
    const row = document.createElement("div");
    row.className = valign === "" ? "row" : `row align-self-${valign}`;
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

class CardBuilder {
  constructor(parent) {
    this.parent = parent;
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  const mainContainer = document.querySelector("div#main");
  const grid = new GridBuilder(mainContainer);
  grid.row1 = grid.buildRow("first-row", "center");
  grid.col1 = grid.buildCol(grid.row1, "first-col", 3);
  grid.col2 = grid.buildCol(grid.row1, "first-col");
  grid.col1.innerText = "Hello";
  grid.col2.innerText = "World";
});

//ok so let's talk oo structure:
//gonna have a few different objects
