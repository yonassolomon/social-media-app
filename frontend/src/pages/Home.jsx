import React from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-blue-600">
              Social Media App
            </h1>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                Welcome, {user?.username}!
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
          <p className="text-gray-600">
            Welcome to your social media feed! This is where posts will appear.
          </p>
          
          {/* Create Post Box */}
          <div className="mt-6 border-t pt-6">
            <textarea
              placeholder="What's on your mind?"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Post
            </button>
          </div>

          {/* Sample Post */}
          <div className="mt-6 border-t pt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
                <span className="ml-3 font-semibold">{user?.username}</span>
              </div>
              <p className="text-gray-700">
                This is a sample post. Soon you'll see real posts from the API!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;