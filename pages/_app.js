// pages/_app.js
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
