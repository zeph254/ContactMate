import { useState, useEffect } from 'react';
import {
  getContacts,
  addContact as storageAddContact,
  updateContact as storageUpdateContact,
  deleteContact as storageDeleteContact,
  searchContacts as storageSearchContacts
} from '../utils/contactStorage';

export default function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load contacts on initial render
  useEffect(() => {
    try {
      const loadedContacts = getContacts();
      setContacts(loadedContacts);
    } catch (err) {
      setError('Failed to load contacts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addContact = (contact) => {
    try {
      const newContact = storageAddContact(contact);
      setContacts(prev => [...prev, newContact]);
      return newContact;
    } catch (err) {
      setError('Failed to add contact');
      console.error(err);
      throw err;
    }
  };

  const updateContact = (id, updatedData) => {
    try {
      const updatedContact = storageUpdateContact(id, updatedData);
      setContacts(prev =>
        prev.map(contact => (contact.id === id ? updatedContact : contact))
      );
      return updatedContact;
    } catch (err) {
      setError('Failed to update contact');
      console.error(err);
      throw err;
    }
  };

  const deleteContact = (id) => {
    try {
      storageDeleteContact(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
      console.error(err);
      throw err;
    }
  };

  const searchContacts = (searchTerm) => {
    try {
      return storageSearchContacts(searchTerm);
    } catch (err) {
      setError('Failed to search contacts');
      console.error(err);
      return [];
    }
  };

  return {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    searchContacts
  };
}