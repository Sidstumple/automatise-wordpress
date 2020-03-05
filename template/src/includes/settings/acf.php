<?php
namespace Matise\Settings;

class Matise_ACF {
	/**
	 * Constructor to init acf
	 */
	public function __construct() {
		//filter for acf update and format values
		add_action('acf/init', array($this, 'register_block_types'));
		add_filter('allowed_block_types', array($this, 'allowed_blocks_types'), 10, 2 );
	}

	/**
	 * Register block types
	 */
	public function register_block_types() {
		// check function exists
		if( function_exists('acf_register_block_type') ) {
			// Homepage header
			// acf_register_block_type(
			// 	array(
			// 		'name'								=> 'homepage-header',
			// 		'title'								=> __('Homepage header'),
			// 		'description'					=> __('Homepage header with only one image'),
			// 		'render_callback'			=> array($this, 'render_callback'),
			// 		'category'						=> 'header', // Category defines where the block is set in the gutenberg editor block picker.
			// 		// 'icon'								=> svg('header'), // You can use dashicons or custom svg element
			// 		'align'								=> 'full',
			// 		'enqueue_style' 			=> get_template_directory_uri() . '/assets/homepage-header.css',
			// 		'enqueue_scripts' 		=> get_template_directory_uri() . '/assets/homepage-header.js',
			// 		'keywords'						=> array( 'header', 'regular'),
			// 		'supports' 						=> array(
			// 			'align' 						=> array('full') // customize alignment toolbar, here only 'full' is available
			// 		)
			// 	)
			// );
		}
	}

	/**
	 * Callback function of acf_register_block
	 * Refers to sections folder
	 */
	public function render_callback($block) {
		$slug = str_replace('acf/', '', $block['name']);
		// include a template part from within the "acf-blocks" folder
		if (file_exists(get_theme_file_path("/includes/components/acf-blocks/{$slug}.php"))) {
			include(get_theme_file_path("/includes/components/acf-blocks/{$slug}.php") );
		}
	}

	/**
	 * Filter blocks on pages
	 */
	public function allowed_blocks_types($allowed_blocks, $post) {
		$homepage_id = get_option('page_on_front');
		$allowed = array(
			// 'acf/homepage-header'
		);
		return $allowed;
	}
}
new Matise_ACF();