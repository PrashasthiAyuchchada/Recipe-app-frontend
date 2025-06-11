import React from 'react';

const CategorySelector = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-4 justify-center mb-8 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-6 py-3 rounded-full border text-base font-medium transition-all duration-200 ${
            selected === category
              ? 'bg-pink-500 text-white'
              : 'border-pink-500 text-pink-500 hover:bg-pink-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
