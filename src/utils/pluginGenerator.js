/**
 * WordPress Plugin Generator Utility
 * 
 * This utility generates WordPress plugin files based on user configuration.
 */

/**
 * Generate the main plugin file content
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The main plugin file content
 */
const generateMainPluginFile = (pluginData) => {
  const { name, slug, description, author, authorUri, version, requiresWp, requiresPhp, license } = pluginData.basic;
  
  return `<?php
/**
 * Plugin Name: ${name}
 * Plugin URI: ${authorUri || ''}
 * Description: ${description}
 * Version: ${version}
 * Author: ${author}
 * Author URI: ${authorUri || ''}
 * License: ${license}
 * Text Domain: ${slug}
 * Domain Path: /languages
 * Requires at least: ${requiresWp}
 * Requires PHP: ${requiresPhp}
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

// Define plugin constants
define('${slug.toUpperCase()}_VERSION', '${version}');
define('${slug.toUpperCase()}_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('${slug.toUpperCase()}_PLUGIN_URL', plugin_dir_url(__FILE__));
define('${slug.toUpperCase()}_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * The code that runs during plugin activation.
 */
function activate_${slug.replace(/-/g, '_')}() {
    require_once ${slug.toUpperCase()}_PLUGIN_DIR . 'includes/class-${slug}-activator.php';
    ${slug.replace(/-/g, '_')}_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 */
function deactivate_${slug.replace(/-/g, '_')}() {
    require_once ${slug.toUpperCase()}_PLUGIN_DIR . 'includes/class-${slug}-deactivator.php';
    ${slug.replace(/-/g, '_')}_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_${slug.replace(/-/g, '_')}');
register_deactivation_hook(__FILE__, 'deactivate_${slug.replace(/-/g, '_')}');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require_once ${slug.toUpperCase()}_PLUGIN_DIR . 'includes/class-${slug}.php';

/**
 * Begins execution of the plugin.
 */
function run_${slug.replace(/-/g, '_')}() {
    $plugin = new ${slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_')}();
    $plugin->run();
}
run_${slug.replace(/-/g, '_')}();
`;
};

/**
 * Generate the plugin class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The plugin class file content
 */
const generatePluginClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  let loaderCode = '';
  
  // Add admin page loader if enabled
  if (pluginData.features.adminPage) {
    loaderCode += `
        // Admin pages
        $this->loader->add_action('admin_menu', $plugin_admin, 'add_plugin_admin_menu');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_admin_styles');
        $this->loader->add_action('admin_enqueue_scripts', $plugin_admin, 'enqueue_admin_scripts');`;
  }
  
  // Add settings loader if enabled
  if (pluginData.features.settings) {
    loaderCode += `
        // Settings
        $this->loader->add_action('admin_init', $plugin_admin, 'register_settings');`;
  }
  
  // Add custom post types loader if enabled
  if (pluginData.features.customPostTypes) {
    loaderCode += `
        // Custom Post Types
        $this->loader->add_action('init', $plugin_admin, 'register_custom_post_types');`;
  }
  
  // Add shortcodes loader if enabled
  if (pluginData.features.shortcodes) {
    loaderCode += `
        // Shortcodes
        $this->loader->add_action('init', $plugin_public, 'register_shortcodes');`;
  }
  
  // Add REST API loader if enabled
  if (pluginData.features.restApi) {
    loaderCode += `
        // REST API
        $this->loader->add_action('rest_api_init', $plugin_public, 'register_rest_routes');`;
  }
  
  return `<?php

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/includes
 */
class ${className} {

    /**
     * The loader that's responsible for maintaining and registering all hooks that power
     * the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      ${className}_Loader    $loader    Maintains and registers all hooks for the plugin.
     */
    protected $loader;

    /**
     * The unique identifier of this plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $plugin_name    The string used to uniquely identify this plugin.
     */
    protected $plugin_name;

    /**
     * The current version of the plugin.
     *
     * @since    1.0.0
     * @access   protected
     * @var      string    $version    The current version of the plugin.
     */
    protected $version;

    /**
     * Define the core functionality of the plugin.
     *
     * Set the plugin name and the plugin version that can be used throughout the plugin.
     * Load the dependencies, define the locale, and set the hooks for the admin area and
     * the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function __construct() {
        if (defined('${slug.toUpperCase()}_VERSION')) {
            $this->version = ${slug.toUpperCase()}_VERSION;
        } else {
            $this->version = '1.0.0';
        }
        $this->plugin_name = '${slug}';

        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }

    /**
     * Load the required dependencies for this plugin.
     *
     * Include the following files that make up the plugin:
     *
     * - ${className}_Loader. Orchestrates the hooks of the plugin.
     * - ${className}_i18n. Defines internationalization functionality.
     * - ${className}_Admin. Defines all hooks for the admin area.
     * - ${className}_Public. Defines all hooks for the public side of the site.
     *
     * Create an instance of the loader which will be used to register the hooks
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function load_dependencies() {

        /**
         * The class responsible for orchestrating the actions and filters of the
         * core plugin.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-${slug}-loader.php';

        /**
         * The class responsible for defining internationalization functionality
         * of the plugin.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'includes/class-${slug}-i18n.php';

        /**
         * The class responsible for defining all actions that occur in the admin area.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'admin/class-${slug}-admin.php';

        /**
         * The class responsible for defining all actions that occur in the public-facing
         * side of the site.
         */
        require_once plugin_dir_path(dirname(__FILE__)) . 'public/class-${slug}-public.php';

        $this->loader = new ${className}_Loader();
    }

    /**
     * Define the locale for this plugin for internationalization.
     *
     * Uses the ${className}_i18n class in order to set the domain and to register the hook
     * with WordPress.
     *
     * @since    1.0.0
     * @access   private
     */
    private function set_locale() {
        $plugin_i18n = new ${className}_i18n();
        $this->loader->add_action('plugins_loaded', $plugin_i18n, 'load_plugin_textdomain');
    }

    /**
     * Register all of the hooks related to the admin area functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_admin_hooks() {
        $plugin_admin = new ${className}_Admin($this->get_plugin_name(), $this->get_version());
${loaderCode}
    }

    /**
     * Register all of the hooks related to the public-facing functionality
     * of the plugin.
     *
     * @since    1.0.0
     * @access   private
     */
    private function define_public_hooks() {
        $plugin_public = new ${className}_Public($this->get_plugin_name(), $this->get_version());

        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_styles');
        $this->loader->add_action('wp_enqueue_scripts', $plugin_public, 'enqueue_scripts');
    }

    /**
     * Run the loader to execute all of the hooks with WordPress.
     *
     * @since    1.0.0
     */
    public function run() {
        $this->loader->run();
    }

    /**
     * The name of the plugin used to uniquely identify it within the context of
     * WordPress and to define internationalization functionality.
     *
     * @since     1.0.0
     * @return    string    The name of the plugin.
     */
    public function get_plugin_name() {
        return $this->plugin_name;
    }

    /**
     * The reference to the class that orchestrates the hooks with the plugin.
     *
     * @since     1.0.0
     * @return    ${className}_Loader    Orchestrates the hooks of the plugin.
     */
    public function get_loader() {
        return $this->loader;
    }

    /**
     * Retrieve the version number of the plugin.
     *
     * @since     1.0.0
     * @return    string    The version number of the plugin.
     */
    public function get_version() {
        return $this->version;
    }
}
`;
};

