import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Create WordPress Plugins Without Coding</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Generate professional, secure, and customizable WordPress plugins in minutes with our intuitive plugin generator.
        </p>
        <Link to="/generator" className="wp-button text-lg px-8 py-3">
          Start Building
        </Link>
      </section>

      <section className="py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="wp-card text-center">
            <div className="text-wordpress-blue text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Fast & Easy</h2>
            <p>Create fully functional WordPress plugins in minutes without writing a single line of code.</p>
          </div>

          <div className="wp-card text-center">
            <div className="text-wordpress-blue text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Secure Code</h2>
            <p>All generated plugins follow WordPress security best practices to keep your site safe.</p>
          </div>

          <div className="wp-card text-center">
            <div className="text-wordpress-blue text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Customizable</h2>
            <p>Choose from a variety of features and options to create plugins tailored to your needs.</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-wordpress-grey rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-wordpress-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-2">Configure</h3>
            <p>Choose your plugin name, features, and settings</p>
          </div>
          <div className="text-center">
            <div className="bg-wordpress-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <p>Review the generated code and make adjustments</p>
          </div>
          <div className="text-center">
            <div className="bg-wordpress-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-2">Download</h3>
            <p>Get your plugin as a ready-to-install ZIP file</p>
          </div>
          <div className="text-center">
            <div className="bg-wordpress-blue text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
            <h3 className="text-xl font-semibold mb-2">Install</h3>
            <p>Upload and activate your plugin on any WordPress site</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Features You Can Include</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Admin Pages & Settings",
            "Custom Post Types",
            "Custom Taxonomies",
            "Shortcodes",
            "Widgets",
            "REST API Endpoints",
            "Database Tables",
            "Cron Jobs",
            "User Roles & Capabilities",
            "Gutenberg Blocks",
            "Email Functionality",
            "AJAX Handlers"
          ].map((feature, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-wordpress-blue mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/generator" className="wp-button">
            Start Building Your Plugin
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
