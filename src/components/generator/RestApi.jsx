import React, { useState } from 'react';

function RestApi({ data, updateData }) {
  const [newEndpoint, setNewEndpoint] = useState({
    route: '',
    method: 'GET',
    description: '',
    requiresAuth: false,
    parameters: []
  });
  
  const [newParameter, setNewParameter] = useState({
    name: '',
    type: 'string',
    description: '',
    required: false,
    default: ''
  });
  
  const [editingEndpointIndex, setEditingEndpointIndex] = useState(null);
  const [editingParameterIndex, setEditingParameterIndex] = useState(null);
  
  const handleEndpointChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEndpoint({
      ...newEndpoint,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleParameterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewParameter({
      ...newParameter,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const addEndpoint = () => {
    if (!newEndpoint.route) {
      alert('Endpoint route is required.');
      return;
    }
    
    // Check if route+method already exists
    if (data.endpoints.some(endpoint => endpoint.route === newEndpoint.route && endpoint.method === newEndpoint.method)) {
      alert(`An endpoint with route "${newEndpoint.route}" and method "${newEndpoint.method}" already exists.`);
      return;
    }
    
    const updatedEndpoints = [...data.endpoints, { ...newEndpoint }];
    updateData({ endpoints: updatedEndpoints });
    
    // Reset form
    setNewEndpoint({
      route: '',
      method: 'GET',
      description: '',
      requiresAuth: false,
      parameters: []
    });
  };
  
  const updateEndpoint = () => {
    if (editingEndpointIndex === null) return;
    
    if (!newEndpoint.route) {
      alert('Endpoint route is required.');
      return;
    }
    
    // Check if route+method already exists (except for the current endpoint)
    if (data.endpoints.some((endpoint, index) => endpoint.route === newEndpoint.route && endpoint.method === newEndpoint.method && index !== editingEndpointIndex)) {
      alert(`An endpoint with route "${newEndpoint.route}" and method "${newEndpoint.method}" already exists.`);
      return;
    }
    
    const updatedEndpoints = [...data.endpoints];
    updatedEndpoints[editingEndpointIndex] = { ...newEndpoint };
    updateData({ endpoints: updatedEndpoints });
    
    // Reset form and editing state
    setNewEndpoint({
      route: '',
      method: 'GET',
      description: '',
      requiresAuth: false,
      parameters: []
    });
    setEditingEndpointIndex(null);
  };
  
  const editEndpoint = (index) => {
    setEditingEndpointIndex(index);
    setNewEndpoint({ ...data.endpoints[index] });
  };
  
  const deleteEndpoint = (index) => {
    if (window.confirm('Are you sure you want to delete this endpoint?')) {
      const updatedEndpoints = [...data.endpoints];
      updatedEndpoints.splice(index, 1);
      updateData({ endpoints: updatedEndpoints });
    }
  };
  
  const addParameter = (endpointIndex) => {
    if (!newParameter.name) {
      alert('Parameter name is required.');
      return;
    }
    
    // Check if name already exists in this endpoint
    if (data.endpoints[endpointIndex].parameters.some(param => param.name === newParameter.name)) {
      alert('A parameter with this name already exists for this endpoint.');
      return;
    }
    
    const updatedEndpoints = [...data.endpoints];
    updatedEndpoints[endpointIndex].parameters.push({ ...newParameter });
    updateData({ endpoints: updatedEndpoints });
    
    // Reset form
    setNewParameter({
      name: '',
      type: 'string',
      description: '',
      required: false,
      default: ''
    });
  };
  
  const updateParameter = (endpointIndex) => {
    if (editingParameterIndex === null) return;
    
    if (!newParameter.name) {
      alert('Parameter name is required.');
      return;
    }
    
    // Check if name already exists in this endpoint (except for the current parameter)
    if (data.endpoints[endpointIndex].parameters.some((param, index) => param.name === newParameter.name && index !== editingParameterIndex)) {
      alert('A parameter with this name already exists for this endpoint.');
      return;
    }
    
    const updatedEndpoints = [...data.endpoints];
    updatedEndpoints[endpointIndex].parameters[editingParameterIndex] = { ...newParameter };
    updateData({ endpoints: updatedEndpoints });
    
    // Reset form and editing state
    setNewParameter({
      name: '',
      type: 'string',
      description: '',
      required: false,
      default: ''
    });
    setEditingParameterIndex(null);
  };
  
  const editParameter = (endpointIndex, paramIndex) => {
    setEditingParameterIndex(paramIndex);
    setNewParameter({ ...data.endpoints[endpointIndex].parameters[paramIndex] });
  };
  
  const deleteParameter = (endpointIndex, paramIndex) => {
    if (window.confirm('Are you sure you want to delete this parameter?')) {
      const updatedEndpoints = [...data.endpoints];
      updatedEndpoints[endpointIndex].parameters.splice(paramIndex, 1);
      updateData({ endpoints: updatedEndpoints });
    }
  };
  
  const cancelEdit = () => {
    setEditingEndpointIndex(null);
    setEditingParameterIndex(null);
    setNewEndpoint({
      route: '',
      method: 'GET',
      description: '',
      requiresAuth: false,
      parameters: []
    });
    setNewParameter({
      name: '',
      type: 'string',
      description: '',
      required: false,
      default: ''
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">REST API Endpoints</h2>
      <p className="mb-6 text-gray-600">
        Create custom REST API endpoints for your WordPress plugin. These endpoints can be used to interact with your plugin data from external applications.
      </p>

      <div className="wp-card mb-6">
        <h3 className="text-xl font-bold mb-4">
          {editingEndpointIndex !== null ? 'Edit Endpoint' : 'Add Endpoint'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="endpointRoute" className="block text-sm font-medium text-gray-700 mb-1">
                Route <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="endpointRoute"
                name="route"
                value={newEndpoint.route}
                onChange={handleEndpointChange}
                className="wp-input"
                placeholder="/my-plugin/v1/items"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                The route for your endpoint (e.g., "/my-plugin/v1/items").
              </p>
            </div>
            
            <div>
              <label htmlFor="endpointMethod" className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <select
                id="endpointMethod"
                name="method"
                value={newEndpoint.method}
                onChange={handleEndpointChange}
                className="wp-select"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="endpointDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="endpointDescription"
              name="description"
              value={newEndpoint.description}
              onChange={handleEndpointChange}
              className="wp-input"
              rows="2"
              placeholder="Description of what this endpoint does."
            ></textarea>
          </div>
          
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="endpointRequiresAuth"
                name="requiresAuth"
                checked={newEndpoint.requiresAuth}
                onChange={handleEndpointChange}
                className="wp-checkbox"
              />
              <label htmlFor="endpointRequiresAuth" className="ml-2 text-sm">
                Requires Authentication
              </label>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              If checked, only authenticated users can access this endpoint.
            </p>
          </div>
          
          <div className="flex justify-end space-x-2">
            {editingEndpointIndex !== null && (
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
              onClick={editingEndpointIndex !== null ? updateEndpoint : addEndpoint}
            >
              {editingEndpointIndex !== null ? 'Update Endpoint' : 'Add Endpoint'}
            </button>
          </div>
        </div>
      </div>

      {data.endpoints.length > 0 ? (
        <div className="space-y-6">
          {data.endpoints.map((endpoint, endpointIndex) => (
            <div key={endpointIndex} className="wp-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  <span className="bg-wordpress-blue text-white px-2 py-1 rounded text-sm mr-2">
                    {endpoint.method}
                  </span>
                  {endpoint.route}
                </h3>
                <div className="space-x-2">
                  <button
                    type="button"
                    className="text-wordpress-blue hover:text-wordpress-lightblue"
                    onClick={() => editEndpoint(endpointIndex)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteEndpoint(endpointIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              {endpoint.description && (
                <p className="mb-4">{endpoint.description}</p>
              )}
              
              <div className="mb-4">
                <p className="text-sm">
                  <strong>Authentication:</strong> {endpoint.requiresAuth ? 'Required' : 'Not required'}
                </p>
                <p className="text-sm">
                  <strong>Full URL:</strong> https://your-site.com/wp-json{endpoint.route}
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-bold mb-2">Parameters</h4>
                
                {endpoint.parameters.length > 0 ? (
                  <div className="space-y-4 mb-4">
                    {endpoint.parameters.map((param, paramIndex) => (
                      <div key={paramIndex} className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">{param.name}</h5>
                          <div className="space-x-2">
                            <button
                              type="button"
                              className="text-wordpress-blue hover:text-wordpress-lightblue text-sm"
                              onClick={() => editParameter(endpointIndex, paramIndex)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-800 text-sm"
                              onClick={() => deleteParameter(endpointIndex, paramIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-sm">Type: {param.type}</p>
                        {param.description && <p className="text-sm">Description: {param.description}</p>}
                        <p className="text-sm">Required: {param.required ? 'Yes' : 'No'}</p>
                        {param.default && <p className="text-sm">Default: {param.default}</p>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-4">No parameters added yet.</p>
                )}
                
                <div className="bg-gray-50 p-4 rounded">
                  <h5 className="font-bold mb-3">
                    {editingParameterIndex !== null ? 'Edit Parameter' : 'Add Parameter'}
                  </h5>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`paramName-${endpointIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Parameter Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`paramName-${endpointIndex}`}
                          name="name"
                          value={newParameter.name}
                          onChange={handleParameterChange}
                          className="wp-input"
                          placeholder="my_parameter"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`paramType-${endpointIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Parameter Type
                        </label>
                        <select
                          id={`paramType-${endpointIndex}`}
                          name="type"
                          value={newParameter.type}
                          onChange={handleParameterChange}
                          className="wp-select"
                        >
                          <option value="string">String</option>
                          <option value="integer">Integer</option>
                          <option value="boolean">Boolean</option>
                          <option value="array">Array</option>
                          <option value="object">Object</option>
                          <option value="number">Number</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor={`paramDescription-${endpointIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        id={`paramDescription-${endpointIndex}`}
                        name="description"
                        value={newParameter.description}
                        onChange={handleParameterChange}
                        className="wp-input"
                        placeholder="Description of this parameter."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`paramDefault-${endpointIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Default Value
                        </label>
                        <input
                          type="text"
                          id={`paramDefault-${endpointIndex}`}
                          name="default"
                          value={newParameter.default}
                          onChange={handleParameterChange}
                          className="wp-input"
                          placeholder="Default value for this parameter."
                        />
                      </div>
                      
                      <div className="flex items-center h-full pt-6">
                        <input
                          type="checkbox"
                          id={`paramRequired-${endpointIndex}`}
                          name="required"
                          checked={newParameter.required}
                          onChange={handleParameterChange}
                          className="wp-checkbox"
                        />
                        <label htmlFor={`paramRequired-${endpointIndex}`} className="ml-2 text-sm">
                          Required
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      {editingParameterIndex !== null && (
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
                        onClick={() => editingParameterIndex !== null ? updateParameter(endpointIndex) : addParameter(endpointIndex)}
                      >
                        {editingParameterIndex !== null ? 'Update Parameter' : 'Add Parameter'}
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
          <p className="text-gray-500 mb-4">No endpoints added yet.</p>
          <p className="text-sm">Add an endpoint to get started.</p>
        </div>
      )}
    </div>
  );
}

export default RestApi;
