import { FaUserFriends, FaSearch, FaTrashAlt, FaSyncAlt, FaMobileAlt } from 'react-icons/fa';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Organize Your Contacts <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                The Smart Way
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              ContactMate helps you store, manage, and access your contacts anytime, anywhere. 
              Simple, secure, and always at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/app"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* App Preview */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="/contact-app-screenshot.png" 
                alt="ContactMate app interface"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-70"></div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-200 rounded-full filter blur-3xl opacity-70"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your contacts effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FaUserFriends className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Management</h3>
              <p className="text-gray-600">
                Easily add, edit, and organize all your contacts in one place.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FaSearch className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Search</h3>
              <p className="text-gray-600">
                Find any contact in seconds with our powerful search feature.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FaTrashAlt className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-gray-600">
                Delete or update contacts with just a couple of taps.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FaSyncAlt className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h3>
              <p className="text-gray-600">
                Your contacts are saved locally and always accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Organize Your Contacts?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who manage their contacts with ContactMate.
          </p>
          <a
            href="/app"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Start Now - It's Free
          </a>
        </div>
      </section>

      {/* Testimonials (Optional) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Smith</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "ContactMate has simplified how I manage my business contacts. The search feature saves me so much time!"
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">AM</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Alice Martin</h4>
                  <p className="text-gray-600 text-sm">Freelancer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I love how clean and intuitive the interface is. It's exactly what I needed to organize my client contacts."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">DR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">David Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Sales Professional</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The local storage feature gives me peace of mind knowing my contacts are always available, even offline."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}