```typescript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { SearchBar } from '../SearchBar';
import { LanguageSelector } from '../LanguageSelector';
import { UserCircle } from 'lucide-react';
import { ServiceList } from '../services/ServiceList';
import { mockServices } from '../../data/services';

export function HomePage() {
  const { isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredServices = mockServices.filter(service => 
    (selectedCategory === 'all' || service.category === selectedCategory) &&
    (searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Adventure Booking
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            {isAuthenticated() ? (
              <Link 
                to="/dashboard" 
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2070')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow">
            Book fitness classes, wellness sessions, and outdoor activities all in one place
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-4">Available Services</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Browse and book from our wide selection of services. Earn reward points with every booking!
          </p>
        </div>

        <ServiceList services={filteredServices} />
      </section>
    </div>
  );
}
```