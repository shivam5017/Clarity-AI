'use client';
import React, { useState } from 'react';

const YoutubeHashtags = ({ setInputText }) => {
  const [competitionLevel, setCompetitionLevel] = useState('trending');
  const [selectedNiche, setSelectedNiche] = useState('');

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
    setInputText(`Find best YouTube hashtags for my Niche: ${type === 'niche' ? value : selectedNiche} with ${type === 'competition' ? value : competitionLevel} competition value of Hastags`);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mb-2">
        Select your YouTube niche
      </label>
      <select
        className="px-4 py-3 w-full border border-gray-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400 transition duration-200"
        onChange={(e) => handleChange('niche', e.target.value)}
      >
        <option value="">Select a niche</option>
        {niches.map((niche, index) => (
          <option key={index} value={niche}>{niche}</option>
        ))}
      </select>

      <label className="block text-sm font-medium text-gray-700 dark:text-neutral-200 mt-4 mb-2">
        Trending/Low Hashtags Level
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

export default YoutubeHashtags;
