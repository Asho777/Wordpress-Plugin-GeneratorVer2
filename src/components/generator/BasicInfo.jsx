import React, { useEffect } from 'react';

function BasicInfo({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  // Generate slug from name
  useEffect(() => {
    if (data.name && !data.slug) {
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      updateData({ slug });
    }
  }, [data.name, data.slug, updateData]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Plugin Information</h2>
      <p className="mb-6 text-gray-600">
        Enter the basic information about your WordPress plugin. This information will be used in the plugin header and readme file.
      </p>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Plugin Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="wp-input"
            placeholder="My Awesome Plugin"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            The name of your plugin as displayed in the WordPress admin.
          </p>
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Plugin Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={data.slug}
            onChange={handleChange}
            className="wp-input"
            placeholder="my-awesome-plugin"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            The slug is used for the plugin directory name and in function prefixes.
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="wp-input"
            rows="3"
            placeholder="A short description of what your plugin does."
            required
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            A brief description of your plugin's purpose and functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={data.author}
              onChange={handleChange}
              className="wp-input"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="authorUri" className="block text-sm font-medium text-gray-700 mb-1">
              Author URI
            </label>
            <input
              type="url"
              id="authorUri"
              name="authorUri"
              value={data.authorUri}
              onChange={handleChange}
              className="wp-input"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="version" className="block text-sm font-medium text-gray-700 mb-1">
              Version
            </label>
            <input
              type="text"
              id="version"
              name="version"
              value={data.version}
              onChange={handleChange}
              className="wp-input"
              placeholder="1.0.0"
            />
          </div>

          <div>
            <label htmlFor="requiresWp" className="block text-sm font-medium text-gray-700 mb-1">
              Requires WordPress
            </label>
            <input
              type="text"
              id="requiresWp"
              name="requiresWp"
              value={data.requiresWp}
              onChange={handleChange}
              className="wp-input"
              placeholder="5.0"
            />
          </div>

          <div>
            <label htmlFor="requiresPhp" className="block text-sm font-medium text-gray-700 mb-1">
              Requires PHP
            </label>
            <input
              type="text"
              id="requiresPhp"
              name="requiresPhp"
              value={data.requiresPhp}
              onChange={handleChange}
              className="wp-input"
              placeholder="7.0"
            />
          </div>
        </div>

        <div>
          <label htmlFor="license" className="block text-sm font-medium text-gray-700 mb-1">
            License
          </label>
          <select
            id="license"
            name="license"
            value={data.license}
            onChange={handleChange}
            className="wp-select"
          >
            <option value="GPL-2.0+">GPL v2 or later (recommended)</option>
            <option value="GPL-3.0+">GPL v3 or later</option>
            <option value="MIT">MIT</option>
            <option value="BSD-3-Clause">BSD 3-Clause</option>
            <option value="Apache-2.0">Apache License 2.0</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            WordPress plugins are typically released under GPL v2 or later.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
