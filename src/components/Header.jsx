import HeaderDiv, {
  SearchButton,
  SearchInput,
  SelectList,
} from "../styles/Header.styled";

const Header = ({ setSearchName, setSearchType }) => {
  return (
    <HeaderDiv wrap="wrap">
      <SearchInput
        type="text"
        placeholder="Search By Name"
        onChange={(e) => setSearchName(e.target.value)}
      />
      <SearchButton>Search</SearchButton>
      <SelectList onChange={(e) => setSearchType(e.target.value)}>
        <option value="brawlers">Brawlers</option>
        <option value="maps">Maps</option>
        <option value="gamemodes">Game Modes</option>
      </SelectList>
    </HeaderDiv>
  );
};

export default Header;
