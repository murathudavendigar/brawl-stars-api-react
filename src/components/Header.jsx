import HeaderDiv, {
  ControlBar,
  ControlBarRow,
  ControlButton,
  ControlsPanel,
  FilterLabel,
  ResultMeta,
  SearchButton,
  SearchInput,
  SelectList,
} from "../styles/Header.styled";

const Header = ({
  searchName,
  searchType,
  filterOptions,
  filters,
  sortBy,
  viewMode,
  showFavorites,
  resultCount,
  totalCount,
  favoriteCount,
  advancedOpen,
  setSearchName,
  setSearchType,
  setFilters,
  setSortBy,
  setViewMode,
  setShowFavorites,
  setAdvancedOpen,
  onRandomPick,
  onResetFilters,
}) => {
  const showBrawlerFilters = searchType === "brawlers";
  const showMapFilters = searchType === "maps";

  return (
    <>
      <HeaderDiv wrap="wrap">
        <SearchInput
          type="text"
          aria-label="Search by name"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <SearchButton
          type="button"
          disabled={!searchName}
          onClick={() => setSearchName("")}>
          Clear
        </SearchButton>
        <SelectList
          aria-label="Choose content type"
          value={searchType}
          onChange={(e) => {
            setSearchName("");
            setFilters({
              rarity: "all",
              class: "all",
              gameMode: "all",
              availability: "available",
            });
            setSearchType(e.target.value);
          }}>
          <option value="brawlers">Brawlers</option>
          <option value="maps">Maps</option>
          <option value="gamemodes">Game Modes</option>
        </SelectList>
      </HeaderDiv>

      <ControlBar>
        <ControlBarRow>
          <FilterLabel>
            Sort
            <SelectList
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort results">
              {showBrawlerFilters && (
                <option value="newest">Newest first</option>
              )}
              {showBrawlerFilters && (
                <option value="oldest">Oldest first</option>
              )}
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              {showBrawlerFilters && <option value="rarity">Rarity</option>}
              {showBrawlerFilters && <option value="class">Class</option>}
              {showMapFilters && <option value="mode">Game mode</option>}
            </SelectList>
          </FilterLabel>

          <FilterLabel>
            View
            <SelectList
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              aria-label="View mode">
              <option value="grid">Grid</option>
              <option value="compact">Compact</option>
            </SelectList>
          </FilterLabel>
        </ControlBarRow>

        <ControlBarRow $cols="actions">
          <ControlButton
            type="button"
            onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "All Items" : "Favorites"}
          </ControlButton>
          <ControlButton
            type="button"
            onClick={onRandomPick}
            disabled={!resultCount}>
            Random
          </ControlButton>
          <ControlButton
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}>
            {advancedOpen ? "Hide Filters" : "Filters"}
          </ControlButton>
        </ControlBarRow>
      </ControlBar>

      {advancedOpen && (
        <ControlsPanel>
          {showBrawlerFilters && (
            <>
              <FilterLabel>
                Rarity
                <SelectList
                  value={filters.rarity}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      rarity: e.target.value,
                    })
                  }>
                  <option value="all">All rarities</option>
                  {(filterOptions.rarities || []).map((rarity) => (
                    <option key={rarity} value={rarity}>
                      {rarity}
                    </option>
                  ))}
                </SelectList>
              </FilterLabel>

              <FilterLabel>
                Class
                <SelectList
                  value={filters.class || "all"}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      class: e.target.value,
                    })
                  }>
                  <option value="all">All classes</option>
                  {(filterOptions.classes || []).map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </SelectList>
              </FilterLabel>
            </>
          )}

          {showMapFilters && (
            <>
              <FilterLabel>
                Game mode
                <SelectList
                  value={filters.gameMode}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      gameMode: e.target.value,
                    })
                  }>
                  <option value="all">All modes</option>
                  {(filterOptions.gameModes || []).map((gameMode) => (
                    <option key={gameMode} value={gameMode}>
                      {gameMode}
                    </option>
                  ))}
                </SelectList>
              </FilterLabel>

              <FilterLabel>
                Availability
                <SelectList
                  value={filters.availability}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      availability: e.target.value,
                    })
                  }>
                  <option value="available">Available</option>
                  <option value="retired">Retired</option>
                  <option value="all">All maps</option>
                </SelectList>
              </FilterLabel>
            </>
          )}

          {onResetFilters && (
            <ControlButton type="button" onClick={onResetFilters}>
              Reset Filters
            </ControlButton>
          )}
        </ControlsPanel>
      )}

      <ResultMeta>
        <span>
          Showing {resultCount} of {totalCount}
        </span>
        {favoriteCount > 0 && <span>{favoriteCount} favorites saved</span>}
      </ResultMeta>
    </>
  );
};

export default Header;
