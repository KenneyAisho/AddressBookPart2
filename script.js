class AddressBook {
  constructor(contacts) {
    this.contacts = [];
  }
  add(name, email, phone, relation) {
    this.contacts.push(new Contact(name, email, phone, relation));
  }
  deleteAt(index) {
    this.contacts.splice(index, 1);
  }
}

class Contact {
  constructor(name, email, phone, relation) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.relation = relation;
  }
}

function print(info) {
  console.log(info);
}

let book = new AddressBook();

book.add('Kenney', 'kenney@gmail.com', 5865555555, 'myself');
book.add('Kyle', 'kyle@gmail.com', 5864444444, 'brother');
book.add('Jarl', 'Jarlbalgruuf@skyrim.com', 4444444444, 'Jarl of Whiterun');
book.deleteAt(1);
print(book);

function display() {
  document.querySelector('#showContacts').innerHTML = '';
  book.contacts.forEach((contact, index) => {
    const newContact = document.createElement('div');
    newContact.classList.add('#showContacts');
    newContact.innerHTML = `
    <p>Name:${contact.name}</p>
    <p>Email: ${contact.email}</p>
    <p>Phone: ${contact.phone}</p>
    <p>Relation: ${contact.relation}</p>
    <i class='fa fa-trash' data-index-number='${index}'
    aria-hidden='true'></i>`;
    document.querySelector('#showContacts').appendChild(newContact);
  });
}

display();

const form = document.querySelector('form');

form.addEventListener('submit', addNewContact);

function addNewContact(event) {
  event.preventDefault();
  const formData = new FormData(form);
  book.add(
    formData.get('name'),
    formData.get('email'),
    formData.get('phone'),
    formData.get('relation')
  );
  form.reset();
  display();
}

document
  .querySelector('#showContacts')
  .addEventListener('click', deleteContact);

function deleteContact(event) {
  if (event.target.classList.contains('fa-trash')) {
    const index = event.target.getAttribute('data-index-number');
    console.log(index);
    book.deleteAt(index);
    display();
  }
}
