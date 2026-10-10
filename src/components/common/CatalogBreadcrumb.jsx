import {
  BreadcrumbCurrent,
  BreadcrumbLink,
  BreadcrumbNav,
  BreadcrumbSep,
} from "../../styles/Shared.styled";

const CatalogBreadcrumb = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <BreadcrumbNav aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 && <BreadcrumbSep aria-hidden="true"> / </BreadcrumbSep>}
            {isLast || !item.path ? (
              <BreadcrumbCurrent aria-current={isLast ? "page" : undefined}>
                {item.label}
              </BreadcrumbCurrent>
            ) : (
              <BreadcrumbLink to={item.path}>{item.label}</BreadcrumbLink>
            )}
          </span>
        );
      })}
    </BreadcrumbNav>
  );
};

export default CatalogBreadcrumb;
