'use client';

import { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import ObjectionCard from '../components/ObjectionCard';

interface Background {
  background: string[];
  objection: string;
}

interface GenerationResult {
  objections: Background[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateContent = async () => {
    console.log('Generating content');
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Sending request to API');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scenario: `Fine Vintage Wine Tour Sales Practice: Practicing Objection Handling with Chris Voss Techniques
          What's the Point?
          We're going to practice handling a variety of common objections using communication techniques developed by Chris Voss, a former FBI hostage negotiator. This will help us improve our ability to connect with potential customers and address their concerns effectively.
          Chris Voss's Talking Tricks 
          Mirroring: Repeat key phrases to encourage elaboration (e.g., "Not a serious wine collector?").
          Late-Night DJ Voice: Calm, slow, confident tone.
          What We're Selling:
          A curated, high-quality wine tour through Fine Vintage.`
        }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate content: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error in generateContent:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-generate content on page load
  useEffect(() => {
    generateContent();
    
    // Prevent scrolling for kiosk mode
    document.body.style.overflow = 'hidden';
    
    // Set up auto-refresh every 30 minutes (1800000 ms)
    const refreshInterval = setInterval(() => {
      generateContent();
    }, 1800000);
    
    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-auto bg-gradient-to-br from-indigo-950 to-blue-900 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 tracking-tight">
          Sales Objection Practice
        </h1>
        
        <div className="w-full backdrop-blur-xl backdrop-saturate-150 rounded-2xl border border-white/[0.08] shadow-2xl">
          {isLoading ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-pulse border border-white/20">
              <div className="mb-4">
                <div className="h-6 w-3/4 bg-white/20 rounded mb-3"></div>
                <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 w-4/6 bg-white/20 rounded"></div>
              </div>
              <div className="border-t border-white/20 my-4 pt-4">
                <div className="h-6 w-3/4 bg-white/20 rounded mb-3"></div>
                <div className="h-4 w-full bg-white/20 rounded"></div>
              </div>
              <div className="flex justify-end mt-6">
                <div className="h-10 w-10 rounded-full bg-white/20"></div>
              </div>
            </div>
          ) : (
            <>
              {result && result.objections && result.objections.length > 0 && (
                <ObjectionCard 
                  objection={result.objections[0].objection}
                  background={result.objections[0].background}
                  onRefresh={generateContent}
                />
              )}
            </>
          )}
          
          {error && (
            <div className="bg-red-800/50 border border-red-400 text-white px-4 py-3 rounded mt-6">
              <p>{error}</p>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <p className="mb-4 text-white/80 text-sm">Not an interesting objection? Try another one.</p>
          <button 
            onClick={generateContent}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-blue-600/90 hover:bg-blue-500/90 text-white/90 hover:text-white rounded-full transition-all shadow-lg hover:shadow-blue-500/25"
            disabled={isLoading}
          >
            <FiRefreshCw className={`${isLoading ? 'animate-spin' : ''}`} />
            <span className="font-medium">Get new objection</span>
          </button>
        </div>
      </div>
    </main>
  );
}