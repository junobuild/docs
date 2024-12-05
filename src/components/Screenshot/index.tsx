import { ThemedComponent } from "@docusaurus/theme-common";
import Dark1024px from "@site/static/screenshots/dark-1024px.webp";
import Dark1640px from "@site/static/screenshots/dark-1640px.webp";
import Dark768px from "@site/static/screenshots/dark-768px.webp";
import Light1024px from "@site/static/screenshots/light-1024px.webp";
import Light1640px from "@site/static/screenshots/light-1640px.webp";
import Light768px from "@site/static/screenshots/light-768px.webp";
import type { ComponentProps } from "react";
import styles from "./styles.module.scss";

interface ThemedResponsiveImage {
  src768px: string;
  src1024px: string;
  src1640px: string;
}

type ThemedResponsiveImageProps = {
  alt: string;
  sources: {
    light: ThemedResponsiveImage;
    dark: ThemedResponsiveImage;
  };
} & Omit<ComponentProps<"img">, "src">;

function ThemedResponsiveImage(props: ThemedResponsiveImageProps): JSX.Element {
  const { sources, className: parentClassName, alt, ...propsRest } = props;

  return (
    <ThemedComponent className={parentClassName}>
      {({ theme, className }) => {
        const { src768px, src1024px, src1640px } = sources[theme];

        return (
          <picture className={className} {...propsRest}>
            <source srcSet={src1640px} media="(min-width: 1024px)" />
            <source srcSet={src1024px} media="(min-width: 768px)" />
            <source srcSet={src768px} media="(min-width: 480px)" />

            <img src="" alt={alt} />
          </picture>
        );
      }}
    </ThemedComponent>
  );
}

export default function Screenshot(): JSX.Element {
  return (
    <div className={styles.screenshot}>
      <ThemedResponsiveImage
        alt="A screenshot of the Juno Console application"
        sources={{
          light: {
            src768px: Light768px,
            src1024px: Light1024px,
            src1640px: Light1640px
          },
          dark: {
            src768px: Dark768px,
            src1024px: Dark1024px,
            src1640px: Dark1640px
          }
        }}
      />
    </div>
  );
}