/**
 * Generate the loader class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The loader class file content
 */
const generateLoaderClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  return `<?php

/**
 * Register all actions and filters for the plugin.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/includes
 */
class ${className}_Loader {

    /**
     * The array of actions registered with WordPress.
     *
     * @since    1.0.0
     * @access   protected
     * @var      array    $actions    The actions registered with WordPress to fire when the plugin loads.
     */
    protected $actions;

    /**
     * The array of filters registered with WordPress.
     *
     * @since    1.0.0
     * @access   protected
     * @var      array    $filters    The filters registered with WordPress to fire when the plugin loads.
     */
    protected $filters;

    /**
     * Initialize the collections used to maintain the actions and filters.
     *
     * @since    1.0.0
     */
    public function __construct() {
        $this->actions = array();
        $this->filters = array();
    }

    /**
     * Add a new action to the collection to be registered with WordPress.
     *
     * @since    1.0.0
     * @param    string               $hook             The name of the WordPress action that is being registered.
     * @param    object               $component        A reference to the instance of the object on which the action is defined.
     * @param    string               $callback         The name of the function definition on the $component.
     * @param    int                  $priority         Optional. The priority at which the function should be fired. Default is 10.
     * @param    int                  $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1.
     */
    public function add_action($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->actions = $this->add($this->actions, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * Add a new filter to the collection to be registered with WordPress.
     *
     * @since    1.0.0
     * @param    string               $hook             The name of the WordPress filter that is being registered.
     * @param    object               $component        A reference to the instance of the object on which the filter is defined.
     * @param    string               $callback         The name of the function definition on the $component.
     * @param    int                  $priority         Optional. The priority at which the function should be fired. Default is 10.
     * @param    int                  $accepted_args    Optional. The number of arguments that should be passed to the $callback. Default is 1
     */
    public function add_filter($hook, $component, $callback, $priority = 10, $accepted_args = 1) {
        $this->filters = $this->add($this->filters, $hook, $component, $callback, $priority, $accepted_args);
    }

    /**
     * A utility function that is used to register the actions and hooks into a single
     * collection.
     *
     * @since    1.0.0
     * @access   private
     * @param    array                $hooks            The collection of hooks that is being registered (that is, actions or filters).
     * @param    string               $hook             The name of the WordPress filter that is being registered.
     * @param    object               $component        A reference to the instance of the object on which the filter is defined.
     * @param    string               $callback         The name of the function definition on the $component.
     * @param    int                  $priority         The priority at which the function should be fired.
     * @param    int                  $accepted_args    The number of arguments that should be passed to the $callback.
     * @return   array                                  The collection of actions and filters registered with WordPress.
     */
    private function add($hooks, $hook, $component, $callback, $priority, $accepted_args) {
        $hooks[] = array(
            'hook'          => $hook,
            'component'     => $component,
            'callback'      => $callback,
            'priority'      => $priority,
            'accepted_args' => $accepted_args
        );

        return $hooks;
    }

    /**
     * Register the filters and actions with WordPress.
     *
     * @since    1.0.0
     */
    public function run() {
        foreach ($this->filters as $hook) {
            add_filter($hook['hook'], array($hook['component'], $hook['callback']), $hook['priority'], $hook['accepted_args']);
        }

        foreach ($this->actions as $hook) {
            add_action($hook['hook'], array($hook['component'], $hook['callback']), $hook['priority'], $hook['accepted_args']);
        }
    }
}
`;
};

