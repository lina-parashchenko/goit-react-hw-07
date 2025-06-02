import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";
import { selectLoading, selectError } from "../../redux/contactsSlice";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div className={css.wrap}>
      {loading && <p>Завантаження...</p>}
      {error && <p>Помилка: {error}</p>}
      <ul className={css.listContact}>
        {contacts.map((contact) => (
          <li key={contact.id} className={css.itemBorder}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
