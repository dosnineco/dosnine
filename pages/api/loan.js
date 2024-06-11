// pages/api/loans.js
import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const loan = await sql`SELECT * FROM Loan;`;
      return response.status(200).json({ loan });
    }
    
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
