import React, { useState } from 'react';

function Database({ data, updateData }) {
  const [tables, setTables] = useState(data.tables || []);
  const [newTable, setNewTable] = useState({
    name: '',
    description: '',
    columns: []
  });
  const [newColumn, setNewColumn] = useState({
    name: '',
    type: 'varchar',
    length: '255',
    nullable: false,
    default: '',
    primary: false,
    autoIncrement: false,
    index: false,
    unique: false
  });
  const [editingTableIndex, setEditingTableIndex] = useState(null);
  const [showColumnForm, setShowColumnForm] = useState(false);

  const handleTableChange = (e) => {
    const { name, value } = e.target;
    setNewTable({
      ...newTable,
      [name]: value
    });
  };

  const handleColumnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewColumn({
      ...newColumn,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addTable = () => {
    if (!newTable.name) {
      alert('Table name is required');
      return;
    }

    if (tables.some(table => table.name === newTable.name)) {
      alert('Table name must be unique');
      return;
    }

    const updatedTables = [...tables, { ...newTable, columns: [] }];
    setTables(updatedTables);
    updateData({ tables: updatedTables });
    setNewTable({ name: '', description: '', columns: [] });
    setEditingTableIndex(updatedTables.length - 1);
  };

  const addColumn = () => {
    if (!newColumn.name) {
      alert('Column name is required');
      return;
    }

    if (tables[editingTableIndex].columns.some(col => col.name === newColumn.name)) {
      alert('Column name must be unique within a table');
      return;
    }

    const updatedTables = [...tables];
    updatedTables[editingTableIndex].columns.push({ ...newColumn });
    setTables(updatedTables);
    updateData({ tables: updatedTables });
    setNewColumn({
      name: '',
      type: 'varchar',
      length: '255',
      nullable: false,
      default: '',
      primary: false,
      autoIncrement: false,
      index: false,
      unique: false
    });
    setShowColumnForm(false);
  };

  const removeTable = (index) => {
    if (window.confirm('Are you sure you want to remove this table?')) {
      const updatedTables = [...tables];
      updatedTables.splice(index, 1);
      setTables(updatedTables);
      updateData({ tables: updatedTables });
      if (editingTableIndex === index) {
        setEditingTableIndex(null);
      }
    }
  };

  const removeColumn = (tableIndex, columnIndex) => {
    if (window.confirm('Are you sure you want to remove this column?')) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].columns.splice(columnIndex, 1);
      setTables(updatedTables);
      updateData({ tables: updatedTables });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Database Tables</h2>
      <p className="mb-4">Define the database tables your plugin will create and manage.</p>

      {/* Table List */}
      {tables.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Your Tables</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tables.map((table, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${editingTableIndex === index ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => setEditingTableIndex(index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{table.name}</h4>
                    <p className="text-sm text-gray-600">{table.description || 'No description'}</p>
                    <p className="text-xs text-gray-500 mt-1">{table.columns.length} columns</p>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTable(index);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Table Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Add New Table</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Table Name*
            </label>
            <input
              type="text"
              name="name"
              value={newTable.name}
              onChange={handleTableChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., my_plugin_users"
            />
            <p className="text-xs text-gray-500 mt-1">
              Will be prefixed with WordPress table prefix (usually wp_)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={newTable.description}
              onChange={handleTableChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="What this table will store"
            />
          </div>
        </div>
        <button
          className="wp-button mt-4"
          onClick={addTable}
        >
          Add Table
        </button>
      </div>

      {/* Table Columns Section */}
      {editingTableIndex !== null && (
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-2">
            Columns for {tables[editingTableIndex].name}
          </h3>
          
          {/* Column List */}
          {tables[editingTableIndex].columns.length > 0 ? (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attributes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tables[editingTableIndex].columns.map((column, colIndex) => (
                    <tr key={colIndex}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {column.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {column.type}{column.length ? `(${column.length})` : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {column.primary && <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Primary</span>}
                          {column.autoIncrement && <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Auto Inc</span>}
                          {column.unique && <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">Unique</span>}
                          {column.index && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Indexed</span>}
                          {column.nullable && <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">Nullable</span>}
                          {column.default && <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">Default: {column.default}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => removeColumn(editingTableIndex, colIndex)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No columns defined yet. Add your first column below.</p>
          )}

          {/* Add Column Button/Form */}
          {showColumnForm ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Add New Column</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Column Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newColumn.name}
                    onChange={handleColumnChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., user_id"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Type
                  </label>
                  <select
                    name="type"
                    value={newColumn.type}
                    onChange={handleColumnChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="int">INT</option>
                    <option value="bigint">BIGINT</option>
                    <option value="varchar">VARCHAR</option>
                    <option value="text">TEXT</option>
                    <option value="datetime">DATETIME</option>
                    <option value="date">DATE</option>
                    <option value="time">TIME</option>
                    <option value="decimal">DECIMAL</option>
                    <option value="float">FLOAT</option>
                    <option value="boolean">BOOLEAN</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
                {(newColumn.type === 'varchar' || newColumn.type === 'int' || newColumn.type === 'decimal') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Length/Precision
                    </label>
                    <input
                      type="text"
                      name="length"
                      value={newColumn.length}
                      onChange={handleColumnChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder={newColumn.type === 'varchar' ? "255" : "11"}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Value
                  </label>
                  <input
                    type="text"
                    name="default"
                    value={newColumn.default}
                    onChange={handleColumnChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Leave empty for no default"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="nullable"
                      name="nullable"
                      checked={newColumn.nullable}
                      onChange={handleColumnChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="nullable" className="ml-2 block text-sm text-gray-900">
                      Allow NULL values
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="primary"
                    name="primary"
                    checked={newColumn.primary}
                    onChange={(e) => {
                      const isPrimary = e.target.checked;
                      setNewColumn({
                        ...newColumn,
                        primary: isPrimary,
                        nullable: isPrimary ? false : newColumn.nullable,
                        unique: isPrimary ? true : newColumn.unique
                      });
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="primary" className="ml-2 block text-sm text-gray-900">
                    Primary Key
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoIncrement"
                    name="autoIncrement"
                    checked={newColumn.autoIncrement}
                    onChange={(e) => {
                      const isAutoInc = e.target.checked;
                      setNewColumn({
                        ...newColumn,
                        autoIncrement: isAutoInc,
                        type: isAutoInc ? 'int' : newColumn.type,
                        nullable: isAutoInc ? false : newColumn.nullable
                      });
                    }}
                    disabled={!['int', 'bigint'].includes(newColumn.type)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="autoIncrement" className="ml-2 block text-sm text-gray-900">
                    Auto Increment
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="unique"
                    name="unique"
                    checked={newColumn.unique}
                    onChange={handleColumnChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="unique" className="ml-2 block text-sm text-gray-900">
                    Unique
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="index"
                    name="index"
                    checked={newColumn.index}
                    onChange={handleColumnChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="index" className="ml-2 block text-sm text-gray-900">
                    Create Index
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  className="wp-button bg-gray-500 hover:bg-gray-600"
                  onClick={() => setShowColumnForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="wp-button"
                  onClick={addColumn}
                >
                  Add Column
                </button>
              </div>
            </div>
          ) : (
            <button
              className="wp-button"
              onClick={() => setShowColumnForm(true)}
            >
              Add Column
            </button>
          )}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-yellow-800 mb-2">Database Best Practices</h3>
        <ul className="list-disc pl-5 text-yellow-700 space-y-1">
          <li>Always use the WordPress dbDelta() function for creating/updating tables</li>
          <li>Include a primary key for each table</li>
          <li>Consider adding created_at and updated_at timestamp columns</li>
          <li>Use appropriate data types and lengths for your columns</li>
          <li>Add indexes for columns used in WHERE clauses</li>
          <li>Follow WordPress naming conventions (lowercase with underscores)</li>
        </ul>
      </div>
    </div>
  );
}

export default Database;
