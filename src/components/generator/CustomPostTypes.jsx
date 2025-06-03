import React, { useState } from 'react';

function CustomPostTypes({ data, updateData }) {
  const [newType, setNewType] = useState({
    name: '',
    slug: '',
    singular: '',
    plural: '',
    description: '',
    public: true,
    hierarchical: false,
    hasArchive: true,
    showInRest: true,
    menuIcon: 'dashicons-admin-post',
    supports: {
      title: true,
      editor: true,
      thumbnail: true,
      excerpt: false,
      author: false,
      comments: false,
      revisions: false,
      customFields: false,
      pageAttributes: false,
    },
    taxonomies: [],
    metaBoxes: []
  });
  
  const [newTaxonomy, setNewTaxonomy] = useState({
    name: '',
    slug: '',
    singular: '',
    plural: '',
    hierarchical: true
  });
  
  const [newMetaBox, setNewMetaBox] = useState({
    id: '',
    title: '',
    fields: []
  });
  
  const [newMetaField, setNewMetaField] = useState({
    id: '',
    label: '',
    type: 'text',
    description: ''
  });
  
  const [editingTypeIndex, setEditingTypeIndex] = useState(null);
  const [editingTaxonomyIndex, setEditingTaxonomyIndex] = useState(null);
  const [editingMetaBoxIndex, setEditingMetaBoxIndex] = useState(null);
  const [editingMetaFieldIndex, setEditingMetaFieldIndex] = useState(null);
  const [activeTypeIndex, setActiveTypeIndex] = useState(null);
  
  const handleTypeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewType({
      ...newType,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSupportsChange = (e) => {
    const { name, checked } = e.target;
    setNewType({
      ...newType,
      supports: {
        ...newType.supports,
        [name]: checked
      }
    });
  };
  
  const handleTaxonomyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTaxonomy({
      ...newTaxonomy,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleMetaBoxChange = (e) => {
    const { name, value } = e.target;
    setNewMetaBox({
      ...newMetaBox,
      [name]: value
    });
  };
  
  const handleMetaFieldChange = (e) => {
    const { name, value } = e.target;
    setNewMetaField({
      ...newMetaField,
      [name]: value
    });
  };
  
  const addType = () => {
    if (!newType.name || !newType.slug || !newType.singular || !newType.plural) {
      alert('Name, slug, singular, and plural labels are required.');
      return;
    }
    
    // Check if slug already exists
    if (data.types.some(type => type.slug === newType.slug)) {
      alert('A post type with this slug already exists.');
      return;
    }
    
    const updatedTypes = [...data.types, { ...newType }];
    updateData({ types: updatedTypes });
    
    // Reset form
    setNewType({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      description: '',
      public: true,
      hierarchical: false,
      hasArchive: true,
      showInRest: true,
      menuIcon: 'dashicons-admin-post',
      supports: {
        title: true,
        editor: true,
        thumbnail: true,
        excerpt: false,
        author: false,
        comments: false,
        revisions: false,
        customFields: false,
        pageAttributes: false,
      },
      taxonomies: [],
      metaBoxes: []
    });
  };
  
  const updateType = () => {
    if (editingTypeIndex === null) return;
    
    if (!newType.name || !newType.slug || !newType.singular || !newType.plural) {
      alert('Name, slug, singular, and plural labels are required.');
      return;
    }
    
    // Check if slug already exists (except for the current type)
    if (data.types.some((type, index) => type.slug === newType.slug && index !== editingTypeIndex)) {
      alert('A post type with this slug already exists.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[editingTypeIndex] = { ...newType };
    updateData({ types: updatedTypes });
    
    // Reset form and editing state
    setNewType({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      description: '',
      public: true,
      hierarchical: false,
      hasArchive: true,
      showInRest: true,
      menuIcon: 'dashicons-admin-post',
      supports: {
        title: true,
        editor: true,
        thumbnail: true,
        excerpt: false,
        author: false,
        comments: false,
        revisions: false,
        customFields: false,
        pageAttributes: false,
      },
      taxonomies: [],
      metaBoxes: []
    });
    setEditingTypeIndex(null);
  };
  
  const editType = (index) => {
    setEditingTypeIndex(index);
    setNewType({ ...data.types[index] });
  };
  
  const deleteType = (index) => {
    if (window.confirm('Are you sure you want to delete this custom post type?')) {
      const updatedTypes = [...data.types];
      updatedTypes.splice(index, 1);
      updateData({ types: updatedTypes });
      
      if (activeTypeIndex === index) {
        setActiveTypeIndex(null);
      }
    }
  };
  
  const addTaxonomy = (typeIndex) => {
    if (!newTaxonomy.name || !newTaxonomy.slug || !newTaxonomy.singular || !newTaxonomy.plural) {
      alert('Name, slug, singular, and plural labels are required.');
      return;
    }
    
    // Check if slug already exists in this post type
    if (data.types[typeIndex].taxonomies.some(tax => tax.slug === newTaxonomy.slug)) {
      alert('A taxonomy with this slug already exists for this post type.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[typeIndex].taxonomies.push({ ...newTaxonomy });
    updateData({ types: updatedTypes });
    
    // Reset form
    setNewTaxonomy({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      hierarchical: true
    });
  };
  
  const updateTaxonomy = (typeIndex) => {
    if (editingTaxonomyIndex === null) return;
    
    if (!newTaxonomy.name || !newTaxonomy.slug || !newTaxonomy.singular || !newTaxonomy.plural) {
      alert('Name, slug, singular, and plural labels are required.');
      return;
    }
    
    // Check if slug already exists in this post type (except for the current taxonomy)
    if (data.types[typeIndex].taxonomies.some((tax, index) => tax.slug === newTaxonomy.slug && index !== editingTaxonomyIndex)) {
      alert('A taxonomy with this slug already exists for this post type.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[typeIndex].taxonomies[editingTaxonomyIndex] = { ...newTaxonomy };
    updateData({ types: updatedTypes });
    
    // Reset form and editing state
    setNewTaxonomy({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      hierarchical: true
    });
    setEditingTaxonomyIndex(null);
  };
  
  const editTaxonomy = (typeIndex, taxIndex) => {
    setEditingTaxonomyIndex(taxIndex);
    setNewTaxonomy({ ...data.types[typeIndex].taxonomies[taxIndex] });
  };
  
  const deleteTaxonomy = (typeIndex, taxIndex) => {
    if (window.confirm('Are you sure you want to delete this taxonomy?')) {
      const updatedTypes = [...data.types];
      updatedTypes[typeIndex].taxonomies.splice(taxIndex, 1);
      updateData({ types: updatedTypes });
    }
  };
  
  const addMetaBox = (typeIndex) => {
    if (!newMetaBox.id || !newMetaBox.title) {
      alert('Meta box ID and title are required.');
      return;
    }
    
    // Check if ID already exists in this post type
    if (data.types[typeIndex].metaBoxes.some(box => box.id === newMetaBox.id)) {
      alert('A meta box with this ID already exists for this post type.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[typeIndex].metaBoxes.push({ ...newMetaBox, fields: [] });
    updateData({ types: updatedTypes });
    
    // Reset form
    setNewMetaBox({
      id: '',
      title: '',
      fields: []
    });
  };
  
  const updateMetaBox = (typeIndex) => {
    if (editingMetaBoxIndex === null) return;
    
    if (!newMetaBox.id || !newMetaBox.title) {
      alert('Meta box ID and title are required.');
      return;
    }
    
    // Check if ID already exists in this post type (except for the current meta box)
    if (data.types[typeIndex].metaBoxes.some((box, index) => box.id === newMetaBox.id && index !== editingMetaBoxIndex)) {
      alert('A meta box with this ID already exists for this post type.');
      return;
    }
    
    const updatedTypes = [...data.types];
    const currentFields = updatedTypes[typeIndex].metaBoxes[editingMetaBoxIndex].fields;
    updatedTypes[typeIndex].metaBoxes[editingMetaBoxIndex] = { ...newMetaBox, fields: currentFields };
    updateData({ types: updatedTypes });
    
    // Reset form and editing state
    setNewMetaBox({
      id: '',
      title: '',
      fields: []
    });
    setEditingMetaBoxIndex(null);
  };
  
  const editMetaBox = (typeIndex, boxIndex) => {
    setEditingMetaBoxIndex(boxIndex);
    setNewMetaBox({
      id: data.types[typeIndex].metaBoxes[boxIndex].id,
      title: data.types[typeIndex].metaBoxes[boxIndex].title,
      fields: []
    });
  };
  
  const deleteMetaBox = (typeIndex, boxIndex) => {
    if (window.confirm('Are you sure you want to delete this meta box?')) {
      const updatedTypes = [...data.types];
      updatedTypes[typeIndex].metaBoxes.splice(boxIndex, 1);
      updateData({ types: updatedTypes });
    }
  };
  
  const addMetaField = (typeIndex, boxIndex) => {
    if (!newMetaField.id || !newMetaField.label) {
      alert('Field ID and label are required.');
      return;
    }
    
    // Check if ID already exists in this meta box
    if (data.types[typeIndex].metaBoxes[boxIndex].fields.some(field => field.id === newMetaField.id)) {
      alert('A field with this ID already exists in this meta box.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[typeIndex].metaBoxes[boxIndex].fields.push({ ...newMetaField });
    updateData({ types: updatedTypes });
    
    // Reset form
    setNewMetaField({
      id: '',
      label: '',
      type: 'text',
      description: ''
    });
  };
  
  const updateMetaField = (typeIndex, boxIndex) => {
    if (editingMetaFieldIndex === null) return;
    
    if (!newMetaField.id || !newMetaField.label) {
      alert('Field ID and label are required.');
      return;
    }
    
    // Check if ID already exists in this meta box (except for the current field)
    if (data.types[typeIndex].metaBoxes[boxIndex].fields.some((field, index) => field.id === newMetaField.id && index !== editingMetaFieldIndex)) {
      alert('A field with this ID already exists in this meta box.');
      return;
    }
    
    const updatedTypes = [...data.types];
    updatedTypes[typeIndex].metaBoxes[boxIndex].fields[editingMetaFieldIndex] = { ...newMetaField };
    updateData({ types: updatedTypes });
    
    // Reset form and editing state
    setNewMetaField({
      id: '',
      label: '',
      type: 'text',
      description: ''
    });
    setEditingMetaFieldIndex(null);
  };
  
  const editMetaField = (typeIndex, boxIndex, fieldIndex) => {
    setEditingMetaFieldIndex(fieldIndex);
    setNewMetaField({ ...data.types[typeIndex].metaBoxes[boxIndex].fields[fieldIndex] });
  };
  
  const deleteMetaField = (typeIndex, boxIndex, fieldIndex) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      const updatedTypes = [...data.types];
      updatedTypes[typeIndex].metaBoxes[boxIndex].fields.splice(fieldIndex, 1);
      updateData({ types: updatedTypes });
    }
  };
  
  const cancelEdit = () => {
    setEditingTypeIndex(null);
    setEditingTaxonomyIndex(null);
    setEditingMetaBoxIndex(null);
    setEditingMetaFieldIndex(null);
    setNewType({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      description: '',
      public: true,
      hierarchical: false,
      hasArchive: true,
      showInRest: true,
      menuIcon: 'dashicons-admin-post',
      supports: {
        title: true,
        editor: true,
        thumbnail: true,
        excerpt: false,
        author: false,
        comments: false,
        revisions: false,
        customFields: false,
        pageAttributes: false,
      },
      taxonomies: [],
      metaBoxes: []
    });
    setNewTaxonomy({
      name: '',
      slug: '',
      singular: '',
      plural: '',
      hierarchical: true
    });
    setNewMetaBox({
      id: '',
      title: '',
      fields: []
    });
    setNewMetaField({
      id: '',
      label: '',
      type: 'text',
      description: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Custom Post Types</h2>
      <p className="mb-6 text-gray-600">
        Create custom post types for your WordPress plugin. You can add taxonomies and meta boxes to each post type.
      </p>

      <div className="wp-card mb-6">
        <h3 className="text-xl font-bold mb-4">
          {editingTypeIndex !== null ? 'Edit Custom Post Type' : 'Add Custom Post Type'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="typeName" className="block text-sm font-medium text-gray-700 mb-1">
                Post Type Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="typeName"
                name="name"
                value={newType.name}
                onChange={handleTypeChange}
                className="wp-input"
                placeholder="My Custom Post Type"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                The name of your custom post type.
              </p>
            </div>
            
            <div>
              <label htmlFor="typeSlug" className="block text-sm font-medium text-gray-700 mb-1">
                Post Type Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="typeSlug"
                name="slug"
                value={newType.slug}
                onChange={handleTypeChange}
                className="wp-input"
                placeholder="my_post_type"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                The slug for your post type (lowercase, no spaces).
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="typeSingular" className="block text-sm font-medium text-gray-700 mb-1">
                Singular Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="typeSingular"
                name="singular"
                value={newType.singular}
                onChange={handleTypeChange}
                className="wp-input"
                placeholder="Post"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Singular label (e.g., "Post").
              </p>
            </div>
            
            <div>
              <label htmlFor="typePlural" className="block text-sm font-medium text-gray-700 mb-1">
                Plural Label <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="typePlural"
                name="plural"
                value={newType.plural}
                onChange={handleTypeChange}
                className="wp-input"
                placeholder="Posts"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                Plural label (e.g., "Posts").
              </p>
            </div>
          </div>
          
          <div>
            <label htmlFor="typeDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="typeDescription"
              name="description"
              value={newType.description}
              onChange={handleTypeChange}
              className="wp-input"
              rows="2"
              placeholder="Description of this post type."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="typeIcon" className="block text-sm font-medium text-gray-700 mb-1">
                Menu Icon
              </label>
              <select
                id="typeIcon"
                name="menuIcon"
                value={newType.menuIcon}
                onChange={handleTypeChange}
                className="wp-select"
              >
                <option value="dashicons-admin-post">Default Post</option>
                <option value="dashicons-admin-page">Page</option>
                <option value="dashicons-admin-media">Media</option>
                <option value="dashicons-admin-comments">Comments</option>
                <option value="dashicons-admin-appearance">Appearance</option>
                <option value="dashicons-admin-plugins">Plugins</option>
                <option value="dashicons-admin-users">Users</option>
                <option value="dashicons-admin-tools">Tools</option>
                <option value="dashicons-admin-settings">Settings</option>
                <option value="dashicons-admin-network">Network</option>
                <option value="dashicons-admin-home">Home</option>
                <option value="dashicons-admin-generic">Generic</option>
                <option value="dashicons-admin-collapse">Collapse</option>
                <option value="dashicons-format-standard">Standard</option>
                <option value="dashicons-format-image">Image</option>
                <option value="dashicons-format-gallery">Gallery</option>
                <option value="dashicons-format-audio">Audio</option>
                <option value="dashicons-format-video">Video</option>
                <option value="dashicons-format-links">Links</option>
                <option value="dashicons-format-chat">Chat</option>
                <option value="dashicons-format-status">Status</option>
                <option value="dashicons-format-aside">Aside</option>
                <option value="dashicons-format-quote">Quote</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold mb-2">Options</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="typePublic"
                    name="public"
                    checked={newType.public}
                    onChange={handleTypeChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="typePublic" className="ml-2 text-sm">
                    Public
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="typeHierarchical"
                    name="hierarchical"
                    checked={newType.hierarchical}
                    onChange={handleTypeChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="typeHierarchical" className="ml-2 text-sm">
                    Hierarchical (like pages)
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="typeHasArchive"
                    name="hasArchive"
                    checked={newType.hasArchive}
                    onChange={handleTypeChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="typeHasArchive" className="ml-2 text-sm">
                    Has Archive
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="typeShowInRest"
                    name="showInRest"
                    checked={newType.showInRest}
                    onChange={handleTypeChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="typeShowInRest" className="ml-2 text-sm">
                    Show in REST API
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Supports</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsTitle"
                    name="title"
                    checked={newType.supports.title}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsTitle" className="ml-2 text-sm">
                    Title
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsEditor"
                    name="editor"
                    checked={newType.supports.editor}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsEditor" className="ml-2 text-sm">
                    Editor
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsThumbnail"
                    name="thumbnail"
                    checked={newType.supports.thumbnail}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsThumbnail" className="ml-2 text-sm">
                    Featured Image
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsExcerpt"
                    name="excerpt"
                    checked={newType.supports.excerpt}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsExcerpt" className="ml-2 text-sm">
                    Excerpt
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsAuthor"
                    name="author"
                    checked={newType.supports.author}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsAuthor" className="ml-2 text-sm">
                    Author
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsComments"
                    name="comments"
                    checked={newType.supports.comments}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsComments" className="ml-2 text-sm">
                    Comments
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsRevisions"
                    name="revisions"
                    checked={newType.supports.revisions}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsRevisions" className="ml-2 text-sm">
                    Revisions
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsCustomFields"
                    name="customFields"
                    checked={newType.supports.customFields}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsCustomFields" className="ml-2 text-sm">
                    Custom Fields
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="supportsPageAttributes"
                    name="pageAttributes"
                    checked={newType.supports.pageAttributes}
                    onChange={handleSupportsChange}
                    className="wp-checkbox"
                  />
                  <label htmlFor="supportsPageAttributes" className="ml-2 text-sm">
                    Page Attributes
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editingTypeIndex !== null && (
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
              onClick={editingTypeIndex !== null ? updateType : addType}
            >
              {editingTypeIndex !== null ? 'Update Post Type' : 'Add Post Type'}
            </button>
          </div>
        </div>
      </div>

      {data.types.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Your Custom Post Types</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.types.map((type, index) => (
              <div 
                key={index} 
                className={`wp-card cursor-pointer ${activeTypeIndex === index ? 'border-2 border-wordpress-blue' : ''}`}
                onClick={() => setActiveTypeIndex(activeTypeIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">{type.name}</h4>
                  <div className="space-x-2">
                    <button
                      type="button"
                      className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        editType(index);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteType(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm">Slug: {type.slug}</p>
                <p className="text-sm">Labels: {type.singular} / {type.plural}</p>
                <p className="text-sm">Hierarchical: {type.hierarchical ? 'Yes' : 'No'}</p>
                <p className="text-sm mt-2">
                  <span className="text-xs bg-gray-200 rounded px-2 py-1">
                    {type.taxonomies.length} taxonomies
                  </span>
                  {' '}
                  <span className="text-xs bg-gray-200 rounded px-2 py-1">
                    {type.metaBoxes.length} meta boxes
                  </span>
                </p>
              </div>
            ))}
          </div>
          
          {activeTypeIndex !== null && (
            <div className="wp-card mt-6">
              <h3 className="text-xl font-bold mb-4">{data.types[activeTypeIndex].name} Configuration</h3>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Taxonomies</h4>
                </div>
                
                {data.types[activeTypeIndex].taxonomies.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {data.types[activeTypeIndex].taxonomies.map((tax, taxIndex) => (
                      <div key={taxIndex} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">{tax.name}</h5>
                          <div className="space-x-2">
                            <button
                              type="button"
                              className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                              onClick={() => editTaxonomy(activeTypeIndex, taxIndex)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => deleteTaxonomy(activeTypeIndex, taxIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">Slug: {tax.slug}</p>
                        <p className="text-sm">Labels: {tax.singular} / {tax.plural}</p>
                        <p className="text-sm">Hierarchical: {tax.hierarchical ? 'Yes (like categories)' : 'No (like tags)'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No taxonomies added yet.</p>
                )}
                
                <div className="bg-gray-50 p-4 rounded">
                  <h5 className="font-bold mb-3">
                    {editingTaxonomyIndex !== null ? 'Edit Taxonomy' : 'Add Taxonomy'}
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="taxName" className="block text-sm font-medium text-gray-700 mb-1">
                          Taxonomy Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="taxName"
                          name="name"
                          value={newTaxonomy.name}
                          onChange={handleTaxonomyChange}
                          className="wp-input"
                          placeholder="My Taxonomy"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="taxSlug" className="block text-sm font-medium text-gray-700 mb-1">
                          Taxonomy Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="taxSlug"
                          name="slug"
                          value={newTaxonomy.slug}
                          onChange={handleTaxonomyChange}
                          className="wp-input"
                          placeholder="my_taxonomy"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="taxSingular" className="block text-sm font-medium text-gray-700 mb-1">
                          Singular Label <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="taxSingular"
                          name="singular"
                          value={newTaxonomy.singular}
                          onChange={handleTaxonomyChange}
                          className="wp-input"
                          placeholder="Category"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="taxPlural" className="block text-sm font-medium text-gray-700 mb-1">
                          Plural Label <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="taxPlural"
                          name="plural"
                          value={newTaxonomy.plural}
                          onChange={handleTaxonomyChange}
                          className="wp-input"
                          placeholder="Categories"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="taxHierarchical"
                          name="hierarchical"
                          checked={newTaxonomy.hierarchical}
                          onChange={handleTaxonomyChange}
                          className="wp-checkbox"
                        />
                        <label htmlFor="taxHierarchical" className="ml-2 text-sm">
                          Hierarchical (like categories, with parent/child relationships)
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      {editingTaxonomyIndex !== null && (
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
                        onClick={() => editingTaxonomyIndex !== null ? updateTaxonomy(activeTypeIndex) : addTaxonomy(activeTypeIndex)}
                      >
                        {editingTaxonomyIndex !== null ? 'Update Taxonomy' : 'Add Taxonomy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold">Meta Boxes</h4>
                </div>
                
                {data.types[activeTypeIndex].metaBoxes.length > 0 ? (
                  <div className="space-y-6 mb-4">
                    {data.types[activeTypeIndex].metaBoxes.map((box, boxIndex) => (
                      <div key={boxIndex} className="bg-gray-50 p-4 rounded">
                        <div className="flex justify-between items-center mb-3">
                          <h5 className="font-bold">{box.title}</h5>
                          <div className="space-x-2">
                            <button
                              type="button"
                              className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                              onClick={() => editMetaBox(activeTypeIndex, boxIndex)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => deleteMetaBox(activeTypeIndex, boxIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm mb-3">ID: {box.id}</p>
                        
                        <h6 className="font-bold text-sm mb-2">Fields:</h6>
                        {box.fields.length > 0 ? (
                          <div className="space-y-2">
                            {box.fields.map((field, fieldIndex) => (
                              <div key={fieldIndex} className="bg-white p-2 rounded border border-gray-200">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{field.label}</span>
                                  <div className="space-x-2">
                                    <button
                                      type="button"
                                      className="text-wordpress-blue hover:text-wordpress-lightblue text-xs"
                                      onClick={() => editMetaField(activeTypeIndex, boxIndex, fieldIndex)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="text-red-600 hover:text-red-800 text-xs"
                                      onClick={() => deleteMetaField(activeTypeIndex, boxIndex, fieldIndex)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <p className="text-xs">ID: {field.id}</p>
                                <p className="text-xs">Type: {field.type}</p>
                                {field.description && <p className="text-xs">Description: {field.description}</p>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">No fields added yet.</p>
                        )}
                        
                        <div className="mt-4 p-3 bg-white rounded border border-gray-200">
                          <h6 className="font-bold text-sm mb-2">
                            {editingMetaFieldIndex !== null ? 'Edit Field' : 'Add Field'}
                          </h6>
                          
                          <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <label htmlFor={`fieldId-${boxIndex}`} className="block text-xs font-medium text-gray-700 mb-1">
                                  Field ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id={`fieldId-${boxIndex}`}
                                  name="id"
                                  value={newMetaField.id}
                                  onChange={handleMetaFieldChange}
                                  className="wp-input text-sm"
                                  placeholder="_my_field"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label htmlFor={`fieldLabel-${boxIndex}`} className="block text-xs font-medium text-gray-700 mb-1">
                                  Field Label <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  id={`fieldLabel-${boxIndex}`}
                                  name="label"
                                  value={newMetaField.label}
                                  onChange={handleMetaFieldChange}
                                  className="wp-input text-sm"
                                  placeholder="My Field"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <label htmlFor={`fieldType-${boxIndex}`} className="block text-xs font-medium text-gray-700 mb-1">
                                  Field Type
                                </label>
                                <select
                                  id={`fieldType-${boxIndex}`}
                                  name="type"
                                  value={newMetaField.type}
                                  onChange={handleMetaFieldChange}
                                  className="wp-select text-sm"
                                >
                                  <option value="text">Text</option>
                                  <option value="textarea">Textarea</option>
                                  <option value="number">Number</option>
                                  <option value="email">Email</option>
                                  <option value="url">URL</option>
                                  <option value="password">Password</option>
                                  <option value="checkbox">Checkbox</option>
                                  <option value="radio">Radio Buttons</option>
                                  <option value="select">Select Dropdown</option>
                                  <option value="date">Date</option>
                                  <option value="time">Time</option>
                                  <option value="color">Color Picker</option>
                                  <option value="file">File Upload</option>
                                  <option value="image">Image Upload</option>
                                  <option value="wysiwyg">WYSIWYG Editor</option>
                                </select>
                              </div>
                              
                              <div>
                                <label htmlFor={`fieldDescription-${boxIndex}`} className="block text-xs font-medium text-gray-700 mb-1">
                                  Field Description
                                </label>
                                <input
                                  type="text"
                                  id={`fieldDescription-${boxIndex}`}
                                  name="description"
                                  value={newMetaField.description}
                                  onChange={handleMetaFieldChange}
                                  className="wp-input text-sm"
                                  placeholder="Description of this field."
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                              {editingMetaFieldIndex !== null && (
                                <button
                                  type="button"
                                  className="wp-button bg-gray-500 hover:bg-gray-600 text-sm py-1 px-2"
                                  onClick={cancelEdit}
                                >
                                  Cancel
                                </button>
                              )}
                              <button
                                type="button"
                                className="wp-button text-sm py-1 px-2"
                                onClick={() => editingMetaFieldIndex !== null ? updateMetaField(activeTypeIndex, boxIndex) : addMetaField(activeTypeIndex, boxIndex)}
                              >
                                {editingMetaFieldIndex !== null ? 'Update Field' : 'Add Field'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No meta boxes added yet.</p>
                )}
                
                <div className="bg-gray-50 p-4 rounded">
                  <h5 className="font-bold mb-3">
                    {editingMetaBoxIndex !== null ? 'Edit Meta Box' : 'Add Meta Box'}
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="metaBoxId" className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Box ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="metaBoxId"
                          name="id"
                          value={newMetaBox.id}
                          onChange={handleMetaBoxChange}
                          className="wp-input"
                          placeholder="my_meta_box"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="metaBoxTitle" className="block text-sm font-medium text-gray-700 mb-1">
                          Meta Box Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="metaBoxTitle"
                          name="title"
                          value={newMetaBox.title}
                          onChange={handleMetaBoxChange}
                          className="wp-input"
                          placeholder="My Meta Box"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      {editingMetaBoxIndex !== null && (
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
                        onClick={() => editingMetaBoxIndex !== null ? updateMetaBox(activeTypeIndex) : addMetaBox(activeTypeIndex)}
                      >
                        {editingMetaBoxIndex !== null ? 'Update Meta Box' : 'Add Meta Box'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500 mb-4">No custom post types added yet.</p>
          <p className="text-sm">Add a custom post type to get started.</p>
        </div>
      )}
    </div>
  );
}

export default CustomPostTypes;
