```typescript
import React from 'react';
import { SearchBar } from '../../SearchBar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isScrolled: boolean;
}

export function Header({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  isScrolled 
}: HeaderProps) {
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'fitness', name: 'Fitness' },
    { id: 'wellness', name: 'Wellness' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'sports', name: 'Sports' },
  ];

  return (
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
            onChange={onSearchChange} 
          />
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-2 rounded-full transition-colors border ${
                selectedCategory === category.id
                  ? 'bg-white text-blue-600 border-white'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```