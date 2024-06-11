// pages/api/search.js
import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const { query } = request.query;
    if (!query) throw new Error('Query is required');

    // Users
    const users = await sql`
      SELECT * FROM Users WHERE Name ILIKE ${'%' + query + '%'} OR Email ILIKE ${'%' + query + '%'} OR Location ILIKE ${'%' + query + '%'};
    `;
    
    // Banks
    const banks = await sql`
      SELECT * FROM Banks WHERE BankName ILIKE ${'%' + query + '%'} OR Country ILIKE ${'%' + query + '%'};
    `;
    
    // Loan Agencies
    const loanAgencies = await sql`
      SELECT * FROM LoanAgencies WHERE AgencyName ILIKE ${'%' + query + '%'} OR Country ILIKE ${'%' + query + '%'};
    `;
    
    // Loans
    const loans = await sql`
      SELECT * FROM Loans WHERE LoanType ILIKE ${'%' + query + '%'} OR EligibilityCriteria ILIKE ${'%' + query + '%'} OR AdditionalInfo ILIKE ${'%' + query + '%'};
    `;
    
    // Reviews
    const reviews = await sql`
      SELECT * FROM Reviews WHERE Comment ILIKE ${'%' + query + '%'};
    `;
    
    // User Preferences
    const userPreferences = await sql`
      SELECT * FROM UserPreferences WHERE PreferredBanks ILIKE ${'%' + query + '%'} OR PreferredAgencies ILIKE ${'%' + query + '%'};
    `;
    
    return response.status(200).json({ users, banks, loanAgencies, loans, reviews, userPreferences });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
