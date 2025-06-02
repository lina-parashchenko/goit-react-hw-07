import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.filters.name);

  return (
    <div className={css.searchBoxWrap}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={(event) => dispatch(setNameFilter(event.target.value))}
        className={css.textWrap}
      />
    </div>
  );
}
