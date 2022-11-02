import { useState } from "react";
import HeaderDiv, {
  SearchButton,
  SearchInput,
  SelectList,
} from "../styles/Header.styled";

const Header = ({ setSearchName }) => {
  const [name, setName] = useState("");

  return (
    <HeaderDiv wrap="wrap">
      <SearchInput
        type="text"
        placeholder="Search By Name"
        onChange={(e) => setName(e.target.value)}
      />
      <SearchButton onClick={() => setSearchName(name)}>Search</SearchButton>
      <SelectList>
        <option>Brawlers</option>
        <option>Events</option>
        <option>Maps</option>
        <option>Game Modes</option>
        <option>Icons</option>
      </SelectList>
    </HeaderDiv>
  );
};

export default Header;
