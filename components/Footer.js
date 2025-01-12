
export default function Footer() {
    return (
      <footer className=" py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-100 text-sm">
            © {new Date().getFullYear()} All rights reserved <div className="inline-flex items-center">
          {/* <img src="/logo.png" alt="logo" className="inline-flex items-center h-5 w-6 mr-2" />. */}
        </div> Powered By Dosnine™
          </p>

        </div>
      </footer>
    );
  }