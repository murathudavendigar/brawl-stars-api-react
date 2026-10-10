import SEO from "./SEO";
import {
  MissingActions,
  MissingButton,
  MissingCode,
  MissingCopy,
  MissingPanel,
  MissingShell,
  MissingStamp,
  MissingTitle,
} from "../../styles/Missing.styled";

const MissingState = ({
  seoTitle,
  seoDescription,
  stamp = "STARR PARK",
  code = "404",
  title,
  description,
  primaryLabel = "Back to Lobby",
  onPrimary,
  secondaryLabel,
  onSecondary,
  noIndex = true,
}) => (
  <>
    <SEO
      title={seoTitle || title}
      description={seoDescription || description}
      noIndex={noIndex}
    />
    <MissingShell>
      <MissingPanel>
        <MissingStamp>{stamp}</MissingStamp>
        <MissingCode>{code}</MissingCode>
        <MissingTitle>{title}</MissingTitle>
        <MissingCopy>{description}</MissingCopy>
        {(onPrimary || onSecondary) && (
          <MissingActions>
            {onPrimary && (
              <MissingButton type="button" $primary onClick={onPrimary}>
                {primaryLabel}
              </MissingButton>
            )}
            {onSecondary && (
              <MissingButton type="button" onClick={onSecondary}>
                {secondaryLabel}
              </MissingButton>
            )}
          </MissingActions>
        )}
      </MissingPanel>
    </MissingShell>
  </>
);

export default MissingState;
