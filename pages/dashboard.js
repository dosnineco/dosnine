// pages/dashboard.js
import Link from "next/link";



// Invoice Generator: Create and send branded invoices effortlessly.
// Performance Dashboard: Tracks metrics like website traffic, leads, and conversions.
// Service Profitability Calculator: Helps determine which services are most profitable.
// Time Tracker: Track billable hours for service-based tasks.
// Live Chat Integration: Real-time support for client inquiries.
// Email Template Library: Pre-written professional email templates for client communication.
// WhatsApp Business Integration: Centralize communication with clients via WhatsApp.
// Proposal Builder: Generate service proposals and contracts with a few clicks.
// Document Signature Tool: Enable clients to e-sign agreements or contracts.
// Appointment Tracking for Beauty/Wellness Services: Tailored solutions for spas, salons, etc.
// Service Quoting Tool for Contractors: Automatically calculate and send service quotes.


export default function Dashboard() {
  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto bg-white  rounded-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-6 sm:grid-cols-1">
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/email-template">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Email Template</h2>
              <p className="block text-sm font-medium text-gray-700 mb-1">Create and manage your email templates.</p>
          </Link>
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/texttoexcel">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Text to Excel</h2>
              <p className="block text-sm font-medium text-gray-700 mb-1">Convert text data to Excel format easily.</p>
          </Link>
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/quote">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Service Quoting Tool</h2>
              <p className="block text-sm font-medium text-gray-700 mb-1">Automatically calculate service quotes.</p>
          </Link>
          <Link className="block p-6 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100" href="/salary-to-hourly">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Salary Calculator</h2>
              <p className="block text-sm font-medium text-gray-700 mb-1">Automatically calculate Salaries</p>
          </Link>
        </div>
      </div>
    </div>
  );
}