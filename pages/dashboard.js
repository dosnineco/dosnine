import Link from "next/link";
import { useUser } from '@clerk/nextjs';

export default function Dashboard() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white  p-6">
        <div className="flex justify-between items-center mb-3">
        <p className="text-3xl font-bold text-gray-900" >Welcome back, {user.fullName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:grid-cols-1">
          <Link className="box-shadow block p-6 bg-white    hover:bg-blue-100" href="/website-traffic">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Website Analytics</h2>
            <p className="block text-sm font-medium text-gray-700 mb-1">See your website data.</p>
          </Link>

          <Link className="box-shadow block p-6 bg-white    hover:bg-blue-100" href="/texttoexcel">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Text to Excel</h2>
            <p className="block text-sm font-medium text-gray-700 mb-1">Convert text data to Excel format easily.</p>
          </Link>

          <Link className="box-shadow block p-6 bg-white    hover:bg-blue-100" href="/quote">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Service Quoting Tool</h2>
            <p className="block text-sm font-medium text-gray-700 mb-1">Automatically calculate service quotes.</p>
          </Link>
          <Link className="box-shadow block p-6 bg-white    hover:bg-blue-100" href="/email-template">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Email template Tool</h2>
            <p className="block text-sm font-medium text-gray-700 mb-1">Save commonly sent emails.</p>
          </Link>

          <Link className="box-shadow block p-6 bg-white    hover:bg-blue-100" href="/salary-to-hourly">
            <h2 className="mb-2 text-xl font-semibold text-gray-900">Salary Calculator</h2>
            <p className="block text-sm font-medium text-gray-700 mb-1">Automatically calculate Salaries</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
