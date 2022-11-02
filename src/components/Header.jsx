import HeaderDiv, { SearchButton, SearchInput } from "../styles/Header.styled";

const Header = () => {
  return (
    <HeaderDiv>
      <SearchInput type="text" placeholder="Search By Name" />
      <SearchButton>Search</SearchButton>
    </HeaderDiv>
  );
};

export default Header;
