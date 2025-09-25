import React, { useState } from 'react';
import { 
  Globe, 
  Shirt, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin,
  Menu,
  X,
  Zap,
  Users,
  Award
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [websiteQuantity, setWebsiteQuantity] = useState(1);
  const [capQuantity, setCapQuantity] = useState(1);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const websitePrice = 38500;
  const capPrice = 11500;

  return (
    <div className="w-full  min-h-screen ">
      
      <section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-pulse">
              🇯🇲 Proudly Serving Jamaica
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Affordable Websites &<br />
              <span className="text-blue-600 ">
                Custom Logo Merchandise
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional web design and branded merchandise solutions for Jamaican businesses. 
              Fast turnaround, mobile-friendly designs, and premium quality products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#services" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a 
                href="#pricing" 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </section>

  

      {/* Services Section */}
      <section id="services" className="py-4 px-2 bg-blue-50 rounded mt-20">
        <div className="w-full max-w-7xl mx-auto ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete digital solutions to help your business thrive online and offline
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Website Design */}
            <div className="bg-white rounded-3xl p-8 shadow-sm ">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Website Design</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Professional, responsive websites to boost your business online. Perfect for service-based businesses, 
                fast turnaround, and mobile-friendly designs that convert visitors into customers.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Mobile-responsive design</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">SEO optimized</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Fast loading speeds</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Professional design</span>
                </div>
              </div>
              <div className="text-xl font-bold text-blue-600 mb-4">
                Starting at JMD $38,500
              </div>
            </div>

            {/* Custom Logo Caps */}
            <div className="bg-white rounded-3xl p-8 shadow-sm h">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded flex items-center justify-center mr-4">
                  <Shirt className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Custom Logo Caps</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Get your logo printed on high-quality caps. Great for branding, staff uniforms, 
                promotional events, and building brand recognition in your community.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">High-quality materials</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Professional htv material</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Multiple color options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Bulk discounts available</span>
                </div>
              </div>
              <div className="text-xl font-bold text-green-600 mb-4">
                JMD $11,500 per dozen
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customize Your Order</h2>
            <p className="text-xl text-gray-600">Calculate your total investment and get started today</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Website Calculator */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Websites</h3>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <select 
                    value={websiteQuantity}
                    onChange={(e) => setWebsiteQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value={0}> No website</option>
                    <option value={1}>1 website</option>
                    <option value={2}>2 websites</option>
                    <option value={3}>3 websites</option>
                    <option value={4}>4 websites</option>
                    <option value={5}>5+ websites</option>
                  </select>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  JMD ${(websitePrice * websiteQuantity).toLocaleString()}
                </div>
              </div>

              {/* Caps Calculator */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <Shirt className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Logo Caps</h3>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (dozens)</label>
                  <select 
                    value={capQuantity}
                    onChange={(e) => setCapQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value={1}>1 dozen caps</option>
                    <option value={2}>2 dozen caps</option>
                    <option value={3}>3 dozen caps</option>
                    <option value={4}>4 dozen caps</option>
                    <option value={5}>5+ dozen caps</option>
                  </select>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  JMD ${(capPrice * capQuantity).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Total Investment</h3>
              <div className="text-4xl font-bold mb-4">
                JMD ${((websitePrice * websiteQuantity) + (capPrice * capQuantity)).toLocaleString()}
              </div>
              <p className="text-blue-100 mb-6">Professional package to grow your business</p>
              <a 
                href="#contact" 
                className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Order Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="w-full py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Dosnine Media, we understand that every Jamaican business deserves a strong online presence 
                and professional branding. Our affordable solutions help you compete with larger companies 
                while maintaining that personal touch your customers love.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700 text-lg">100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700 text-lg">Local support and service</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700 text-lg">Affordable pricing for all budgets</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose Dosnine Media?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Locally owned and operated</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Understanding of Jamaican market</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Competitive pricing</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                    <span>Ongoing support and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get Your Professional Website and Branded Merchandise Today
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Ready to take your business to the next level? Contact us now for a free consultation 
            and quote tailored to your specific needs.
          </p>

        
          <a 
            href="https://wa.me/18763369045" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Phone className="mr-3 w-6 h-6" />
            Contact Us on WhatsApp
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </a>

          <p className="text-blue-100 mt-6 text-sm">
            Free consultation • Fast quotes • Professional service
          </p>
  <a 
            href="/vector" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Phone className="mr-3 w-6 h-6" />
            Vectorize
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </a>
          
                  </div>
      </section>

      
    </div>
  );
}

export default App;