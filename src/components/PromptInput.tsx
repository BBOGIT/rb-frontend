import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export function PromptInput({ prompt, setPrompt }: PromptInputProps) {
  return (
    <div className="w-full mb-6">
      <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
        Prompt
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
        placeholder="Enter your prompt here..."
      />
    </div>
  );
}