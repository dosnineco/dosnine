import '../styles/globals.css';
import Layout from "../components/Layout";
import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

function MyApp({ Component, pageProps }) {

  return(
    <>
      <ClerkProvider {...pageProps}>
      <SignedOut>
       <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">Automate the dump stuff!</h1>
        <p className="text-xl text-gray-700 mb-6">Please sign in to continue.</p>
        <SignInButton/>
        <SignUpButton/>
        </div>
        </div>

      </SignedOut>


      <SignedIn>
          <Header/>
            <Layout className="container mx-auto px-4 py-8">
              <Component {...pageProps} />
            </Layout>
          <Footer/> 
      </SignedIn>
      </ClerkProvider>
    </>
  )
}



export default MyApp;



