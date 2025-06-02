import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { useDebounce } from "use-debounce";

import css from "./App.module.css";

import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";

import { fetchContacts, deleteContact } from "../../redux/contactsOps";

export default function App() {
  const dispatch = useDispatch();

  // Підключення до стану Redux
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  // Дебаунс для плавного фільтру
  const [debouncedInputValue] = useDebounce(filter, 200);

  // Завантаження контактів з бекенду при першому рендері
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // Фільтрація контактів за ім’ям
  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
    );
  }, [debouncedInputValue, contacts]);

  // Обробка видалення
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList contactsList={visibleContacts} onDelete={handleDelete} />
    </div>
  );
}
