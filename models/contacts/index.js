// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }




// const fs = require('node:fs/promises');
// const path = require('path');
// const { randomUUID } = require('crypto');
// const { constants } = require('node:buffer');

// const contactsPath = path.join(__dirname, 'contacts.json');

// const writeContacts = async (contacts) => {
//   return await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// };

// const listContacts = async () => {
//   return JSON.parse(await fs.readFile(contactsPath));
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const contact = contacts.find((contact) => contact.id === contactId);

//   return contact || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   const [result] = contacts.splice(index, 1);

//   await writeContacts(contacts);

//   return result;
// };

// const updateContact = async (contactId, body) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);
//   if (index === -1) {
//     return null;
//   }
//   constants[index] = { contactId, ...body };
//   writeContacts(contacts)
//   return constants[index];

// }

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const newContact = {
//     id: randomUUID(),
//     name,
//     email,
//     phone,
//   };

//   contacts.push(newContact);
//   await writeContacts(contacts);
//   return newContact;
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