/**
 * Generate the i18n class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The i18n class file content
 */
const generateI18nClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  return `<?php

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/includes
 */
class ${className}_i18n {

    /**
     * Load the plugin text domain for translation.
     *
     * @since    1.0.0
     */
    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            '${slug}',
            false,
            dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
        );
    }
}
`;
};

/**
 * Generate the activator class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The activator class file content
 */
const generateActivatorClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  let databaseCode = '';
  
  // Add database table creation if enabled
  if (pluginData.features.database && pluginData.database.tables.length > 0) {
    databaseCode = `
        global $wpdb;
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        $charset_collate = $wpdb->get_charset_collate();
        
        // Create tables
`;
    
    pluginData.database.tables.forEach(table => {
      databaseCode += `
        $table_name = $wpdb->prefix . '${table.name}';
        $sql = "CREATE TABLE $table_name (`;
      
      // Add columns
      const columns = [];
      table.columns.forEach(column => {
        let columnDef = `${column.name} ${column.type.toUpperCase()}`;
        
        // Add length if specified
        if (column.length && ['varchar', 'int', 'decimal'].includes(column.type.toLowerCase())) {
          columnDef += `(${column.length})`;
        }
        
        // Add NULL/NOT NULL
        columnDef += column.nullable ? ' NULL' : ' NOT NULL';
        
        // Add DEFAULT if specified
        if (column.default) {
          columnDef += ` DEFAULT '${column.default}'`;
        }
        
        // Add AUTO_INCREMENT if specified
        if (column.autoIncrement) {
          columnDef += ' AUTO_INCREMENT';
        }
        
        columns.push(columnDef);
      });
      
      // Add primary key
      const primaryKey = table.columns.find(column => column.primary);
      if (primaryKey) {
        columns.push(`PRIMARY KEY  (${primaryKey.name})`);
      }
      
      // Add unique keys
      table.columns.forEach(column => {
        if (column.unique && !column.primary) {
          columns.push(`UNIQUE KEY ${column.name}_unique (${column.name})`);
        }
      });
      
      // Add indexes
      table.columns.forEach(column => {
        if (column.index && !column.primary && !column.unique) {
          columns.push(`KEY ${column.name}_index (${column.name})`);
        }
      });
      
      databaseCode += columns.join(', ');
      databaseCode += `) $charset_collate;";
        dbDelta($sql);
`;
    });
  }
  
  return `<?php

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/includes
 */
class ${className}_Activator {

    /**
     * Short Description. (use period)
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function activate() {${databaseCode}
        // Add activation code here
        flush_rewrite_rules();
    }
}
`;
};

/**
 * Generate the deactivator class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The deactivator class file content
 */
const generateDeactivatorClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  return `<?php

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/includes
 */
class ${className}_Deactivator {

    /**
     * Short Description. (use period)
     *
     * Long Description.
     *
     * @since    1.0.0
     */
    public static function deactivate() {
        // Add deactivation code here
        flush_rewrite_rules();
    }
}
`;
};

/**
 * Generate the admin class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The admin class file content
 */
const generateAdminClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  let adminMenuCode = '';
  let settingsCode = '';
  let customPostTypesCode = '';
  
  // Add admin menu if enabled
  if (pluginData.features.adminPage) {
    adminMenuCode = `
    /**
     * Register the administration menu for this plugin.
     *
     * @since    1.0.0
     */
    public function add_plugin_admin_menu() {
        add_menu_page(
            '${pluginData.basic.name}',
            '${pluginData.basic.name}',
            'manage_options',
            $this->plugin_name,
            array($this, 'display_plugin_admin_page'),
            'dashicons-admin-generic',
            20
        );
    }

    /**
     * Render the admin page for this plugin.
     *
     * @since    1.0.0
     */
    public function display_plugin_admin_page() {
        include_once('partials/' . $this->plugin_name . '-admin-display.php');
    }`;
  }
  
  // Add settings if enabled
  if (pluginData.features.settings) {
    settingsCode = `
    /**
     * Register the settings for this plugin.
     *
     * @since    1.0.0
     */
    public function register_settings() {`;
    
    if (pluginData.settings && pluginData.settings.settingsGroups && pluginData.settings.settingsGroups.length > 0) {
      pluginData.settings.settingsGroups.forEach(group => {
        settingsCode += `
        // Register setting group: ${group.name}
        register_setting(
            '${slug}_${group.id}_settings',
            '${slug}_${group.id}_settings'
        );
        
        add_settings_section(
            '${slug}_${group.id}_section',
            '${group.name}',
            array($this, '${group.id}_section_callback'),
            '${slug}_${group.id}_settings'
        );
        `;
        
        if (group.fields && group.fields.length > 0) {
          group.fields.forEach(field => {
            settingsCode += `
        add_settings_field(
            '${field.id}',
            '${field.label}',
            array($this, '${field.id}_field_callback'),
            '${slug}_${group.id}_settings',
            '${slug}_${group.id}_section'
        );`;
          });
        }
        
        // Add section callback
        settingsCode += `
        
    /**
     * Render the ${group.name} section.
     *
     * @since    1.0.0
     */
    public function ${group.id}_section_callback() {
        echo '<p>${group.description}</p>';
    }`;
        
        // Add field callbacks
        if (group.fields && group.fields.length > 0) {
          group.fields.forEach(field => {
            settingsCode += `
    
    /**
     * Render the ${field.label} field.
     *
     * @since    1.0.0
     */
    public function ${field.id}_field_callback() {
        $options = get_option('${slug}_${group.id}_settings');
        $value = isset($options['${field.id}']) ? $options['${field.id}'] : '';
        `;
            
            switch (field.type) {
              case 'text':
                settingsCode += `echo '<input type="text" id="${field.id}" name="${slug}_${group.id}_settings[${field.id}]" value="' . esc_attr($value) . '" class="regular-text" />';`;
                break;
              case 'textarea':
                settingsCode += `echo '<textarea id="${field.id}" name="${slug}_${group.id}_settings[${field.id}]" rows="5" cols="50">' . esc_textarea($value) . '</textarea>';`;
                break;
              case 'checkbox':
                settingsCode += `echo '<input type="checkbox" id="${field.id}" name="${slug}_${group.id}_settings[${field.id}]" value="1" ' . checked(1, $value, false) . ' />';`;
                break;
              case 'select':
                settingsCode += `
        echo '<select id="${field.id}" name="${slug}_${group.id}_settings[${field.id}]">';
        $options = array(
            ${field.options ? field.options.map(opt => `'${opt.value}' => '${opt.label}'`).join(',\n            ') : ''}
        );
        foreach ($options as $key => $option) {
            echo '<option value="' . esc_attr($key) . '" ' . selected($value, $key, false) . '>' . esc_html($option) . '</option>';
        }
        echo '</select>';`;
                break;
              default:
                settingsCode += `echo '<input type="text" id="${field.id}" name="${slug}_${group.id}_settings[${field.id}]" value="' . esc_attr($value) . '" class="regular-text" />';`;
            }
            
            if (field.description) {
              settingsCode += `
        echo '<p class="description">${field.description}</p>';`;
            }
            
            settingsCode += `
    }`;
          });
        }
      });
    } else {
      settingsCode += `
        // Register default settings
        register_setting(
            '${slug}_settings',
            '${slug}_settings'
        );
        
        add_settings_section(
            '${slug}_general_section',
            'General Settings',
            array($this, 'general_section_callback'),
            '${slug}_settings'
        );
        
        add_settings_field(
            'enabled',
            'Enable Plugin',
            array($this, 'enabled_field_callback'),
            '${slug}_settings',
            '${slug}_general_section'
        );
        
    /**
     * Render the General Settings section.
     *
     * @since    1.0.0
     */
    public function general_section_callback() {
        echo '<p>Configure the general settings for this plugin.</p>';
    }
    
    /**
     * Render the Enable Plugin field.
     *
     * @since    1.0.0
     */
    public function enabled_field_callback() {
        $options = get_option('${slug}_settings');
        $value = isset($options['enabled']) ? $options['enabled'] : '';
        echo '<input type="checkbox" id="enabled" name="${slug}_settings[enabled]" value="1" ' . checked(1, $value, false) . ' />';
        echo '<p class="description">Enable or disable the plugin functionality.</p>';
    }`;
    }
    
    settingsCode += `
    }`;
  }
  
  // Add custom post types if enabled
  if (pluginData.features.customPostTypes) {
    customPostTypesCode = `
    /**
     * Register custom post types.
     *
     * @since    1.0.0
     */
    public function register_custom_post_types() {`;
    
    if (pluginData.customPostTypes && pluginData.customPostTypes.types && pluginData.customPostTypes.types.length > 0) {
      pluginData.customPostTypes.types.forEach(type => {
        customPostTypesCode += `
        // Register ${type.name} post type
        $labels = array(
            'name'                  => _x('${type.plural}', 'Post type general name', '${slug}'),
            'singular_name'         => _x('${type.singular}', 'Post type singular name', '${slug}'),
            'menu_name'             => _x('${type.plural}', 'Admin Menu text', '${slug}'),
            'name_admin_bar'        => _x('${type.singular}', 'Add New on Toolbar', '${slug}'),
            'add_new'               => __('Add New', '${slug}'),
            'add_new_item'          => __('Add New ${type.singular}', '${slug}'),
            'new_item'              => __('New ${type.singular}', '${slug}'),
            'edit_item'             => __('Edit ${type.singular}', '${slug}'),
            'view_item'             => __('View ${type.singular}', '${slug}'),
            'all_items'             => __('All ${type.plural}', '${slug}'),
            'search_items'          => __('Search ${type.plural}', '${slug}'),
            'parent_item_colon'     => __('Parent ${type.plural}:', '${slug}'),
            'not_found'             => __('No ${type.plural.toLowerCase()} found.', '${slug}'),
            'not_found_in_trash'    => __('No ${type.plural.toLowerCase()} found in Trash.', '${slug}'),
            'featured_image'        => _x('${type.singular} Cover Image', 'Overrides the "Featured Image" phrase', '${slug}'),
            'set_featured_image'    => _x('Set cover image', 'Overrides the "Set featured image" phrase', '${slug}'),
            'remove_featured_image' => _x('Remove cover image', 'Overrides the "Remove featured image" phrase', '${slug}'),
            'use_featured_image'    => _x('Use as cover image', 'Overrides the "Use as featured image" phrase', '${slug}'),
            'archives'              => _x('${type.singular} archives', 'The post type archive label used in nav menus', '${slug}'),
            'insert_into_item'      => _x('Insert into ${type.singular.toLowerCase()}', 'Overrides the "Insert into post" phrase', '${slug}'),
            'uploaded_to_this_item' => _x('Uploaded to this ${type.singular.toLowerCase()}', 'Overrides the "Uploaded to this post" phrase', '${slug}'),
            'filter_items_list'     => _x('Filter ${type.plural.toLowerCase()} list', 'Screen reader text for the filter links', '${slug}'),
            'items_list_navigation' => _x('${type.plural} list navigation', 'Screen reader text for the pagination', '${slug}'),
            'items_list'            => _x('${type.plural} list', 'Screen reader text for the items list', '${slug}'),
        );
        
        $args = array(
            'labels'             => $labels,
            'public'             => ${type.public ? 'true' : 'false'},
            'publicly_queryable' => ${type.publiclyQueryable ? 'true' : 'false'},
            'show_ui'            => ${type.showUi ? 'true' : 'false'},
            'show_in_menu'       => ${type.showInMenu ? 'true' : 'false'},
            'query_var'          => ${type.queryVar ? 'true' : 'false'},
            'rewrite'            => array('slug' => '${type.slug}'),
            'capability_type'    => 'post',
            'has_archive'        => ${type.hasArchive ? 'true' : 'false'},
            'hierarchical'       => ${type.hierarchical ? 'true' : 'false'},
            'menu_position'      => ${type.menuPosition || 'null'},
            'menu_icon'          => '${type.menuIcon || 'dashicons-admin-post'}',
            'supports'           => array(`;
        
        // Fix: Convert supports object to array of supported features
        const supportedFeatures = [];
        if (type.supports) {
          // Check if supports is an object with boolean values
          if (typeof type.supports === 'object' && !Array.isArray(type.supports)) {
            for (const [feature, isSupported] of Object.entries(type.supports)) {
              if (isSupported) {
                supportedFeatures.push(`'${feature}'`);
              }
            }
          } 
          // If it's already an array, use it directly
          else if (Array.isArray(type.supports)) {
            type.supports.forEach(feature => {
              supportedFeatures.push(`'${feature}'`);
            });
          }
        }
        
        // If no supports were found, add default ones
        if (supportedFeatures.length === 0) {
          supportedFeatures.push("'title'", "'editor'", "'thumbnail'");
        }
        
        customPostTypesCode += supportedFeatures.join(', ');
        customPostTypesCode += `)
        );
        
        register_post_type('${type.slug}', $args);`;
        
        // Add taxonomies if specified
        if (type.taxonomies && type.taxonomies.length > 0) {
          type.taxonomies.forEach(tax => {
            customPostTypesCode += `
        
        // Register ${tax.name} taxonomy for ${type.name}
        $tax_labels = array(
            'name'              => _x('${tax.plural}', 'taxonomy general name', '${slug}'),
            'singular_name'     => _x('${tax.singular}', 'taxonomy singular name', '${slug}'),
            'search_items'      => __('Search ${tax.plural}', '${slug}'),
            'all_items'         => __('All ${tax.plural}', '${slug}'),
            'parent_item'       => __('Parent ${tax.singular}', '${slug}'),
            'parent_item_colon' => __('Parent ${tax.singular}:', '${slug}'),
            'edit_item'         => __('Edit ${tax.singular}', '${slug}'),
            'update_item'       => __('Update ${tax.singular}', '${slug}'),
            'add_new_item'      => __('Add New ${tax.singular}', '${slug}'),
            'new_item_name'     => __('New ${tax.singular} Name', '${slug}'),
            'menu_name'         => __('${tax.plural}', '${slug}'),
        );
        
        $tax_args = array(
            'hierarchical'      => ${tax.hierarchical ? 'true' : 'false'},
            'labels'            => $tax_labels,
            'show_ui'           => true,
            'show_admin_column' => true,
            'query_var'         => true,
            'rewrite'           => array('slug' => '${tax.slug}'),
        );
        
        register_taxonomy('${tax.slug}', array('${type.slug}'), $tax_args);`;
          });
        }
      });
    }
    
    customPostTypesCode += `
    }`;
  }
  
  return `<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/admin
 */
class ${className}_Admin {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_admin_styles() {
        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/plugin-name-admin.css', array(), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_admin_scripts() {
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/plugin-name-admin.js', array('jquery'), $this->version, false);
    }
${adminMenuCode}
${settingsCode}
${customPostTypesCode}
}
`;
};

