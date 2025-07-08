// Utility functions for contact storage
const CONTACTS_KEY = 'contactmate_contacts';

export const getContacts = () => {
  try {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.error('Error reading contacts from localStorage:', error);
    return [];
  }
};

export const saveContacts = (contacts) => {
  try {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error('Error saving contacts to localStorage:', error);
  }
};

export const addContact = (contact) => {
  const contacts = getContacts();
  const newContact = { ...contact, id: Date.now() }; // Add unique ID
  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);
  return newContact;
};

export const updateContact = (id, updatedData) => {
  const contacts = getContacts();
  const updatedContacts = contacts.map(contact =>
    contact.id === id ? { ...contact, ...updatedData } : contact
  );
  saveContacts(updatedContacts);
  return updatedContacts.find(contact => contact.id === id);
};

export const deleteContact = (id) => {
  const contacts = getContacts();
  const updatedContacts = contacts.filter(contact => contact.id !== id);
  saveContacts(updatedContacts);
  return id;
};

export const searchContacts = (searchTerm) => {
  const contacts = getContacts();
  if (!searchTerm.trim()) return contacts;
  
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};