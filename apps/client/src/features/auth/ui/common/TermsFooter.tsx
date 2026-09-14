import { Link } from "react-router-dom";
import { Text } from "@/shared/ui";
import { AUTH_UI_TEXT } from "../../constants";

export function TermsFooter() {
  return (
    <Text variant="muted" className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
      {AUTH_UI_TEXT.TERMS_PREFIX}{" "}
      <Link
        to="/terms"
        className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
      >
        {AUTH_UI_TEXT.TERMS_CONTRACT}
      </Link>{" "}
      {AUTH_UI_TEXT.TERMS_AND}{" "}
      <Link
        to="/privacy"
        className="underline underline-offset-2 hover:text-foreground transition-colors font-medium"
      >
        {AUTH_UI_TEXT.TERMS_PRIVACY}
      </Link>{" "}
      {AUTH_UI_TEXT.TERMS_SUFFIX}
    </Text>
  );
}
