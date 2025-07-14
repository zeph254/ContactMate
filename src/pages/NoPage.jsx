export default function NoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mb-6">The page you are looking for does not exist / is temporarily unavailable/still under development.</p>
      <a 
        href="/" 
        className="text-blue-600 hover:text-blue-800 transition duration-300"
      >
        Go back to Home
      </a>
    </div>
  );
}