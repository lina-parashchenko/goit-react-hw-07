import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { useMemo } from "react";

export default function ContactList() {
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);
  const [debouncedInputValue] = useDebounce(filter, 200);

  const visibleContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
    );
  }, [contacts, debouncedInputValue]);

  return (
    <div className={css.wrap}>
      <ul className={css.listContact}>
        {visibleContacts.map((contact) => (
          <li key={contact.id} className={css.itemBorder}>
            <Contact contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
