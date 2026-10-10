import { Link } from "react-router-dom";
import styled from "styled-components";

const Strip = styled.section`
  width: min(100%, 1180px);
  margin: 0 auto 1rem;
  padding: 0.85rem 1rem;
  background: var(--panel-bg);
  border: 3px solid var(--color-ink);
  border-radius: 14px;
  box-shadow: var(--shadow-3d);
`;

const Title = styled.h2`
  margin: 0 0 0.65rem;
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--color-gold);
  text-shadow: 2px 2px 0 var(--color-ink);
`;

const Row = styled.div`
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
`;

const Chip = styled(Link)`
  flex: 0 0 auto;
  display: grid;
  justify-items: center;
  gap: 0.3rem;
  width: 76px;
  text-decoration: none;
  color: var(--color-text-body);
  font-family: var(--font-secondary);
  font-weight: 800;
  font-size: 0.72rem;
  text-align: center;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 12px;
    border: 3px solid var(--color-ink);
    background: var(--color-ink);
    box-shadow: 0 3px 0 #1a1020;
  }

  span {
    max-width: 76px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover img {
    transform: translateY(-2px);
  }
`;

const RecentStrip = ({ items = [], onClear }) => {
  if (!items.length) return null;

  return (
    <Strip aria-label="Recently viewed">
      <Title>
        Recently viewed
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            style={{
              marginLeft: "0.75rem",
              fontFamily: "var(--font-primary)",
              fontSize: "0.8rem",
              background: "var(--nav-bg)",
              color: "var(--color-gold-light)",
              border: "3px solid var(--color-ink)",
              borderRadius: "10px",
              padding: "0.2rem 0.55rem",
              boxShadow: "0 2px 0 #1a1020",
              cursor: "pointer",
            }}>
            Clear
          </button>
        )}
      </Title>
      <Row>
        {items.map((item) => (
          <Chip key={`${item.type}-${item.id}`} to={item.path}>
            {item.imageUrl ? (
              <img src={item.imageUrl} alt="" />
            ) : (
              <img alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==" />
            )}
            <span>{item.name}</span>
          </Chip>
        ))}
      </Row>
    </Strip>
  );
};

export default RecentStrip;
