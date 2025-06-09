'use client'

import { useState, useEffect } from "react";
import { Bot, Settings, Info } from "lucide-react";

interface STTConfig {
  providers: {
    [key: string]: {
      name: string;
      models: {
        [key: string]: {
          name: string;
          languages: {
            [key: string]: string;
          };
        };
      };
    };
  };
}

export default function AgentPage() {
  const [config, setConfig] = useState<STTConfig | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    // Load STT config
    const sttConfig: STTConfig = {
      providers: {
        deepgram: {
          name: "Deepgram",
          models: {
            "nova-2": {
              name: "Nova-2",
              languages: {
                "en-US": "English-US",
                "en-IN": "English-India",
                "hi": "Hindi",
                "ta": "Tamil"
              }
            },
            "whisper": {
              name: "Whisper",
              languages: {
                "en-US": "English-US",
                "hi": "Hindi"
              }
            }
          }
        },
        openai: {
          name: "OpenAI",
          models: {
            "whisper-1": {
              name: "Whisper-1",
              languages: {
                "en": "English",
                "hi": "Hindi",
                "ta": "Tamil",
                "te": "Telugu"
              }
            }
          }
        },
        azure: {
          name: "Azure Speech",
          models: {
            "standard": {
              name: "Standard",
              languages: {
                "en-US": "English-US",
                "en-IN": "English-India",
                "hi-IN": "Hindi-India",
                "ta-IN": "Tamil-India"
              }
            },
            "neural": {
              name: "Neural",
              languages: {
                "en-US": "English-US",
                "hi-IN": "Hindi-India"
              }
            }
          }
        }
      }
    };

    setConfig(sttConfig);

    // Load saved configuration
    const saved = localStorage.getItem("propal_agent_config");
    if (saved) {
      const { provider, model, language } = JSON.parse(saved);
      setSelectedProvider(provider);
      setSelectedModel(model);
      setSelectedLanguage(language);
    }
  }, []);

  useEffect(() => {
    // Save configuration when it changes
    if (selectedProvider && selectedModel && selectedLanguage) {
      localStorage.setItem("propal_agent_config", JSON.stringify({
        provider: selectedProvider,
        model: selectedModel,
        language: selectedLanguage
      }));
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel("");
    setSelectedLanguage("");
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedLanguage("");
  };

  const getAvailableModels = () => {
    if (!config || !selectedProvider) return {};
    return config.providers[selectedProvider]?.models || {};
  };

  const getAvailableLanguages = () => {
    if (!config || !selectedProvider || !selectedModel) return {};
    return config.providers[selectedProvider]?.models[selectedModel]?.languages || {};
  };

  const getDisplayName = (type: 'provider' | 'model' | 'language', key: string) => {
    if (!config) return key;
    
    switch (type) {
      case 'provider':
        return config.providers[key]?.name || key;
      case 'model':
        return selectedProvider ? config.providers[selectedProvider]?.models[key]?.name || key : key;
      case 'language':
        return selectedProvider && selectedModel 
          ? config.providers[selectedProvider]?.models[selectedModel]?.languages[key] || key 
          : key;
      default:
        return key;
    }
  };

  if (!config) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <Bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Agent Configuration</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">STT Configuration</h2>
            </div>

            <div className="space-y-6">
              {/* Provider Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Provider
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => handleProviderChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Provider</option>
                  {Object.entries(config.providers).map(([key, provider]) => (
                    <option key={key} value={key}>
                      {provider.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => handleModelChange(e.target.value)}
                  disabled={!selectedProvider}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Model</option>
                  {Object.entries(getAvailableModels()).map(([key, model]) => (
                    <option key={key} value={key}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  disabled={!selectedModel}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select Language</option>
                  {Object.entries(getAvailableLanguages()).map(([key, language]) => (
                    <option key={key} value={key}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Info className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Configuration Summary</h2>
            </div>

            {selectedProvider && selectedModel && selectedLanguage ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Provider</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getDisplayName('provider', selectedProvider)} ({selectedProvider})
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Model</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getDisplayName('model', selectedModel)} ({selectedModel})
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Language</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {getDisplayName('language', selectedLanguage)} ({selectedLanguage})
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Configuration saved automatically</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select provider, model, and language to see configuration summary
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
