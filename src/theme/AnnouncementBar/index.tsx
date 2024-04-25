import { useLocation } from "@docusaurus/router";
import { useThemeConfig } from "@docusaurus/theme-common";
import AnnouncementBarCloseButton from "@theme/AnnouncementBar/CloseButton";
import AnnouncementBarContent from "@theme/AnnouncementBar/Content";

import styles from "./styles.module.css";

export default function AnnouncementBar(): JSX.Element | null {
  const { announcementBar } = useThemeConfig();

  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  if (!isHomePage) {
    return null;
  }

  const { backgroundColor, textColor, isCloseable } = announcementBar!;
  return (
    <div
      className={styles.announcementBar}
      style={{ backgroundColor, color: textColor }}
      role="banner"
    >
      {isCloseable && <div className={styles.announcementBarPlaceholder} />}
      <AnnouncementBarContent className={styles.announcementBarContent} />
      {isCloseable && (
        <AnnouncementBarCloseButton
          onClick={close}
          className={styles.announcementBarClose}
        />
      )}
    </div>
  );
}
