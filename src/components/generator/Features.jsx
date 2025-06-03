import React from 'react';

function Features({ data, updateData }) {
  const handleChange = (e) => {
    const { name, checked } = e.target;
    updateData({ [name]: checked });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plugin Features</h2>
      <p className="mb-6 text-gray-600">
        Select the features you want to include in your WordPress plugin. You'll be able to configure each selected feature in the next steps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="wp-card">
          <h3 className="text-xl font-bold mb-4">Admin & Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="adminPage"
                  name="adminPage"
                  type="checkbox"
                  checked={data.adminPage}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="adminPage" className="font-medium">
                  Admin Pages
                </label>
                <p className="text-sm text-gray-500">
                  Create custom admin pages in the WordPress dashboard.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="settings"
                  name="settings"
                  type="checkbox"
                  checked={data.settings}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="settings" className="font-medium">
                  Settings API
                </label>
                <p className="text-sm text-gray-500">
                  Create plugin settings using the WordPress Settings API.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="wp-card">
          <h3 className="text-xl font-bold mb-4">Content Types</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="customPostTypes"
                  name="customPostTypes"
                  type="checkbox"
                  checked={data.customPostTypes}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="customPostTypes" className="font-medium">
                  Custom Post Types
                </label>
                <p className="text-sm text-gray-500">
                  Create custom post types with custom fields and taxonomies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="customTaxonomies"
                  name="customTaxonomies"
                  type="checkbox"
                  checked={data.customTaxonomies}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="customTaxonomies" className="font-medium">
                  Custom Taxonomies
                </label>
                <p className="text-sm text-gray-500">
                  Create custom taxonomies (categories, tags) for any post type.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="wp-card">
          <h3 className="text-xl font-bold mb-4">Frontend Features</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="shortcodes"
                  name="shortcodes"
                  type="checkbox"
                  checked={data.shortcodes}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="shortcodes" className="font-medium">
                  Shortcodes
                </label>
                <p className="text-sm text-gray-500">
                  Create custom shortcodes for use in posts and pages.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="widgets"
                  name="widgets"
                  type="checkbox"
                  checked={data.widgets}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="widgets" className="font-medium">
                  Widgets
                </label>
                <p className="text-sm text-gray-500">
                  Create custom widgets for use in sidebars and widget areas.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="blocks"
                  name="blocks"
                  type="checkbox"
                  checked={data.blocks}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="blocks" className="font-medium">
                  Gutenberg Blocks
                </label>
                <p className="text-sm text-gray-500">
                  Create custom blocks for the Gutenberg editor.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="wp-card">
          <h3 className="text-xl font-bold mb-4">Advanced Features</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="restApi"
                  name="restApi"
                  type="checkbox"
                  checked={data.restApi}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="restApi" className="font-medium">
                  REST API Endpoints
                </label>
                <p className="text-sm text-gray-500">
                  Create custom REST API endpoints for your plugin.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="database"
                  name="database"
                  type="checkbox"
                  checked={data.database}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="database" className="font-medium">
                  Custom Database Tables
                </label>
                <p className="text-sm text-gray-500">
                  Create custom database tables for your plugin data.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="cron"
                  name="cron"
                  type="checkbox"
                  checked={data.cron}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="cron" className="font-medium">
                  Cron Jobs
                </label>
                <p className="text-sm text-gray-500">
                  Schedule tasks using the WordPress cron system.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="userRoles"
                  name="userRoles"
                  type="checkbox"
                  checked={data.userRoles}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="userRoles" className="font-medium">
                  User Roles & Capabilities
                </label>
                <p className="text-sm text-gray-500">
                  Create custom user roles and capabilities.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="email"
                  name="email"
                  type="checkbox"
                  checked={data.email}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="email" className="font-medium">
                  Email Functionality
                </label>
                <p className="text-sm text-gray-500">
                  Add email sending capabilities to your plugin.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="ajax"
                  name="ajax"
                  type="checkbox"
                  checked={data.ajax}
                  onChange={handleChange}
                  className="wp-checkbox"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="ajax" className="font-medium">
                  AJAX Handlers
                </label>
                <p className="text-sm text-gray-500">
                  Create AJAX handlers for asynchronous requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
