import { useState, useEffect } from 'react';
import { supabase } from '/lib/supabase';
import { useUser } from '@clerk/nextjs';
import imageCompression from 'browser-image-compression';

export default function CreatePropertyForm() {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    location: '',
    images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Compress images before uploading
      const compressedImages = await Promise.all(
        Array.from(formData.images).map(async (file) => {
          const options = {
            maxSizeMB: 1, // maximum size in MB
            maxWidthOrHeight: 1024, // maximum width or height in pixels
            useWebWorker: true,
          };
          return await imageCompression(file, options);
        })
      );

      // Convert image to base64 before storing in the database
      const imageBase64 = await Promise.all(
        compressedImages.map(async (file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file); // Convert the file to base64
          return new Promise((resolve, reject) => {
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
          });
        })
      );

      // Insert property record with base64-encoded image data
      const { error } = await supabase
        .from('properties')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          bedrooms: parseInt(formData.bedrooms),
          bathrooms: parseInt(formData.bathrooms),
          sqft: parseInt(formData.sqft),
          location: formData.location,
          images: imageBase64 // Store the base64 images directly in the database
        });

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      {['title', 'description', 'price', 'bedrooms', 'bathrooms', 'sqft', 'location'].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type={['price', 'bedrooms', 'bathrooms', 'sqft'].includes(field) ? 'number' : 'text'}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Uploading...' : 'List Property'}
      </button>
    </form>
  );
}
