import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Preview() {
  const navigate = useNavigate();
  const [pluginData, setPluginData] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('generatedPlugin');
    if (!storedData) {
      navigate('/generator');
      return;
    }

    const { pluginData, files } = JSON.parse(storedData);
    setPluginData(pluginData);
    
    // Convert files object to array for easier display
    const filesArray = Object.entries(files).map(([path, content]) => ({
      path,
      content,
    }));
    
    setFiles(filesArray);
    
    // Select the main plugin file by default
    const mainFile = filesArray.find(file => file.path.endsWith('.php') && !file.path.includes('/'));
    if (mainFile) {
      setSelectedFile(mainFile);
      setFileContent(mainFile.content);
    }
  }, [navigate]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
  };

  const handleDownload = () => {
    if (!pluginData || !files.length) return;
    
    const zip = new JSZip();
    const folderName = pluginData.basic.slug;
    
    // Add all files to the zip
    files.forEach(file => {
      zip.file(`${folderName}/${file.path}`, file.content);
    });
    
    // Generate the zip file and trigger download
    zip.generateAsync({ type: 'blob' })
      .then(content => {
        saveAs(content, `${folderName}.zip`);
      });
  };

  const getFileLanguage = (filePath) => {
    if (filePath.endsWith('.php')) return 'php';
    if (filePath.endsWith('.js')) return 'javascript';
    if (filePath.endsWith('.css')) return 'css';
    if (filePath.endsWith('.json')) return 'json';
    if (filePath.endsWith('.md')) return 'markdown';
    return 'text';
  };

  if (!pluginData) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">Loading plugin data...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Plugin Preview</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{pluginData.basic.name}</h2>
        <p className="mb-4">{pluginData.basic.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Version:</strong> {pluginData.basic.version}</p>
            <p><strong>Author:</strong> {pluginData.basic.author}</p>
          </div>
          <div>
            <p><strong>Requires WordPress:</strong> {pluginData.basic.requiresWp}</p>
            <p><strong>Requires PHP:</strong> {pluginData.basic.requiresPhp}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="wp-button" onClick={handleDownload}>
            Download Plugin
          </button>
          <button 
            className="wp-button bg-gray-500 hover:bg-gray-600"
            onClick={() => navigate('/generator')}
          >
            Edit Plugin
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-4">Files</h3>
          <div className="overflow-y-auto max-h-[500px]">
            <ul className="space-y-1">
              {files.map((file, index) => (
                <li key={index}>
                  <button
                    className={`text-left w-full px-3 py-2 rounded text-sm ${selectedFile && selectedFile.path === file.path ? 'bg-wordpress-blue text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => handleFileSelect(file)}
                  >
                    {file.path}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
          {selectedFile ? (
            <div>
              <div className="bg-gray-800 text-white px-4 py-2 text-sm font-mono">
                {selectedFile.path}
              </div>
              <div className="overflow-auto max-h-[500px]">
                <SyntaxHighlighter 
                  language={getFileLanguage(selectedFile.path)} 
                  style={vs2015}
                  showLineNumbers={true}
                  customStyle={{ margin: 0, borderRadius: 0 }}
                >
                  {fileContent}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p>Select a file to view its contents</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Preview;
