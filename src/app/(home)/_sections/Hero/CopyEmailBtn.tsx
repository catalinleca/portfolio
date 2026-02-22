import { ANALYTICS_EVENTS } from "@/analytics";
import { CopyButton } from "@/ui/shared";

interface CopyEmailBtnProps {
  email: string;
  className?: string;
  analyticsLinkName: string;
  analyticsLocation: string;
  analyticsSection?: string;
}

export const CopyEmailBtn = ({
  email,
  className,
  analyticsLinkName,
  analyticsLocation,
  analyticsSection,
}: CopyEmailBtnProps) => {
  return (
    <CopyButton
      text={email}
      className={className}
      data-analytics-click={ANALYTICS_EVENTS.click}
      data-analytics-link-name={analyticsLinkName}
      data-analytics-location={analyticsLocation}
      data-analytics-section={analyticsSection}
    >
      Email
    </CopyButton>
  );
};
