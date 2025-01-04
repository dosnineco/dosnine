// pages/dashboard.js
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto bg-white  rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/email-template">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Email Template</h2>
              <p className="text-gray-700">Create and manage your email templates.</p>
          </Link>
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/texttoexcel">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Text to Excel</h2>
              <p className="text-gray-700">Convert text data to Excel format easily.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}