/**
 * Generate the public class file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The public class file content
 */
const generatePublicClassFile = (pluginData) => {
  const { slug } = pluginData.basic;
  const className = slug.replace(/-/g, '_').replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/\s+/g, '_');
  
  let shortcodesCode = '';
  let restApiCode = '';
  
  // Add shortcodes if enabled
  if (pluginData.features.shortcodes) {
    shortcodesCode = `
    /**
     * Register shortcodes.
     *
     * @since    1.0.0
     */
    public function register_shortcodes() {`;
    
    if (pluginData.shortcodes && pluginData.shortcodes.codes && pluginData.shortcodes.codes.length > 0) {
      pluginData.shortcodes.codes.forEach(shortcode => {
        shortcodesCode += `
        add_shortcode('${shortcode.tag}', array($this, '${shortcode.tag}_shortcode_callback'));`;
      });
      
      // Add shortcode callbacks
      pluginData.shortcodes.codes.forEach(shortcode => {
        shortcodesCode += `
        
    /**
     * Callback for the [${shortcode.tag}] shortcode.
     *
     * @since    1.0.0
     * @param    array    $atts    Shortcode attributes.
     * @param    string   $content Shortcode content.
     * @return   string   Shortcode output.
     */
    public function ${shortcode.tag}_shortcode_callback($atts, $content = null) {
        // Extract shortcode attributes
        $atts = shortcode_atts(array(
            ${shortcode.attributes ? shortcode.attributes.map(attr => `'${attr.name}' => '${attr.default || ''}'`).join(',\n            ') : ''}
        ), $atts, '${shortcode.tag}');
        
        // Start output buffering
        ob_start();
        
        // Include the shortcode template
        include plugin_dir_path(__FILE__) . 'partials/shortcodes/${shortcode.tag}.php';
        
        // Return the buffered content
        return ob_get_clean();
    }`;
      });
    } else {
      shortcodesCode += `
        // Example shortcode
        add_shortcode('${slug}', array($this, '${slug}_shortcode_callback'));
        
    /**
     * Callback for the [${slug}] shortcode.
     *
     * @since    1.0.0
     * @param    array    $atts    Shortcode attributes.
     * @param    string   $content Shortcode content.
     * @return   string   Shortcode output.
     */
    public function ${slug}_shortcode_callback($atts, $content = null) {
        // Extract shortcode attributes
        $atts = shortcode_atts(array(
            'title' => 'Default Title',
        ), $atts, '${slug}');
        
        // Start output buffering
        ob_start();
        
        // Include the shortcode template
        include plugin_dir_path(__FILE__) . 'partials/shortcodes/${slug}.php';
        
        // Return the buffered content
        return ob_get_clean();
    }`;
    }
    
    shortcodesCode += `
    }`;
  }
  
  // Add REST API if enabled
  if (pluginData.features.restApi) {
    restApiCode = `
    /**
     * Register REST API routes.
     *
     * @since    1.0.0
     */
    public function register_rest_routes() {`;
    
    if (pluginData.restApi && pluginData.restApi.endpoints && pluginData.restApi.endpoints.length > 0) {
      pluginData.restApi.endpoints.forEach(endpoint => {
        restApiCode += `
        register_rest_route('${slug}/v1', '/${endpoint.route}', array(
            'methods' => '${endpoint.method}',
            'callback' => array($this, '${endpoint.route.replace(/\//g, '_')}_${endpoint.method.toLowerCase()}_callback'),
            'permission_callback' => array($this, '${endpoint.route.replace(/\//g, '_')}_permission_callback'),
        ));`;
      });
      
      // Add endpoint callbacks
      pluginData.restApi.endpoints.forEach(endpoint => {
        restApiCode += `
        
    /**
     * Callback for the /${endpoint.route} ${endpoint.method} endpoint.
     *
     * @since    1.0.0
     * @param    WP_REST_Request $request The request object.
     * @return   WP_REST_Response The response.
     */
    public function ${endpoint.route.replace(/\//g, '_')}_${endpoint.method.toLowerCase()}_callback($request) {
        // Get parameters
        $params = $request->get_params();
        
        // Process the request
        // TODO: Implement endpoint logic
        
        // Return response
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Endpoint executed successfully',
            'data' => $params
        ));
    }
    
    /**
     * Permission callback for the /${endpoint.route} endpoint.
     *
     * @since    1.0.0
     * @param    WP_REST_Request $request The request object.
     * @return   bool Whether the user has permission.
     */
    public function ${endpoint.route.replace(/\//g, '_')}_permission_callback($request) {
        // Check permissions
        // TODO: Implement permission logic
        
        return true; // Allow access to everyone by default
    }`;
      });
    } else {
      restApiCode += `
        // Example endpoint
        register_rest_route('${slug}/v1', '/example', array(
            'methods' => 'GET',
            'callback' => array($this, 'example_get_callback'),
            'permission_callback' => array($this, 'example_permission_callback'),
        ));
        
    /**
     * Callback for the /example GET endpoint.
     *
     * @since    1.0.0
     * @param    WP_REST_Request $request The request object.
     * @return   WP_REST_Response The response.
     */
    public function example_get_callback($request) {
        // Get parameters
        $params = $request->get_params();
        
        // Process the request
        // TODO: Implement endpoint logic
        
        // Return response
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Example endpoint executed successfully',
            'data' => $params
        ));
    }
    
    /**
     * Permission callback for the /example endpoint.
     *
     * @since    1.0.0
     * @param    WP_REST_Request $request The request object.
     * @return   bool Whether the user has permission.
     */
    public function example_permission_callback($request) {
        // Check permissions
        // TODO: Implement permission logic
        
        return true; // Allow access to everyone by default
    }`;
    }
    
    restApiCode += `
    }`;
  }
  
  return `<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @since      1.0.0
 * @package    ${className}
 * @subpackage ${className}/public
 */
class ${className}_Public {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {
        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/plugin-name-public.css', array(), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/plugin-name-public.js', array('jquery'), $this->version, false);
    }
${shortcodesCode}
${restApiCode}
}
`;
};

