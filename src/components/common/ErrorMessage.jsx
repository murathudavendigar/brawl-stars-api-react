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

const ErrorMessage = ({
  message = "BrawlAPI dropped the connection.",
  onRetry,
}) => (
  <MissingShell>
    <MissingPanel>
      <MissingStamp>LAG SPIKE</MissingStamp>
      <MissingCode>KO</MissingCode>
      <MissingTitle>Could not load this</MissingTitle>
      <MissingCopy>{message}</MissingCopy>
      {onRetry && (
        <MissingActions>
          <MissingButton type="button" $primary onClick={onRetry}>
            TRY AGAIN
          </MissingButton>
        </MissingActions>
      )}
    </MissingPanel>
  </MissingShell>
);

export default ErrorMessage;
