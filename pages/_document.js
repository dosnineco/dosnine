import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

 
  render() {
    return (
      <Html lang="en">
          <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-SC64X5RNWO`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SC64X5RNWO', {
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
