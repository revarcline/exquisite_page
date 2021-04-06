const backendRoot = "http://localhost:3000";

class GridBuilder {
  // create rows and columns in the main container, or within any div
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
    cardTitle.className = "ms-card-title ms-text-center";
    const h2 = document.createElement("h2");
    const sub = document.createElement("span");
    h2.innerText = cardInfo.title;
    sub.innerText = cardInfo.subtitle;
    cardTitle.appendChild(h2);
    cardTitle.appendChild(sub);

    const cardContent = document.createElement("div");
    cardContent.className = "ms-card-content ms-text-justify";
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

  //formArgs are method, action
  createForm() {
    const newForm = document.createElement("form");
    newForm.setAttribute("method", "GET");
    newForm.setAttribute("action", "#");
    this.parent.appendChild(newForm);
    return newForm;
  }

  //fieldArgs are type, id, placeholder, label; rows is optional
  addField(fieldArgs) {
    const formGroup = document.createElement("div");
    const field = document.createElement(fieldArgs.type);

    formGroup.className = "ms-form-group";
    field.id = fieldArgs.id;
    field.placeholder = fieldArgs.placeholder;
    if (fieldArgs.rows) field.rows = fieldArgs.rows;

    formGroup.appendChild(field);
    this.form.appendChild(formGroup);
  }

  addSubmit(value) {
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "ms-btn ms-large";
    submit.id = "submit";
    submit.innerText = value;
    this.form.appendChild(submit);
    this.submit = submit;
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

  const title = document.createElement("h2");
  title.className = "ms-text-center form-title";
  title.innerText = "create a new corpse";
  grid.col1.appendChild(title);

  const form = new FormBuilder(grid.col1);
  const titleInput = {
    type: "input",
    id: "corpse-title",
    placeholder: "enter a title",
  };
  const entryInput = {
    type: "textarea",
    id: "first-entry",
    rows: 7,
    placeholder: "add the first entry",
  };
  form.addField(titleInput);
  form.addField(entryInput);
  form.addSubmit("create");
  // create submit listener for form.submit
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

// corpse args are: container, parent, id, title, create_date - also need to create listener
function createCorpseLink(corpseArgs) {
  console.log(corpseArgs);
  const linkDiv = document.createElement("blockquote");
  const link = document.createElement("a");
  const title = document.createElement("h3");
  const created = document.createElement("i");

  link.addEventListener("click", () =>
    corpseAdd(corpseArgs.container, corpseArgs.id),
  );

  linkDiv.className = "ms-blockquote";
  link.href = "#";
  title.innerText = corpseArgs.title;
  created.innerText = `began ${corpseArgs.created_at}`;
  link.appendChild(title);
  linkDiv.appendChild(link);
  linkDiv.appendChild(created);
  corpseArgs.parent.appendChild(linkDiv);
}

function corpseIndex(container) {
  const grid = new GridBuilder(container);
  grid.resetGrid();
  grid.col1 = grid.buildCol(grid.row1, "intro-col", 4);

  fetch(`${backendRoot}/corpses/`).then((response) =>
    response.json().then((data) => {
      for (const item of data) {
        console.log(item.keys);
        let args = {
          parent: grid.col1,
          id: item["id"],
          container: container,
          title: item["title"],
          created_at: item["created_at"],
        };

        return createCorpseLink(args);
      }
    }),
  );
}

function corpseAdd(container, id) {
  // id is random for random button
}

window.addEventListener("DOMContentLoaded", (e) => {
  const mainContainer = document.querySelector("div#main");
  const newButton = document.querySelector("a#new-corpse");
  const indexButton = document.querySelector("a#list-all");
  const randButton = document.querySelector("a#random-corpse");
  // navbar link listeners
  newButton.addEventListener("click", () => newCorpse(mainContainer));
  indexButton.addEventListener("click", () => corpseIndex(mainContainer));
  randButton.addEventListener("click", () =>
    corpseAdd(mainContainer, "random"),
  );

  loadIntro(mainContainer);
  // showCorpse(mainContainer, 1);
});
