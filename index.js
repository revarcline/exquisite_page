const backendRoot = "http://localhost:3000";

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

  resetGrid() {
    this.clearContainer();
    this.row1 = this.buildRow("new-row", "center");
  }
}

class CardBuilder {
  // use this for intro card and corpse display
  constructor(parent) {
    this.parent = parent;
  }

  createCard(cardInfo) {
    const card = document.createElement("div");
    card.className = "ms-card";

    const cardTitle = document.createElement("div");
    cardTitle.className = "ms-card-title";
    const h2 = document.createElement("h2");
    const sub = document.createElement("span");
    h2.innerText = cardInfo.title;
    sub.innerText = cardInfo.subtitle;
    cardTitle.appendChild(h2);
    cardTitle.appendChild(sub);

    const cardContent = document.createElement("div");
    cardContent.className = "ms-card-content";
    cardContent.innerText = cardInfo.content;
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    this.parent.appendChild(card);
    return card;
  }
}

class FormBuilder {
  // let's build a form
  constructor(parent, formArgs) {
    this.parent = parent;
    this.form = this.createForm(formArgs);
  }

  createForm(formArgs) {
    const form = document.createElement(form);
    form.setAttribute("method", formArgs.method);
    form.setAttribute("action", formArgs.action);
    this.parent.appendChild(form);
    return form;
  }

  addField(fieldArgs) {
    const formGroup = document.createElement("div");
    const field = document.createElement("input");
    const label = document.createElement("label");
    formGroup.className = "ms-form-group";
    field.type = fieldArgs.type;
    field.id = fieldArgs.id;
    field.placeholder = fieldArgs.placeholder;
    label.for = fieldArgs.id;
  }

  addSubmit(value) {
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.id = "submit";
    submit.innerText = value;
    this.form.appendChild(submit);
  }
}

function loadIntro(container) {
  // first thing we see
  const grid = new GridBuilder(container);
  grid.resetGrid();
  grid.col1 = grid.buildCol(grid.row1, "intro-col", 4);

  const introCard = new CardBuilder(grid.col1);
  const cardInfo = {
    title: "the exquisite corpse",
    subtitle: "a classic surrealist game",
    content:
      "the exquisite corpse is a parlor game once popular among andré breton's cadre of surrealist artists. play goes as thus: one person begins a poem or story, and then the next player continues it seeing only the very last portion. play continues ad nauseum. the results can range from silly to dreamlike, reflecting the group's mood and whim. in this online version, each player is asked to add a minimum of 20 words to each corpse before viewing its entirety.",
  };
  introCard.createCard(cardInfo);
}

function newCorpse(container) {
  const grid = new GridBuilder(container);
  grid.resetGrid();
  grid.col1 = grid.buildCol(grid.row1, "new-col", 6);
}

function showCorpse(container, id) {
  const grid = new GridBuilder(container);
  grid.resetGrid();
  grid.col1 = grid.buildCol(grid.row1, "intro-col", 4);

  let cardInfo = {};
  const corpseCard = new CardBuilder(grid.col1);

  fetch(`${backendRoot}/corpses/${id}`).then((response) =>
    response.json().then((data) => {
      cardInfo = {
        title: data["title"],
        subtitle: `began ${data["created_at"]}`,
        content: data["full_content"],
      };
      corpseCard.createCard(cardInfo);
    }),
  );
}

window.addEventListener("DOMContentLoaded", (e) => {
  const mainContainer = document.querySelector("div#main");
  // navbar link listeners
  loadIntro(mainContainer);
  showCorpse(mainContainer, 1);
});
