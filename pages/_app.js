import '../styles/globals.css';
import Layout from "../components/Layout";
import Header from 'components/Header';
import Footer from 'components/Footer';
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

  const isIndexPage = router.pathname === '/';

  return (
    <ClerkProvider {...pageProps}>
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
                <h1 className="text-4xl font-semibold text-gray-900 mb-6">Your Shortcut to a Smoother Email Workflow!</h1>
                <p className="text-xl text-gray-700 mb-6">Please sign in to continue.</p>
                <div className="flex space-x-4 justify-center">
                  <SignInButton>
                    <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-6 py-3 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <Header />
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