/**
 * Generate the admin display template
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The admin display template content
 */
const generateAdminDisplayTemplate = (pluginData) => {
  const { name } = pluginData.basic;
  
  return `<?php
/**
 * Admin area display template.
 *
 * @link       ${pluginData.basic.authorUri || ''}
 * @since      1.0.0
 *
 * @package    ${name}
 * @subpackage ${name}/admin/partials
 */
?>

<div class="wrap">
    <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
    
    <div class="card">
        <h2>Welcome to ${name}</h2>
        <p>This is the admin page for your plugin. Customize this template to add your admin interface.</p>
    </div>
    
    <?php if (current_user_can('manage_options')) : ?>
    <div class="card">
        <h2>Settings</h2>
        <form method="post" action="options.php">
            <?php
            // Output settings fields
            settings_fields('${pluginData.basic.slug}_settings');
            do_settings_sections('${pluginData.basic.slug}_settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php endif; ?>
</div>
`;
};

/**
 * Generate the shortcode template
 * @param {Object} shortcode - The shortcode configuration
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The shortcode template content
 */
const generateShortcodeTemplate = (shortcode, pluginData) => {
  return `<?php
/**
 * Shortcode template for [${shortcode.tag}].
 *
 * @link       ${pluginData.basic.authorUri || ''}
 * @since      1.0.0
 *
 * @package    ${pluginData.basic.name}
 * @subpackage ${pluginData.basic.name}/public/partials/shortcodes
 */

// This file should be included by the shortcode callback function.
// Variables available:
// $atts - The shortcode attributes
// $content - The shortcode content (if any)
?>

<div class="${pluginData.basic.slug}-shortcode ${shortcode.tag}-shortcode">
    <?php if (!empty($atts['title'])) : ?>
    <h3 class="${pluginData.basic.slug}-shortcode-title"><?php echo esc_html($atts['title']); ?></h3>
    <?php endif; ?>
    
    <div class="${pluginData.basic.slug}-shortcode-content">
        <?php if ($content) : ?>
            <?php echo wp_kses_post($content); ?>
        <?php else : ?>
            <p>This is the default content for the [${shortcode.tag}] shortcode.</p>
        <?php endif; ?>
    </div>
</div>
`;
};

