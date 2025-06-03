import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicInfo from '../components/generator/BasicInfo';
import Features from '../components/generator/Features';
import Settings from '../components/generator/Settings';
import CustomPostTypes from '../components/generator/CustomPostTypes';
import Shortcodes from '../components/generator/Shortcodes';
import RestApi from '../components/generator/RestApi';
import Database from '../components/generator/Database';
import { generatePluginFiles } from '../utils/pluginGenerator';

function Generator() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [pluginData, setPluginData] = useState({
    basic: {
      name: '',
      slug: '',
      description: '',
      author: '',
      authorUri: '',
      version: '1.0.0',
      requiresWp: '5.0',
      requiresPhp: '7.0',
      license: 'GPL-2.0+',
    },
    features: {
      adminPage: false,
      settings: false,
      customPostTypes: false,
      customTaxonomies: false,
      shortcodes: false,
      widgets: false,
      restApi: false,
      database: false,
      cron: false,
      userRoles: false,
      blocks: false,
      email: false,
      ajax: false,
    },
    settings: {
      settingsGroups: [],
    },
    customPostTypes: {
      types: [],
    },
    shortcodes: {
      codes: [],
    },
    restApi: {
      endpoints: [],
    },
    database: {
      tables: [],
    },
  });

  const updatePluginData = (section, data) => {
    setPluginData({
      ...pluginData,
      [section]: {
        ...pluginData[section],
        ...data,
      },
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGenerate = () => {
    // Generate plugin files and store in localStorage for preview
    const files = generatePluginFiles(pluginData);
    localStorage.setItem('generatedPlugin', JSON.stringify({
      pluginData,
      files,
    }));
    navigate('/preview');
  };

  const isBasicInfoComplete = () => {
    const { name, slug, description } = pluginData.basic;
    return name && slug && description;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfo data={pluginData.basic} updateData={(data) => updatePluginData('basic', data)} />;
      case 'features':
        return <Features data={pluginData.features} updateData={(data) => updatePluginData('features', data)} />;
      case 'settings':
        return pluginData.features.settings ? (
          <Settings data={pluginData.settings} updateData={(data) => updatePluginData('settings', data)} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg">Please enable Settings in the Features tab first.</p>
            <button 
              className="wp-button mt-4"
              onClick={() => {
                updatePluginData('features', { settings: true });
                setActiveTab('features');
              }}
            >
              Go to Features
            </button>
          </div>
        );
      case 'customPostTypes':
        return pluginData.features.customPostTypes ? (
          <CustomPostTypes data={pluginData.customPostTypes} updateData={(data) => updatePluginData('customPostTypes', data)} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg">Please enable Custom Post Types in the Features tab first.</p>
            <button 
              className="wp-button mt-4"
              onClick={() => {
                updatePluginData('features', { customPostTypes: true });
                setActiveTab('features');
              }}
            >
              Go to Features
            </button>
          </div>
        );
      case 'shortcodes':
        return pluginData.features.shortcodes ? (
          <Shortcodes data={pluginData.shortcodes} updateData={(data) => updatePluginData('shortcodes', data)} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg">Please enable Shortcodes in the Features tab first.</p>
            <button 
              className="wp-button mt-4"
              onClick={() => {
                updatePluginData('features', { shortcodes: true });
                setActiveTab('features');
              }}
            >
              Go to Features
            </button>
          </div>
        );
      case 'restApi':
        return pluginData.features.restApi ? (
          <RestApi data={pluginData.restApi} updateData={(data) => updatePluginData('restApi', data)} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg">Please enable REST API in the Features tab first.</p>
            <button 
              className="wp-button mt-4"
              onClick={() => {
                updatePluginData('features', { restApi: true });
                setActiveTab('features');
              }}
            >
              Go to Features
            </button>
          </div>
        );
      case 'database':
        return pluginData.features.database ? (
          <Database data={pluginData.database} updateData={(data) => updatePluginData('database', data)} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-lg">Please enable Database in the Features tab first.</p>
            <button 
              className="wp-button mt-4"
              onClick={() => {
                updatePluginData('features', { database: true });
                setActiveTab('features');
              }}
            >
              Go to Features
            </button>
          </div>
        );
      default:
        return <BasicInfo data={pluginData.basic} updateData={(data) => updatePluginData('basic', data)} />;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">WordPress Plugin Generator</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex flex-wrap">
            <button
              className={`wp-tab ${activeTab === 'basic' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
              onClick={() => handleTabChange('basic')}
            >
              Basic Info
            </button>
            <button
              className={`wp-tab ${activeTab === 'features' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
              onClick={() => handleTabChange('features')}
            >
              Features
            </button>
            {pluginData.features.settings && (
              <button
                className={`wp-tab ${activeTab === 'settings' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
                onClick={() => handleTabChange('settings')}
              >
                Settings
              </button>
            )}
            {pluginData.features.customPostTypes && (
              <button
                className={`wp-tab ${activeTab === 'customPostTypes' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
                onClick={() => handleTabChange('customPostTypes')}
              >
                Custom Post Types
              </button>
            )}
            {pluginData.features.shortcodes && (
              <button
                className={`wp-tab ${activeTab === 'shortcodes' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
                onClick={() => handleTabChange('shortcodes')}
              >
                Shortcodes
              </button>
            )}
            {pluginData.features.restApi && (
              <button
                className={`wp-tab ${activeTab === 'restApi' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
                onClick={() => handleTabChange('restApi')}
              >
                REST API
              </button>
            )}
            {pluginData.features.database && (
              <button
                className={`wp-tab ${activeTab === 'database' ? 'wp-tab-active' : 'wp-tab-inactive'}`}
                onClick={() => handleTabChange('database')}
              >
                Database
              </button>
            )}
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-between">
          <button
            className="wp-button bg-gray-500 hover:bg-gray-600"
            onClick={() => {
              if (activeTab === 'basic') {
                navigate('/');
              } else {
                const tabs = ['basic', 'features', 'settings', 'customPostTypes', 'shortcodes', 'restApi', 'database'];
                const currentIndex = tabs.indexOf(activeTab);
                if (currentIndex > 0) {
                  handleTabChange(tabs[currentIndex - 1]);
                }
              }
            }}
          >
            {activeTab === 'basic' ? 'Cancel' : 'Previous'}
          </button>
          
          <button
            className="wp-button"
            onClick={() => {
              const tabs = ['basic', 'features', 'settings', 'customPostTypes', 'shortcodes', 'restApi', 'database'];
              const currentIndex = tabs.indexOf(activeTab);
              
              if (activeTab === 'basic' && !isBasicInfoComplete()) {
                alert('Please fill in all required fields in Basic Info.');
                return;
              }
              
              if (currentIndex < tabs.length - 1) {
                // Find the next enabled tab
                for (let i = currentIndex + 1; i < tabs.length; i++) {
                  const tabName = tabs[i];
                  if (tabName === 'features' || 
                      (tabName === 'settings' && pluginData.features.settings) ||
                      (tabName === 'customPostTypes' && pluginData.features.customPostTypes) ||
                      (tabName === 'shortcodes' && pluginData.features.shortcodes) ||
                      (tabName === 'restApi' && pluginData.features.restApi) ||
                      (tabName === 'database' && pluginData.features.database)) {
                    handleTabChange(tabName);
                    return;
                  }
                }
                // If no more enabled tabs, generate
                handleGenerate();
              } else {
                handleGenerate();
              }
            }}
          >
            {activeTab === 'database' || 
             (activeTab === 'restApi' && !pluginData.features.database) ||
             (activeTab === 'shortcodes' && !pluginData.features.restApi && !pluginData.features.database) ||
             (activeTab === 'customPostTypes' && !pluginData.features.shortcodes && !pluginData.features.restApi && !pluginData.features.database) ||
             (activeTab === 'settings' && !pluginData.features.customPostTypes && !pluginData.features.shortcodes && !pluginData.features.restApi && !pluginData.features.database) ||
             (activeTab === 'features' && !pluginData.features.settings && !pluginData.features.customPostTypes && !pluginData.features.shortcodes && !pluginData.features.restApi && !pluginData.features.database) ? 'Generate Plugin' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Generator;
