import React from 'react';

function Documentation() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="mb-4">
          Welcome to the WordPress Plugin Generator documentation. This guide will help you understand how to use our tool to create custom WordPress plugins without writing code.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-3">How to Use the Generator</h3>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>Start by filling in the <strong>Basic Info</strong> tab with your plugin details.</li>
          <li>Select the features you want to include in your plugin from the <strong>Features</strong> tab.</li>
          <li>Configure each selected feature in its respective tab.</li>
          <li>Preview your generated plugin code.</li>
          <li>Download the plugin as a ZIP file.</li>
          <li>Install and activate the plugin on your WordPress site.</li>
        </ol>
        
        <h3 className="text-xl font-bold mt-6 mb-3">Installation Instructions</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Download the generated plugin ZIP file.</li>
          <li>Log in to your WordPress admin dashboard.</li>
          <li>Navigate to <strong>Plugins → Add New → Upload Plugin</strong>.</li>
          <li>Choose the ZIP file you downloaded and click <strong>Install Now</strong>.</li>
          <li>After installation, click <strong>Activate Plugin</strong>.</li>
        </ol>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Feature Documentation</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Admin Pages & Settings</h3>
          <p className="mb-2">
            Create custom admin pages and settings for your plugin. You can define multiple settings sections and fields.
          </p>
          <p>
            After activation, your settings will be available under the menu location you specified in the generator.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Custom Post Types</h3>
          <p className="mb-2">
            Define custom post types with custom fields, taxonomies, and admin columns.
          </p>
          <p>
            Your custom post types will appear in the WordPress admin menu after activation.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Shortcodes</h3>
          <p className="mb-2">
            Create shortcodes that can be used in posts and pages to display custom content.
          </p>
          <p>
            Use your shortcodes in the WordPress editor by typing <code>[your-shortcode]</code> or with attributes <code>[your-shortcode attr="value"]</code>.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">REST API Endpoints</h3>
          <p className="mb-2">
            Create custom REST API endpoints for your plugin to enable external access to your data.
          </p>
          <p>
            Your endpoints will be available at <code>/wp-json/your-namespace/v1/your-endpoint</code>.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Database Tables</h3>
          <p className="mb-2">
            Create custom database tables to store plugin-specific data.
          </p>
          <p>
            Tables will be created during plugin activation and can be accessed through the provided helper functions.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Security</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Always validate and sanitize user input using WordPress functions.</li>
            <li>Use nonces for form submissions to prevent CSRF attacks.</li>
            <li>Check user capabilities before performing actions.</li>
            <li>Escape output when displaying data.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">Performance</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Enqueue scripts and styles only when needed.</li>
            <li>Use WordPress transients API for caching.</li>
            <li>Optimize database queries.</li>
            <li>Follow WordPress coding standards.</li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-3">Compatibility</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Test your plugin with different WordPress versions.</li>
            <li>Ensure compatibility with popular themes and plugins.</li>
            <li>Follow WordPress hooks and filters pattern.</li>
            <li>Use responsive design for admin interfaces.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Documentation;
