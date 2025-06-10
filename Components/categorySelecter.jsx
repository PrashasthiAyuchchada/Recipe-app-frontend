import React from 'react';

const CategorySelector = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-4 justify-center mb-6 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full border text-sm ${
            selected === category ? 'bg-pink-500 text-white' : 'border-pink-500 text-pink-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;