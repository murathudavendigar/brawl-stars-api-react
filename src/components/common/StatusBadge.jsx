import { StatusBadge as Badge } from "../../styles/Shared.styled";

const TONE_BY_KIND = {
  unreleased: "primary",
  retired: "muted",
  available: "success",
  favorite: "gold",
};

const StatusBadge = ({ kind = "unreleased", children, ...props }) => (
  <Badge $tone={TONE_BY_KIND[kind] || "primary"} {...props}>
    {children}
  </Badge>
);

export default StatusBadge;
