import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {

 
  render() {
    return (
      <Html lang="en">
          <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-M2GFWEF7NY`}
          />           
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-M2GFWEF7NY', {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
                    <link
            rel="prefetch"
            href='/font/OpenSans/OpenSans-ExtraBold.ttf'
            as='font'
            crossOrigin="anonymous"
            type="font/ttf"
          />

            <link
            rel="prefetch"
            href='/font/Roboto/Roboto-Regular.ttf'
            as='font'
            crossOrigin="anonymous"
            type="font/ttf"
          />
          <link
            rel="prefetch"
            href='/font/Roboto/Roboto-Bold.ttf'
            as='font'
            crossOrigin="anonymous"
            type="font/ttf"
          />
          <link
            rel="prefetch"
            href='/font/Roboto/Roboto-Medium.ttf'
            as='font'
            crossOrigin="anonymous"
            type="font/ttf"
          />
                    
        </Head>     
        <body className='theme-gray-peach'>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument