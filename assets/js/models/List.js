const mockdatas = [
  {
    id: "987456654",
    title: "First note",
    created: "",
    description: "Bla bla bla hier, und blabla dort.",
    importance: 3,
    expire: "date expire",
    complete: true,
    completed_at: "",
  },
  {
    id: "654894654",
    title: "Second note",
    created: "",
    description:
      "Auch hier darf eine Beschreibung rein, aber die Zeichenlänge muss begrenzt werden.",
    importance: 2,
    expire: "date expire",
    complete: false,
    completed_at: "",
  },
  {
    id: "987321685",
    title: "Third note",
    created: "",
    description: "Lorem ipsum dolor sit amet",
    importance: 5,
    expire: "date expire",
    complete: true,
    completed_at: "",
  },
  {
    id: "654896545",
    title: "Fourth note",
    created: "",
    description: "Lorem ipsum dolor sit amet",
    importance: 4,
    expire: "date expire",
    complete: false,
    completed_at: "",
  },
];

export default class List {
  constructor(noteslist) {
      this.noteslist = noteslist
  }

  getNotesList() {
      this.noteslist = mockdatas

      return this.noteslist
  }

  randomId() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))
  }
  
}