/**
 * Generate the readme.txt file
 * @param {Object} pluginData - The plugin configuration data
 * @returns {String} - The readme.txt content
 */
const generateReadmeTxt = (pluginData) => {
  const { name, slug, description, author, version, requiresWp, requiresPhp } = pluginData.basic;
  
  return `=== ${name} ===
Contributors: ${author.toLowerCase().replace(/\s+/g, '')}
Tags: wordpress, plugin
Requires at least: ${requiresWp}
Tested up to: 6.0
Stable tag: ${version}
Requires PHP: ${requiresPhp}
License: ${pluginData.basic.license}

${description}

== Description ==

${description}

== Installation ==

1. Upload the plugin files to the \`/wp-content/plugins/${slug}\` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Use the Settings screen to configure the plugin

== Frequently Asked Questions ==

= How do I use this plugin? =

After installation, go to the plugin settings page to configure it according to your needs.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif).

== Changelog ==

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.0.0 =
Initial release
`;
};

/**
 * Generate the plugin files
 * @param {Object} pluginData - The plugin configuration data
 * @returns {Object} - An object containing the generated files
 */
export const generatePluginFiles = (pluginData) => {
  const { slug } = pluginData.basic;
  const files = {};
  
  // Main plugin file
  files[`${slug}.php`] = generateMainPluginFile(pluginData);
  
  // Includes directory
  files[`includes/class-${slug}.php`] = generatePluginClassFile(pluginData);
  files[`includes/class-${slug}-loader.php`] = generateLoaderClassFile(pluginData);
  files[`includes/class-${slug}-i18n.php`] = generateI18nClassFile(pluginData);
  files[`includes/class-${slug}-activator.php`] = generateActivatorClassFile(pluginData);
  files[`includes/class-${slug}-deactivator.php`] = generateDeactivatorClassFile(pluginData);
  
  // Admin directory
  files[`admin/class-${slug}-admin.php`] = generateAdminClassFile(pluginData);
  files[`admin/css/${slug}-admin.css`] = `/**
 * All of the CSS for your admin-specific functionality should be
 * included in this file.
 */`;
  files[`admin/js/${slug}-admin.js`] = `/**
 * All of the JavaScript for your admin-specific functionality should be
 * included in this file.
 */`;
  files[`admin/partials/${slug}-admin-display.php`] = generateAdminDisplayTemplate(pluginData);
  
  // Public directory
  files[`public/class-${slug}-public.php`] = generatePublicClassFile(pluginData);
  files[`public/css/${slug}-public.css`] = `/**
 * All of the CSS for your public-facing functionality should be
 * included in this file.
 */`;
  files[`public/js/${slug}-public.js`] = `/**
 * All of the JavaScript for your public-facing functionality should be
 * included in this file.
 */`;
  files[`public/partials/${slug}-public-display.php`] = `<?php
/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       ${pluginData.basic.authorUri || ''}
 * @since      1.0.0
 *
 * @package    ${pluginData.basic.name}
 * @subpackage ${pluginData.basic.name}/public/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
`;
  
  // Shortcode templates
  if (pluginData.features.shortcodes) {
    if (pluginData.shortcodes && pluginData.shortcodes.codes && pluginData.shortcodes.codes.length > 0) {
      pluginData.shortcodes.codes.forEach(shortcode => {
        files[`public/partials/shortcodes/${shortcode.tag}.php`] = generateShortcodeTemplate(shortcode, pluginData);
      });
    } else {
      files[`public/partials/shortcodes/${slug}.php`] = generateShortcodeTemplate({ tag: slug }, pluginData);
    }
  }
  
  // Languages directory
  files[`languages/${slug}.pot`] = `# Copyright (C) 2023 ${pluginData.basic.author}
# This file is distributed under the same license as the ${pluginData.basic.name} plugin.
msgid ""
msgstr ""
"Project-Id-Version: ${pluginData.basic.name} ${pluginData.basic.version}\\n"
"Report-Msgid-Bugs-To: https://wordpress.org/support/plugin/${slug}\\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\\n"
"Language-Team: LANGUAGE <LL@li.org>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"POT-Creation-Date: 2023-01-01T12:00:00+00:00\\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\\n"
"X-Generator: WP-CLI 2.7.1\\n"
"X-Domain: ${slug}\\n"

#. Plugin Name of the plugin
msgid "${pluginData.basic.name}"
msgstr ""

#. Description of the plugin
msgid "${pluginData.basic.description}"
msgstr ""

#. Author of the plugin
msgid "${pluginData.basic.author}"
msgstr ""
`;
  
  // README.txt
  files[`readme.txt`] = generateReadmeTxt(pluginData);
  
  // index.php files for security
  files[`index.php`] = `<?php // Silence is golden`;
  files[`admin/index.php`] = `<?php // Silence is golden`;
  files[`admin/css/index.php`] = `<?php // Silence is golden`;
  files[`admin/js/index.php`] = `<?php // Silence is golden`;
  files[`admin/partials/index.php`] = `<?php // Silence is golden`;
  files[`includes/index.php`] = `<?php // Silence is golden`;
  files[`languages/index.php`] = `<?php // Silence is golden`;
  files[`public/index.php`] = `<?php // Silence is golden`;
  files[`public/css/index.php`] = `<?php // Silence is golden`;
  files[`public/js/index.php`] = `<?php // Silence is golden`;
  files[`public/partials/index.php`] = `<?php // Silence is golden`;
  
  if (pluginData.features.shortcodes) {
    files[`public/partials/shortcodes/index.php`] = `<?php // Silence is golden`;
  }
  
  return files;
};
