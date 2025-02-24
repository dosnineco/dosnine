import Document, { Html, Head, Main, NextScript } from 'next/document';
const gtag= 'G-SC64X5RNW0';

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
          <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
          <meta name="theme-color" content="#ffffff"/>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id='G-SC64X5RNW0'`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SC64X5RNW0', {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id='AW-11063925737'`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'AW-11063925737', {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
    
        </Head>     
        <body className="snap-y snap-mandatory h-screen overflow-y-scroll Default ">
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
