import { useState, useEffect } from "react";
import { Calculator, Plus, Trash2, Download, Pencil } from "lucide-react";
import { supabase } from '../../lib/supabase';
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [items, setItems] = useState([{ service: "", hours: 1, rate: 0, description: "" }]);
  const [notes, setNotes] = useState("");
  const [editingQuoteId, setEditingQuoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, [searchQuery, startDate, endDate]);

  const fetchQuotes = async () => {
    let query = supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (searchQuery) {
      query = query.or(`client_name.ilike.%${searchQuery}%,client_email.ilike.%${searchQuery}%`);
    }

    if (startDate) {
      query = query.gte("created_at", new Date(startDate).toISOString());
    }

    if (endDate) {
      query = query.lte("created_at", new Date(endDate).toISOString());
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching quotes:", error);
      return;
    }

    setQuotes(data || []);
  };

  const addItem = () => {
    setItems([...items, { service: "", hours: 1, rate: 0, description: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.hours * item.rate), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + tax;
  };

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setItems([{ service: "", hours: 1, rate: 0, description: "" }]);
    setNotes("");
    setEditingQuoteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const tax = subtotal * 0.1;
    const total = calculateTotal();

    const quoteData = {
      client_name: clientName,
      client_email: clientEmail,
      items,
      notes,
      subtotal,
      tax,
      total,
      user_id: (await supabase.auth.getUser()).data.user?.id
    };

    if (editingQuoteId) {
      const { error } = await supabase
        .from("quotes")
        .update(quoteData)
        .eq("id", editingQuoteId);

      if (error) {
        console.error("Error updating quote:", error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("quotes")
        .insert([quoteData]);

      if (error) {
        console.error("Error creating quote:", error);
        return;
      }
    }

    await fetchQuotes();
    resetForm();
  };

  const handleEdit = (quote) => {
    setEditingQuoteId(quote.id);
    setClientName(quote.client_name);
    setClientEmail(quote.client_email);
    setItems(quote.items);
    setNotes(quote.notes || "");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    const { error } = await supabase
      .from("quotes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting quote:", error);
      return;
    }

    await fetchQuotes();
  };

  const downloadPDF = async (quote) => {
    const doc = new jsPDF();
    doc.text("Service Quote", 10, 10);
    doc.text(`Client Name: ${quote.client_name}`, 10, 20);
    doc.text(`Client Email: ${quote.client_email}`, 10, 30);
    
    let y = 40;
    doc.text("Items:", 10, y);
    y += 10;
    quote.items.forEach((item, index) => {
      doc.text(`Service: ${item.service}`, 10, y);
      y += 10;
      doc.text(`Hours: ${item.hours}`, 10, y);
      y += 10;
      doc.text(`Rate: $${item.rate}`, 10, y);
      y += 10;
      doc.text(`Description: ${item.description}`, 10, y);
      y += 20;
    });
    
    doc.text(`Subtotal: $${quote.subtotal.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Tax (10%): $${quote.tax.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Total: $${quote.total.toFixed(2)}`, 10, y);
    y += 10;
    doc.text(`Notes: ${quote.notes}`, 10, y);
    
    const pdfBlob = doc.output('blob');
    saveAs(pdfBlob, `quote_${quote.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-inherit">Service Quote Generator</h1>
              <p className="text-inherit">Create and manage professional service quotes</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-inherit mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-inherit mb-2">
                  Client Email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Service Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-inherit">Services</h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-inherit mb-2">
                        Service
                      </label>
                      <input
                        type="text"
                        value={item.service}
                        onChange={(e) => updateItem(index, "service", e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-inherit mb-2">
                        Hours
                      </label>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={item.hours}
                        onChange={(e) => updateItem(index, "hours", parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-inherit	 mb-2">
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(e) => updateItem(index, "rate", parseFloat(e.target.value))}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-inherit mb-2">
                      Description
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => updateItem(index, "description", e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={2}
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-inherit mb-2">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between text-inherit">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-inherit">
                  <span>Tax (10%):</span>
                  <span>${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-inherit">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingQuoteId ? "Update Quote" : "Save Quote"}
            </button>
          </form>
        </div>

        {/* Search and Date Filtering */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-inherit mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by client name or email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-inherit mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-inherit mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Saved Quotes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-inherit">Client</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-inherit">Email</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-inherit">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-inherit">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-inherit">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-inherit">{quote.client_name}</td>
                    <td className="px-4 py-3 text-sm text-inherit">{quote.client_email}</td>
                    <td className="px-4 py-3 text-sm text-inherit text-right">
                      ${quote.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm text-inherit">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(quote)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => downloadPDF(quote)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleDelete(quote.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;