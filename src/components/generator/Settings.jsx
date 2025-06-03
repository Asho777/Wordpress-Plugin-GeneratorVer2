import React, { useState } from 'react';

function Settings({ data, updateData }) {
  const [newGroup, setNewGroup] = useState({
    id: '',
    title: '',
    description: '',
    page: 'general',
    fields: []
  });
  
  const [newField, setNewField] = useState({
    id: '',
    title: '',
    type: 'text',
    description: '',
    default: ''
  });
  
  const [editingGroupIndex, setEditingGroupIndex] = useState(null);
  const [editingFieldIndex, setEditingFieldIndex] = useState(null);
  
  const handleGroupChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({
      ...newGroup,
      [name]: value
    });
  };
  
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewField({
      ...newField,
      [name]: value
    });
  };
  
  const addGroup = () => {
    if (!newGroup.id || !newGroup.title) {
      alert('Group ID and title are required.');
      return;
    }
    
    // Check if ID already exists
    if (data.settingsGroups.some(group => group.id === newGroup.id)) {
      alert('A group with this ID already exists.');
      return;
    }
    
    const updatedGroups = [...data.settingsGroups, { ...newGroup, fields: [] }];
    updateData({ settingsGroups: updatedGroups });
    
    // Reset form
    setNewGroup({
      id: '',
      title: '',
      description: '',
      page: 'general',
      fields: []
    });
  };
  
  const updateGroup = () => {
    if (editingGroupIndex === null) return;
    
    if (!newGroup.id || !newGroup.title) {
      alert('Group ID and title are required.');
      return;
    }
    
    // Check if ID already exists (except for the current group)
    if (data.settingsGroups.some((group, index) => group.id === newGroup.id && index !== editingGroupIndex)) {
      alert('A group with this ID already exists.');
      return;
    }
    
    const updatedGroups = [...data.settingsGroups];
    updatedGroups[editingGroupIndex] = { ...newGroup };
    updateData({ settingsGroups: updatedGroups });
    
    // Reset form and editing state
    setNewGroup({
      id: '',
      title: '',
      description: '',
      page: 'general',
      fields: []
    });
    setEditingGroupIndex(null);
  };
  
  const editGroup = (index) => {
    setEditingGroupIndex(index);
    setNewGroup({ ...data.settingsGroups[index] });
  };
  
  const deleteGroup = (index) => {
    if (window.confirm('Are you sure you want to delete this settings group?')) {
      const updatedGroups = [...data.settingsGroups];
      updatedGroups.splice(index, 1);
      updateData({ settingsGroups: updatedGroups });
    }
  };
  
  const addField = (groupIndex) => {
    if (!newField.id || !newField.title) {
      alert('Field ID and title are required.');
      return;
    }
    
    // Check if ID already exists in this group
    if (data.settingsGroups[groupIndex].fields.some(field => field.id === newField.id)) {
      alert('A field with this ID already exists in this group.');
      return;
    }
    
    const updatedGroups = [...data.settingsGroups];
    updatedGroups[groupIndex].fields.push({ ...newField });
    updateData({ settingsGroups: updatedGroups });
    
    // Reset form
    setNewField({
      id: '',
      title: '',
      type: 'text',
      description: '',
      default: ''
    });
  };
  
  const updateField = (groupIndex) => {
    if (editingFieldIndex === null) return;
    
    if (!newField.id || !newField.title) {
      alert('Field ID and title are required.');
      return;
    }
    
    // Check if ID already exists in this group (except for the current field)
    if (data.settingsGroups[groupIndex].fields.some((field, index) => field.id === newField.id && index !== editingFieldIndex)) {
      alert('A field with this ID already exists in this group.');
      return;
    }
    
    const updatedGroups = [...data.settingsGroups];
    updatedGroups[groupIndex].fields[editingFieldIndex] = { ...newField };
    updateData({ settingsGroups: updatedGroups });
    
    // Reset form and editing state
    setNewField({
      id: '',
      title: '',
      type: 'text',
      description: '',
      default: ''
    });
    setEditingFieldIndex(null);
  };
  
  const editField = (groupIndex, fieldIndex) => {
    setEditingFieldIndex(fieldIndex);
    setNewField({ ...data.settingsGroups[groupIndex].fields[fieldIndex] });
  };
  
  const deleteField = (groupIndex, fieldIndex) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      const updatedGroups = [...data.settingsGroups];
      updatedGroups[groupIndex].fields.splice(fieldIndex, 1);
      updateData({ settingsGroups: updatedGroups });
    }
  };
  
  const cancelEdit = () => {
    setEditingGroupIndex(null);
    setEditingFieldIndex(null);
    setNewGroup({
      id: '',
      title: '',
      description: '',
      page: 'general',
      fields: []
    });
    setNewField({
      id: '',
      title: '',
      type: 'text',
      description: '',
      default: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings Configuration</h2>
      <p className="mb-6 text-gray-600">
        Configure the settings for your plugin. You can create multiple settings groups and fields.
      </p>

      <div className="wp-card mb-6">
        <h3 className="text-xl font-bold mb-4">
          {editingGroupIndex !== null ? 'Edit Settings Group' : 'Add Settings Group'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="groupId" className="block text-sm font-medium text-gray-700 mb-1">
                Group ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="groupId"
                name="id"
                value={newGroup.id}
                onChange={handleGroupChange}
                className="wp-input"
                placeholder="my_settings_group"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Unique identifier for this settings group.
              </p>
            </div>
            
            <div>
              <label htmlFor="groupTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Group Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="groupTitle"
                name="title"
                value={newGroup.title}
                onChange={handleGroupChange}
                className="wp-input"
                placeholder="My Settings Group"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Display title for this settings group.
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="groupDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Group Description
            </label>
            <textarea
              id="groupDescription"
              name="description"
              value={newGroup.description}
              onChange={handleGroupChange}
              className="wp-input"
              rows="2"
              placeholder="Description of this settings group."
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="groupPage" className="block text-sm font-medium text-gray-700 mb-1">
              Settings Page
            </label>
            <select
              id="groupPage"
              name="page"
              value={newGroup.page}
              onChange={handleGroupChange}
              className="wp-select"
            >
              <option value="general">General</option>
              <option value="writing">Writing</option>
              <option value="reading">Reading</option>
              <option value="discussion">Discussion</option>
              <option value="media">Media</option>
              <option value="custom">Custom Admin Page</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Where these settings should appear.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editingGroupIndex !== null && (
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
              onClick={editingGroupIndex !== null ? updateGroup : addGroup}
            >
              {editingGroupIndex !== null ? 'Update Group' : 'Add Group'}
            </button>
          </div>
        </div>
      </div>

      {data.settingsGroups.length > 0 ? (
        data.settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="wp-card mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">{group.title}</h3>
              <div className="space-x-2">
                <button
                  type="button"
                  className="text-wordpress-blue hover:text-wordpress-lightblue"
                  onClick={() => editGroup(groupIndex)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteGroup(groupIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">ID: {group.id}</p>
              {group.description && <p className="text-sm">{group.description}</p>}
              <p className="text-sm">Page: {group.page}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-bold mb-2">Fields</h4>
              
              {group.fields.length > 0 ? (
                <div className="space-y-4 mb-4">
                  {group.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="bg-gray-50 p-3 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold">{field.title}</h5>
                        <div className="space-x-2">
                          <button
                            type="button"
                            className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                            onClick={() => editField(groupIndex, fieldIndex)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-800 text-sm"
                            onClick={() => deleteField(groupIndex, fieldIndex)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">ID: {field.id}</p>
                      <p className="text-sm">Type: {field.type}</p>
                      {field.description && <p className="text-sm">Description: {field.description}</p>}
                      {field.default && <p className="text-sm">Default: {field.default}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">No fields added yet.</p>
              )}
              
              <div className="bg-gray-50 p-4 rounded">
                <h5 className="font-bold mb-3">
                  {editingFieldIndex !== null ? 'Edit Field' : 'Add Field'}
                </h5>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`fieldId-${groupIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Field ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`fieldId-${groupIndex}`}
                        name="id"
                        value={newField.id}
                        onChange={handleFieldChange}
                        className="wp-input"
                        placeholder="my_field"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor={`fieldTitle-${groupIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Field Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id={`fieldTitle-${groupIndex}`}
                        name="title"
                        value={newField.title}
                        onChange={handleFieldChange}
                        className="wp-input"
                        placeholder="My Field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor={`fieldType-${groupIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Field Type
                    </label>
                    <select
                      id={`fieldType-${groupIndex}`}
                      name="type"
                      value={newField.type}
                      onChange={handleFieldChange}
                      className="wp-select"
                    >
                      <option value="text">Text</option>
                      <option value="textarea">Textarea</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio Buttons</option>
                      <option value="select">Select Dropdown</option>
                      <option value="number">Number</option>
                      <option value="color">Color Picker</option>
                      <option value="password">Password</option>
                      <option value="email">Email</option>
                      <option value="url">URL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor={`fieldDescription-${groupIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Field Description
                    </label>
                    <input
                      type="text"
                      id={`fieldDescription-${groupIndex}`}
                      name="description"
                      value={newField.description}
                      onChange={handleFieldChange}
                      className="wp-input"
                      placeholder="Description of this field."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor={`fieldDefault-${groupIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Default Value
                    </label>
                    <input
                      type="text"
                      id={`fieldDefault-${groupIndex}`}
                      name="default"
                      value={newField.default}
                      onChange={handleFieldChange}
                      className="wp-input"
                      placeholder="Default value for this field."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    {editingFieldIndex !== null && (
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
                      onClick={() => editingFieldIndex !== null ? updateField(groupIndex) : addField(groupIndex)}
                    >
                      {editingFieldIndex !== null ? 'Update Field' : 'Add Field'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">No settings groups added yet.</p>
          <p className="text-sm">Add a settings group to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Settings;
