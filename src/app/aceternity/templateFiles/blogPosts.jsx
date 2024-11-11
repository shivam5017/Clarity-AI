'use client';
import React, { useState } from 'react';

const BlogPostTemplate = ({ setInputText }) => {
  const [competitionLevel, setCompetitionLevel] = useState('trending');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [userInput,setUserInput]=useState('');

  const niches = [
    "Tech and Gadgets", "Gaming", "Beauty and Fashion", "Health and Fitness",
    "Vlogging", "Education and Tutorials", "Cooking and Food", "Travel",
    "Music", "Finance and Business", "DIY and Crafts", "Comedy and Entertainment",
    "Science and Tech Reviews", "Motivational and Self-Improvement", "Sports and Outdoor Activities",
    "Pets and Animal Care", "Documentary and Storytelling", "ASMR and Relaxation",
    "Automotive", "Spirituality and Mindfulness"
  ];

  const handleChange = (type, value) => {
    if (type === 'niche') setSelectedNiche(value);
    if (type === 'competition') setCompetitionLevel(value);
    if(type === 'userInput') setUserInput(value);
    setInputText(`Generate a blog post template for the niche: ${type === 'niche' ? value : selectedNiche} with ${type === 'competition' ? value : competitionLevel} competition level. More Info ${type==='userInput'?value:userInput}`);
  };
  

  return (
    <div>
        <input
           type="text"
            placeholder="Enter More Specific Info about blog"
           className="px-4 py-3 w-full border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400 transition duration-200"
          onChange={(e)=>handleChange('userInput',e.target.value)}
          />
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-2 mt-4">
        Select your Blog Post niche
      </label>
      <select
        className="px-4 py-3 w-full border border-gray-300  dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400 transition duration-200"
        onChange={(e) => handleChange('niche', e.target.value)}
      >
        <option value="">Select a niche</option>
        {niches.map((niche, index) => (
          <option key={index} value={niche}>{niche}</option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mt-4 mb-2">
        Trending/Low Competition Level
      </label>
      <select
        className="px-4 py-3 w-full border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400 transition duration-200"
        onChange={(e) => handleChange('competition', e.target.value)}
      >
        <option value="trending">Trending</option>
        <option value="low">Low Competition</option>
      </select>
    </div>
  );
};

export default BlogPostTemplate;
