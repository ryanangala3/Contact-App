import { Contact } from "../types";

const BASE_API_URL = "http://localhost:5051/api"

const getContacts = async () => {
    const response = await fetch(`${BASE_API_URL}/contacts`);
    return response.json();
}

const getContactByEmail = async (email: string): Promise<Contact> => {
    const response = await fetch(`http://localhost:5051/api/contacts/${email}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const updateContact = async (contact: Contact) => {
    const response = await fetch(`http://localhost:5051/api/contacts/${contact.email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error('Error updating contact');
    }
    return response.json();
};


const deleteContact = async (email: string): Promise<void> => {
    const response = await fetch(`http://localhost:5051/api/contacts/${email}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
    return response.json()
};

export { getContacts, updateContact, getContactByEmail, deleteContact }
