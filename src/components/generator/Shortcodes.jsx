import React, { useState } from 'react';

function Shortcodes({ data, updateData }) {
  const [newShortcode, setNewShortcode] = useState({
    name: '',
    description: '',
    hasContent: false,
    attributes: []
  });
  
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    description: '',
    type: 'text',
    default: '',
    required: false
  });
  
  const [editingShortcodeIndex, setEditingShortcodeIndex] = useState(null);
  const [editingAttributeIndex, setEditingAttributeIndex] = useState(null);
  
  const handleShortcodeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewShortcode({
      ...newShortcode,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleAttributeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAttribute({
      ...newAttribute,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const addShortcode = () => {
    if (!newShortcode.name) {
      alert('Shortcode name is required.');
      return;
    }
    
    // Check if name already exists
    if (data.codes.some(code => code.name === newShortcode.name)) {
      alert('A shortcode with this name already exists.');
      return;
    }
    
    const updatedCodes = [...data.codes, { ...newShortcode }];
    updateData({ codes: updatedCodes });
    
    // Reset form
    setNewShortcode({
      name: '',
      description: '',
      hasContent: false,
      attributes: []
    });
  };
  
  const updateShortcode = () => {
    if (editingShortcodeIndex === null) return;
    
    if (!newShortcode.name) {
      alert('Shortcode name is required.');
      return;
    }
    
    // Check if name already exists (except for the current shortcode)
    if (data.codes.some((code, index) => code.name === newShortcode.name && index !== editingShortcodeIndex)) {
      alert('A shortcode with this name already exists.');
      return;
    }
    
    const updatedCodes = [...data.codes];
    updatedCodes[editingShortcodeIndex] = { ...newShortcode };
    updateData({ codes: updatedCodes });
    
    // Reset form and editing state
    setNewShortcode({
      name: '',
      description: '',
      hasContent: false,
      attributes: []
    });
    setEditingShortcodeIndex(null);
  };
  
  const editShortcode = (index) => {
    setEditingShortcodeIndex(index);
    setNewShortcode({ ...data.codes[index] });
  };
  
  const deleteShortcode = (index) => {
    if (window.confirm('Are you sure you want to delete this shortcode?')) {
      const updatedCodes = [...data.codes];
      updatedCodes.splice(index, 1);
      updateData({ codes: updatedCodes });
    }
  };
  
  const addAttribute = (shortcodeIndex) => {
    if (!newAttribute.name) {
      alert('Attribute name is required.');
      return;
    }
    
    // Check if name already exists in this shortcode
    if (data.codes[shortcodeIndex].attributes.some(attr => attr.name === newAttribute.name)) {
      alert('An attribute with this name already exists for this shortcode.');
      return;
    }
    
    const updatedCodes = [...data.codes];
    updatedCodes[shortcodeIndex].attributes.push({ ...newAttribute });
    updateData({ codes: updatedCodes });
    
    // Reset form
    setNewAttribute({
      name: '',
      description: '',
      type: 'text',
      default: '',
      required: false
    });
  };
  
  const updateAttribute = (shortcodeIndex) => {
    if (editingAttributeIndex === null) return;
    
    if (!newAttribute.name) {
      alert('Attribute name is required.');
      return;
    }
    
    // Check if name already exists in this shortcode (except for the current attribute)
    if (data.codes[shortcodeIndex].attributes.some((attr, index) => attr.name === newAttribute.name && index !== editingAttributeIndex)) {
      alert('An attribute with this name already exists for this shortcode.');
      return;
    }
    
    const updatedCodes = [...data.codes];
    updatedCodes[shortcodeIndex].attributes[editingAttributeIndex] = { ...newAttribute };
    updateData({ codes: updatedCodes });
    
    // Reset form and editing state
    setNewAttribute({
      name: '',
      description: '',
      type: 'text',
      default: '',
      required: false
    });
    setEditingAttributeIndex(null);
  };
  
  const editAttribute = (shortcodeIndex, attrIndex) => {
    setEditingAttributeIndex(attrIndex);
    setNewAttribute({ ...data.codes[shortcodeIndex].attributes[attrIndex] });
  };
  
  const deleteAttribute = (shortcodeIndex, attrIndex) => {
    if (window.confirm('Are you sure you want to delete this attribute?')) {
      const updatedCodes = [...data.codes];
      updatedCodes[shortcodeIndex].attributes.splice(attrIndex, 1);
      updateData({ codes: updatedCodes });
    }
  };
  
  const cancelEdit = () => {
    setEditingShortcodeIndex(null);
    setEditingAttributeIndex(null);
    setNewShortcode({
      name: '',
      description: '',
      hasContent: false,
      attributes: []
    });
    setNewAttribute({
      name: '',
      description: '',
      type: 'text',
      default: '',
      required: false
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shortcodes</h2>
      <p className="mb-6 text-gray-600">
        Create custom shortcodes for your WordPress plugin. Shortcodes can be used in posts and pages to display custom content.
      </p>

      <div className="wp-card mb-6">
        <h3 className="text-xl font-bold mb-4">
          {editingShortcodeIndex !== null ? 'Edit Shortcode' : 'Add Shortcode'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="shortcodeName" className="block text-sm font-medium text-gray-700 mb-1">
              Shortcode Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="shortcodeName"
              name="name"
              value={newShortcode.name}
              onChange={handleShortcodeChange}
              className="wp-input"
              placeholder="my-shortcode"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              The name of your shortcode (e.g., "my-shortcode" will be used as [my-shortcode]).
            </p>
          </div>
          
          <div>
            <label htmlFor="shortcodeDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="shortcodeDescription"
              name="description"
              value={newShortcode.description}
              onChange={handleShortcodeChange}
              className="wp-input"
              rows="2"
              placeholder="Description of what this shortcode does."
            ></textarea>
          </div>
          
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="shortcodeHasContent"
                name="hasContent"
                checked={newShortcode.hasContent}
                onChange={handleShortcodeChange}
                className="wp-checkbox"
              />
              <label htmlFor="shortcodeHasContent" className="ml-2 text-sm">
                Has Content (can be used as [shortcode]content[/shortcode])
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editingShortcodeIndex !== null && (
              <button
                type="button"
                className="wp-button bg-gray-500 hover:bg-gray-600"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="wp-button"
              onClick={editingShortcodeIndex !== null ? updateShortcode : addShortcode}
            >
              {editingShortcodeIndex !== null ? 'Update Shortcode' : 'Add Shortcode'}
            </button>
          </div>
        </div>
      </div>

      {data.codes.length > 0 ? (
        <div className="space-y-6">
          {data.codes.map((shortcode, shortcodeIndex) => (
            <div key={shortcodeIndex} className="wp-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">[{shortcode.name}]</h3>
                <div className="space-x-2">
                  <button
                    type="button"
                    className="text-wordpress-blue hover:text-wordpress-lightblue"
                    onClick={() => editShortcode(shortcodeIndex)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteShortcode(shortcodeIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {shortcode.description && (
                <p className="mb-4">{shortcode.description}</p>
              )}
              
              <div className="mb-4">
                <p className="text-sm">
                  <strong>Usage:</strong> [{shortcode.name}
                  {shortcode.attributes.length > 0 && shortcode.attributes.map(attr => ` ${attr.name}="${attr.default || '...'}"`).join('')}
                  ]
                  {shortcode.hasContent && '...content...'}
                  {shortcode.hasContent && `[/${shortcode.name}]`}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold mb-2">Attributes</h4>
                
                {shortcode.attributes.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {shortcode.attributes.map((attr, attrIndex) => (
                      <div key={attrIndex} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">{attr.name}</h5>
                          <div className="space-x-2">
                            <button
                              type="button"
                              className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                              onClick={() => editAttribute(shortcodeIndex, attrIndex)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => deleteAttribute(shortcodeIndex, attrIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">Type: {attr.type}</p>
                        {attr.description && <p className="text-sm">Description: {attr.description}</p>}
                        {attr.default && <p className="text-sm">Default: {attr.default}</p>}
                        <p className="text-sm">Required: {attr.required ? 'Yes' : 'No'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No attributes added yet.</p>
                )}
                
                <div className="bg-gray-50 p-4 rounded">
                  <h5 className="font-bold mb-3">
                    {editingAttributeIndex !== null ? 'Edit Attribute' : 'Add Attribute'}
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`attrName-${shortcodeIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Attribute Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`attrName-${shortcodeIndex}`}
                          name="name"
                          value={newAttribute.name}
                          onChange={handleAttributeChange}
                          className="wp-input"
                          placeholder="my-attribute"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`attrType-${shortcodeIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Attribute Type
                        </label>
                        <select
                          id={`attrType-${shortcodeIndex}`}
                          name="type"
                          value={newAttribute.type}
                          onChange={handleAttributeChange}
                          className="wp-select"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="boolean">Boolean</option>
                          <option value="color">Color</option>
                          <option value="url">URL</option>
                          <option value="email">Email</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`attrDescription-${shortcodeIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        id={`attrDescription-${shortcodeIndex}`}
                        name="description"
                        value={newAttribute.description}
                        onChange={handleAttributeChange}
                        className="wp-input"
                        placeholder="Description of this attribute."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`attrDefault-${shortcodeIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Default Value
                        </label>
                        <input
                          type="text"
                          id={`attrDefault-${shortcodeIndex}`}
                          name="default"
                          value={newAttribute.default}
                          onChange={handleAttributeChange}
                          className="wp-input"
                          placeholder="Default value for this attribute."
                        />
                      </div>
                      
                      <div className="flex items-center h-full pt-6">
                        <input
                          type="checkbox"
                          id={`attrRequired-${shortcodeIndex}`}
                          name="required"
                          checked={newAttribute.required}
                          onChange={handleAttributeChange}
                          className="wp-checkbox"
                        />
                        <label htmlFor={`attrRequired-${shortcodeIndex}`} className="ml-2 text-sm">
                          Required
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      {editingAttributeIndex !== null && (
                        <button
                          type="button"
                          className="wp-button bg-gray-500 hover:bg-gray-600"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        type="button"
                        className="wp-button"
                        onClick={() => editingAttributeIndex !== null ? updateAttribute(shortcodeIndex) : addAttribute(shortcodeIndex)}
                      >
                        {editingAttributeIndex !== null ? 'Update Attribute' : 'Add Attribute'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">No shortcodes added yet.</p>
          <p className="text-sm">Add a shortcode to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Shortcodes;
