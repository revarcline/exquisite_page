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
    row.className = valign === "" ? "row" : `row justify-content-${valign}`;
    row.id = id;
    this.container.appendChild(row);
    return row;
  }

  buildCol(row, id, size) {
    const col = document.createElement("div");
    col.className = size ? `col-${size}` : "col";
    col.id = id;
    row.appendChild(col);
    return col;
  }
}

class CardBuilder {
  constructor(parent) {
    this.parent = parent;
  }

  createCard(title, subtitle, content) {
    const card = document.createElement("div");
    card.className = "ms-card";

    const cardTitle = document.createElement("div");
    cardTitle.className = "ms-card-title";
    const h2 = document.createElement("h2");
    const sub = document.createElement("span");
    h2.innerText = title;
    sub.innerText = subtitle;
    cardTitle.appendChild(h2);
    cardTitle.appendChild(sub);

    const cardContent = document.createElement("div");
    cardContent.className = "ms-card-content";
    cardContent.innerText = content;
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    this.parent.appendChild(card);
    return card;
  }
}

function loadIntro(container) {
  const grid = new GridBuilder(container);
  grid.clearContainer;
  grid.row1 = grid.buildRow("intro-row", "center");
  grid.col1 = grid.buildCol(grid.row1, "intro-col", 4);

  const introCard = new CardBuilder(grid.col1);
  const title = "the exquisite corpse";
  const subtitle = "a classic surrealist game";
  const content =
    " the exquisite corpse is a parlor game once popular among andré breton's cadre of surrealist artists. play goes as thus: one person begins a poem or story, and then the next player continues it seeing only the very last portion. play continues ad nauseum. the results can range from silly to dreamlike, reflecting the group's mood and whim. in this online version, each player is asked to add a minimum of 20 words to each corpse before viewing its entirety.";
  introCard.createCard(title, subtitle, content);
}

window.addEventListener("DOMContentLoaded", (e) => {
  const mainContainer = document.querySelector("div#main");
  loadIntro(mainContainer);
});

//ok so let's talk oo structure:
//gonna have a few different objects
