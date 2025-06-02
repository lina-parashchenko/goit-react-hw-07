import css from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import { deleteContact } from "../../redux/contactsOps";

export default function App() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);
  const [debouncedInputValue] = useDebounce(filter, 200);
  const dispatch = useDispatch();

  const visibileContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
    );
  }, [debouncedInputValue, contacts]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList contactsList={visibileContacts} onDelete={handleDelete} />
    </div>
  );
}
