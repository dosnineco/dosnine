
export default function Footer() {
    return (
      <footer className=" py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-inherit text-sm">
            © {new Date().getFullYear()} Powered By Dosnine™
          </p>

        </div>
      </footer>
    );
  }