const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5051;

const contactsFilePath = path.join(__dirname, "./data/contacts.json");

const readContacts = () => {
  try {
    const data = fs.readFileSync(contactsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error Reading Contacts File", error);
    return [];
  }
};

const writeContacts = (contacts) => {
  try {
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error Updating Contacts File", error);
  }
};

app.get("/api/contacts", (request, response) => {
  const contacts = readContacts();
  response.json(contacts);
});

app.get("/api/contacts/:email", (request, response) => {
  const contacts = readContacts();
  const email = request.params.email;
  const contact = contacts.find((c) => c.email === email);

  if (!contact) {
    return response.status(404).json({ message: "Contact Not Found" });
  }
  response.json(contact);
});

app.put("/api/contacts/:email", (request, response) => {
  const contacts = readContacts();
  const email = request.params.email;
  const index = contacts.findIndex((c) => c.email === email);

  if (index === -1) {
    return response.status(404).json({ message: "Contact Not Found" });
  }
  contacts[index] = { ...contacts[index], ...request.body };
  writeContacts(contacts);

  response.json(contacts[index]);
});

app.delete("/api/contacts/:email", (request, response) => {
  const contacts = readContacts();
  const email = request.params.email;
  const index = contacts.findIndex((c) => c.email === email);

  if (index === -1) {
    return response.status(404).json({ message: "Contact Not Found" });
  }
  contacts.splice(index, 1);

  writeContacts(contacts);

  response.json({ message: "Contact deleted successfully" });
});

app.get("/", (request, response) => {
  response.send("Welcome to Contact API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// READ UPDATE DELETE
