module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		imagemin: {                          // Task
			dynamic: {                         // Another target
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'images/src/',            // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'images/build/'          // Destination path prefix
				}]
			}
	  },
		
		/**
		 * Give hints on fixing bugs in JavaScript.
		 */
		jshint: {
			Gruntfile: ['Gruntfile.js'],
			scripts: ['scripts.js']
		},
		
		/**
		 * CSS post-processors
		 *
		 * autoprefixer-core adds support for older browsers by adding vendor
		 * prefixes to Sass properties, based on data from caniuse.com.
		 */
		postcss: {
	    options: {
		    processors: [
					require('autoprefixer')(  // add vendor prefixes
						{
							browsers: [
								'last 3 Chrome versions',
								'last 3 Safari versions',
								'last 3 Firefox versions',
								'last 3 iOS versions',
								'last 3 Explorer versions',
								'last 3 ChromeAndroid versions',
								'last 6 Edge versions',  // we can cut this back when we know better how users are updating
							]
						}
					),
					//require('cssnano')() // minify the result
				]
			},
			default_styles: {
				src: 'styles.css',
				dest: 'styles.css'
			},
			print_styles: {
				src: 'print.css',
				dest: 'print.css'
			},
			custom_css: {  // process a whole folder
				expand: true,
				flatten: true,
				src: 'custom-css/build/*.css', // -> src/css/file1.css, src/css/file2.css
				dest: 'custom-css/build/' // -> dest/css/file1.css, dest/css/file2.css
			},
			dev_styles: {
				src: 'styles-dev.css',
				dest: 'styles-dev.css'
			},
		},

		/**
		 * Process Sass into CSS.
		 */
		sass: {
			build: {  // process specific files
				options: {
					style: 'compressed', 
					sourcemap: 'none'
				},
				files: [
					{'styles.css': 'styles.scss'},  // 'destination': 'source'
					{'print.css': 'print.scss'},
					{                               // process this whole folder
						expand: true,
						cwd: 'custom-css/src',  // source folder
						src: ['*.scss'],
						dest: 'custom-css/build',  // destination folder
						ext: '.css'
					},
					{'../wwwevergreen-drupal-theme/css/build/screen.css': 'styles.scss'}
				]
			},
			dev: {  // process specific files
				options: {
					lineNumbers: true,
					style: 'expanded',
					sourcemap: 'none'
				},
				files: [
					{'styles-dev.css': 'styles.scss'},  // 'destination': 'source'
					/*{'print.css': 'print.scss'},
					{                               // process this whole folder
						expand: true,
						cwd: 'custom-css/',
						src: ['*.scss'],
						dest: 'custom-css/',
						ext: '.css'
					}*/
				]
			},
		},
		
		/**
		 * Create spritesheets out of SVG files in a folder.
		 */
		svgstore: {
			options: {
				prefix : 'icon-', // This will prefix each ID
				svg: { // will add and overide the the default xmlns="http://www.w3.org/2000/svg" attribute to the resulting SVG
					//viewBox : '0 0 100 100',
					//xmlns: 'http://www.w3.org/2000/svg'
				},
				inheritviewbox: true,
			},
			transporter: {
				/*files: {
					'' : [''],  // dest : src
				}*/
				src: ['images/src/icons/transporter/*.svg'],
				dest: 'images/build/transporter.svg',
			},
		},
		/*svgsprite: {
			options: {
				//cleanwith: 'svgo',	//SVG optimizer
			},
			transporter: {
				src: ['images/src/icons'],
				dest: 'images/build/icons',
				options: {
					sprite: 'transporter',  //filename
				}
			},
	  },*/
    
    /**
     * Compress JS by removing whitespace. Different from
     * minification in that it doesn't replace variable and
     * function names, which is easier to debug.
     */
		uglify: {
			//options: {
				//banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			//},
			scripts: {
				src: 'scripts.js',
				dest: 'js/build/scripts.min.js'
			}
		},

		/**
		 * Watch directories and execute Grunt tasks when they change.
		 */
		watch: {
			gruntfile: {  // Validate Gruntfile.
				files: 'Gruntfile.js',
				tasks: ['jshint'],
			},
			css: {  // Autoprefix, then process Sass into CSS.
				files: ['styles.scss', 'print.scss', 'sass/**/*.scss', 'custom-css/src/*.scss'],
				tasks: ['sass', 'postcss']
			},
			js: {  // Uglify JavaScript.
				files: ['scripts.js'],
				tasks: ['uglify']
			},
		},
    
	});

	// Load the plugins (alphabetical order).
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-svgstore');
	/*grunt.loadNpmTasks('grunt-svg-sprite');*/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s) (in the order you want to run them).
	grunt.registerTask('default', ['sass', 'postcss', 'newer:uglify']);

};