import Translate from "@docusaurus/Translate";
import JunoLogo from "@site/static/img/logo.svg";
import styles from "./styles.module.scss";

export const NotFound = () => {
  return (
    <main className="container margin-vert--xl">
      <div className="row">
        <div className="col col--6 col--offset-3">
          <p className={styles.text404}>
            4<JunoLogo />4
          </p>
          <h1 className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page"
            >
              Oops! You got lost in space.
            </Translate>
          </h1>
          <p>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page"
            >
              We could not find what you were looking for.
            </Translate>
          </p>
          <p>
            <Translate
              id="theme.NotFound.p2"
              description="The 2nd paragraph of the 404 page"
            >
              Please contact the owner of the site that linked you to the
              original URL and let them know their link is broken.
            </Translate>
          </p>
        </div>
      </div>
    </main>
  );
};
