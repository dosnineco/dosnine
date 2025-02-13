import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Pagination from '../../components/Misc/Pagination';
import CreatePropertyForm from '../../components/Property/CreatePropertyForm';

const ITEMS_PER_PAGE = 9;

function PropertyCard({ property }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <img
        src={property.image_urls?.[0] || '/placeholder.jpg'}
        alt={property.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4">
        <h2 className="text-lg font-bold">{property.title}</h2>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-semibold mt-2">${property.price}</p>
        <p className="text-gray-500 text-sm">
          {property.bedrooms} beds • {property.bathrooms} baths • {property.sqft} sqft
        </p>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const from = (page - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('properties')
        .select('id, title, description, price, bedrooms, bathrooms, sqft, location, image_urls', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data);
      setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const handlePropertyCreated = () => {
    setPage(1); // Reset to the first page
    fetchProperties(); // Refetch properties
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Properties</h1>
      <CreatePropertyForm onPropertyCreated={handlePropertyCreated} />
      
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties?.length > 0 ? (
              properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">No properties found.</div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}