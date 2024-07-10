import Document, { Html, Head, Main, NextScript } from 'next/document';
const gtag= 'G-SC64X5RNW0';

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
          <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag}`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${gtag}, {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
    
        </Head>     
        <body className='Default'>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
