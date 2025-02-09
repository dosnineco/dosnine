import '../styles/globals.css';
import Layout from "../components/Misc/Layout";
import Header from 'components/Headers/Header';
import Footer from 'components/Footers/Footer';
import PageViewTracker from "components/Misc/PageViewTracker";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const isIndexPage = router.pathname === '/' || router.pathname === '/register';

  return (
    <ClerkProvider {...pageProps}>
       <PageViewTracker />

      {isIndexPage ? (
        <Layout className="container mx-auto px-4 py-8">
          <Header />
          <Component {...pageProps} />
          <Footer />

        </Layout>
      ) : (
        <>
          <SignedOut>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-center">
             
                <p className="text-xl text-inherit mb-6">Please sign in to continue.</p>
                <div className="flex space-x-4 justify-center">
                  <SignInButton>
                    <button className="px-6 py-3 text-white bg-primary-color  rounded-lg shadow-lg ">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-6 py-3 text-white bg-primary-color  rounded-lg shadow-lg ">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <Header />
            {/* <Breadcrumbs /> */}
            <Layout className="container mx-auto px-4 py-8">
              <Component {...pageProps} />
            </Layout>
            <Footer />
          </SignedIn>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;
