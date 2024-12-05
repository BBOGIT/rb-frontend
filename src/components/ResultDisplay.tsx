import React from 'react';

interface ApiResponse {
  success: boolean;
  result: string;
  image: {
    data: string;
    contentType: string;
  };
}

interface ResultDisplayProps {
  result: ApiResponse | null;
  error: string | null;
  isLoading: boolean;
}

export function ResultDisplay({ result, error, isLoading }: ResultDisplayProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (result && result.success) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-50 text-green-700 rounded-lg">
          <h3 className="font-semibold mb-2">Recognized:</h3>
          <p>{result.result}</p>
        </div>
        
        {result.image && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-gray-700">Processed Image:</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={result.image.data} 
                alt="Processed screenshot"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}