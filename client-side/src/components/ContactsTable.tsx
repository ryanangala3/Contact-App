import React from 'react';
import { useQuery } from '@tanstack/react-query';
import './ContactsTable.css';
import { useNavigate } from 'react-router-dom';
import { getContacts } from '../utils/api';
import { Contact } from '../types';



const ContactsTable: React.FC = () => {
    const navigate = useNavigate();
    const { data: contacts, isLoading, isError } = useQuery<Contact[], Error>({
        queryKey: ['contacts'],
        queryFn: (getContacts)
    });

    const handleRowClick = (email: string) => {
        navigate(`/${email}`);
    };

    return (
        <div className="contacts-table">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading contacts.</p>}
            <div className="contacts-header">
                <div className="header-item">Name</div>
                <div className="header-item">Company</div>
                <div className="header-item">Email</div>
                <div className="header-item">Phone</div>
            </div>
            <ul className="contacts-list">
                {contacts ? (
                    contacts.map((contact) => (
                        <li key={contact.email} className="contact-item" onClick={() => handleRowClick(contact.email)}>
                            <div className="item-name">{contact.name}</div>
                            <div className="item-age">{contact.company}</div>
                            <div className="item-email">{contact.email}</div>
                            <div className="item-phone">{contact.phone}</div>
                        </li>
                    ))
                ) : (
                    <li>No contacts available</li>
                )}
            </ul>
        </div>
    );
};
export default ContactsTable;