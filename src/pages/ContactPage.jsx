import { useState } from 'react';
import React from 'react';
import useContacts from '../hooks/useContacts';
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaCheck,FaShare } from 'react-icons/fa';

export default function ContactPage() {
  const {
    contacts,
    loading,
    error,
    addContact,
    updateContact,
    deleteContact,
    searchContacts
  } = useContacts();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [contactToShare, setContactToShare] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleShare = (contact) => {
  setContactToShare(contact);
  setShareModalOpen(true);
};

const shareViaWebAPI = async () => {
  try {
    const shareData = {
      title: `Contact: ${contactToShare.name}`,
      text: `Name: ${contactToShare.name}\nPhone: ${contactToShare.phone}\nEmail: ${contactToShare.email || ''}`,
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback to clipboard copy
      await navigator.clipboard.writeText(shareData.text);
      alert('Contact copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  } finally {
    setShareModalOpen(false);
  }
};
const downloadVCard = () => {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contactToShare.name}`,
    `TEL:${contactToShare.phone}`,
    ...(contactToShare.email ? [`EMAIL:${contactToShare.email}`] : []),
    'END:VCARD'
  ].join('\n');

  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${contactToShare.name}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  setShareModalOpen(false);
};

const copyToClipboard = async () => {
  try {
    const text = `Name: ${contactToShare.name}\nPhone: ${contactToShare.phone}\nEmail: ${contactToShare.email || ''}`;
    await navigator.clipboard.writeText(text);
    alert('Contact copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy contact details');
  } finally {
    setShareModalOpen(false);
  }
};

const shareViaEmail = () => {
  const subject = `Contact: ${contactToShare.name}`;
  const body = `Here's the contact information:\n\nName: ${contactToShare.name}\nPhone: ${contactToShare.phone}\nEmail: ${contactToShare.email || ''}`;
  window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  setShareModalOpen(false);
};

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Name and phone number are required!');
      return;
    }

    if (editingId) {
      updateContact(editingId, formData);
      setEditingId(null);
    } else {
      addContact(formData);
    }

    // Reset form and close
    setFormData({ name: '', phone: '', email: '' });
    setIsFormOpen(false);
  };

  // Handle contact deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  // Start editing a contact
  const startEditing = (contact) => {
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || ''
    });
    setEditingId(contact.id);
    setIsFormOpen(true);
  };

  // Filter contacts based on search term
  const filteredContacts = searchTerm ? searchContacts(searchTerm) : contacts;

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Contacts</h1>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Add Contact Button */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-6 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
      >
        <FaUserPlus /> Add New Contact
      </button>

      {/* Contact Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingId ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="name">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="phone">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingId(null);
                      setFormData({ name: '', phone: '', email: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <FaCheck /> {editingId ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Share Contact Modal */}
        {shareModalOpen && contactToShare && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Share {contactToShare.name}'s Contact
                </h2>
                
                <div className="space-y-3 mb-6">
                  <p className="text-gray-600">Choose how to share this contact:</p>
                  
                  <button
                    onClick={shareViaWebAPI}
                    className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    <FaShare /> Share via...
                  </button>
                  
                  <button
                    onClick={copyToClipboard}
                    className="w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadVCard}
                    className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                  >
                    Download vCard
                  </button>
                  
                  {contactToShare.email && (
                    <button
                      onClick={shareViaEmail}
                      className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Share via Email
                    </button>
                
                  )}
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShareModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Contacts List */}
      {filteredContacts.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'No matching contacts found' : 'No contacts yet. Add your first contact!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 truncate">{contact.name}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(contact)}
                      className="text-blue-600 hover:text-blue-800 transition"
                      aria-label="Edit contact"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      aria-label="Delete contact"
                    >
                      <FaTrash />
                    </button>
                      <button
                      onClick={() => handleShare(contact)}
                      className="text-green-600 hover:text-green-800 transition"
                      aria-label="Share contact"
                    >
                      <FaShare />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-800 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </span>
                    <a href={`tel:${contact.phone}`} className="text-gray-600 hover:text-purple-600 transition">
                      {contact.phone}
                    </a>
                  </div>

                  {contact.email && (
                    <div className="flex items-center gap-3">
                      <span className="bg-purple-100 text-purple-800 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </span>
                      <a href={`mailto:${contact.email}`} className="text-gray-600 hover:text-purple-600 transition truncate">
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}