import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/images/logo-abbr.png" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="The most radical storm tracking site on the planet."
          />
          <meta property="og:title" content="Storms.watch" />

          <meta property="og:url" content="https://storms.watch" />

          <meta
            property="og:description"
            content="The most radical storm tracking site on the planet."
          />

          <meta
            property="og:image"
            content="https://storms.watch/images/logo-abbr.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}

export default CustomDocument;
