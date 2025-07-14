import { FaUsers, FaShieldAlt, FaMobileAlt, FaRocket, FaHeart } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { motion } from 'framer-motion';
import teamMembers from '../data/team.jsx'; // You'll create this

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About ContactMate
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your trusted companion for seamless contact management
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            To revolutionize contact management by providing an intuitive, secure, and accessible 
            platform that simplifies your personal and professional connections.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaUsers className="text-4xl text-blue-600 mb-4" />,
              title: "User-Centric Design",
              description: "Built with your needs in mind for effortless navigation and operation."
            },
            {
              icon: <FaShieldAlt className="text-4xl text-purple-600 mb-4" />,
              title: "Privacy First",
              description: "Your data stays yours. We implement robust security measures."
            },
            {
              icon: <FaMobileAlt className="text-4xl text-indigo-600 mb-4" />,
              title: "Cross-Platform",
              description: "Access your contacts anywhere, anytime, on any device."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose ContactMate?</h2>
          
          <div className="space-y-12">
            {[
              {
                title: "Intuitive Interface",
                description: "Designed for users of all technical levels with a clean, organized layout.",
                icon: "👆"
              },
              {
                title: "Powerful Search",
                description: "Find any contact instantly with our lightning-fast search functionality.",
                icon: "🔍"
              },
              {
                title: "Secure Storage",
                description: "Military-grade encryption keeps your contact data safe and private.",
                icon: "🔒"
              },
              {
                title: "Offline Access",
                description: "Access your contacts even without an internet connection.",
                icon: "📴"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                <div className="text-6xl w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md">
                  {feature.icon}
                </div>
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="p-6 text-center -mt-16">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden shadow-md">
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mt-4 text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.bio}</p>
                <div className="flex justify-center space-x-3 mt-4">
                  {member.socials.map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FaHeart className="text-4xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Organize Your Contacts?</h2>
          <p className="text-xl mb-8">
            Join thousands of happy users who simplified their contact management with ContactMate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <FiDownload /> Get the App
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}