import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Contact } from '../types';
import "./ContactFocusPage.css"
import { deleteContact, getContactByEmail, updateContact } from '../utils/api';


const getBorderColor = (isActive: boolean): string => {
    return isActive ? '2px solid green' : '2px solid red';
};

const formatDate = (dateString: string): string => {
    const formattedDateString = dateString.replace(' ', '');
    const date = new Date(formattedDateString);

    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const ContactsFocusPage: React.FC = () => {
    const navigate = useNavigate();
    const { email } = useParams<{ email: string }>();
    const [contact, setContact] = useState<Contact | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isActive, setIsActive] = useState<boolean | null>(null);

    const { data: contacts, isLoading, isError } = useQuery<Contact[], Error>({
        queryKey: ['contacts', email],
        queryFn: async () => {
            const contact = await getContactByEmail(email || '');
            return [contact];
        },
        enabled: !!email,
    });

    useEffect(() => {
        if (contacts && contacts.length > 0) {
            setContact(contacts[0]);
            setIsActive(contacts[0].isActive);
        }
    }, [contacts]);


    useEffect(() => {
        if (contacts && contacts.length > 0) {
            setContact(contacts[0]);
        }
    }, [contacts]);

    const { mutate: updateContactMutation, isSuccess: isUpdateUserSuccess } =
        useMutation({
            mutationFn: updateContact,
        })

    const { mutate: deleteContactMutation } = useMutation<void, Error, string>({
        mutationFn: deleteContact,
        onSuccess: () => {
            alert("Contact Successfully Deleted");
            navigate("/")
        },
        onError: () => {
            alert("Failed to Delete Contact");
        }
    });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (contact) {
            updateContactMutation(contact);
        }
        handleEditToggle()
    };

    const handleDeleteContact = (email: string) => {
        deleteContactMutation(email);
    };

    if (!contact) {
        return <div>Loading contact details...</div>;
    }

    return (
        <>
            <div className="contact-container">
                <div className="contact-details" >
                    <div className="contact-title" style={{ border: getBorderColor(contact.isActive) }}>
                        <h2>{contact.name}</h2>
                    </div>
                    <div className="img-wrapper">
                        <img className="contact-image" src={contact.picture} alt={`${contact.name}'s picture`} />
                    </div>
                    {isEditing ? (
                        <form className="edit-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="label">Active:</label>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="active"
                                            value="true"
                                            checked={contact.isActive === true}
                                            onChange={() => setContact({ ...contact, isActive: true })}
                                        />
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="active"
                                            value="false"
                                            checked={contact.isActive === false}
                                            onChange={() => setContact({ ...contact, isActive: false })}
                                        />
                                        No
                                    </label>
                                </div>
                                <div className="formGroup">
                                    <label className="label">Name:</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={contact.name}
                                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Eye Color:</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={contact.eyeColor}
                                        onChange={(e) => setContact({ ...contact, eyeColor: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Gender:</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={contact.gender}
                                        onChange={(e) => setContact({ ...contact, gender: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Email:</label>
                                    <input
                                        type="email"
                                        className="input"
                                        value={contact.email}
                                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Phone:</label>
                                    <input
                                        type="tel"
                                        className="input"
                                        value={contact.phone}
                                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Company:</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={contact.company}
                                        onChange={(e) => setContact({ ...contact, company: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Address:</label>
                                    <input
                                        className="input"
                                        value={contact.address}
                                        onChange={(e) => setContact({ ...contact, address: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">About:</label>
                                    <textarea
                                        className="input"
                                        value={contact.about}
                                        onChange={(e) => setContact({ ...contact, about: e.target.value })}
                                    />
                                </div>
                                <div className="formGroup">
                                    <label className="label">Last Contact Date:</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formatDate(contact.last_contact_date)}
                                        onChange={(e) => setContact({ ...contact, last_contact_date: e.target.value })}
                                    />
                                </div>

                                <button className="edit-btn btn" type='submit'>Save</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p><strong>Age:</strong> {contact.age}</p>
                            <p><strong>Eye Color:</strong> {contact.eyeColor}</p>
                            <p><strong>Gender:</strong> {contact.gender}</p>
                            <p><strong>Company:</strong> {contact.company}</p>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <p><strong>Address:</strong> {contact.address}</p>
                            <p><strong>About:</strong> {contact.about}</p>
                            <p><strong>Last Contact Date:</strong> {formatDate(contact.last_contact_date)}</p>
                        </>
                    )}
                </div>
                <div className="btn-container">
                    <button className="edit-btn btn" onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit Contact'}
                    </button>
                    <button className="delete-btn btn" onClick={() => handleDeleteContact(contact.email)}>Delete Contact</button>
                </div>
            </div>
        </>
    );
};


export default ContactsFocusPage;
