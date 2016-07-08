module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		
		/**
		 * Copy files from one directory to another.
		 */
		copy: {
		  to_drupal: {
		    files: [
		      {
			      expand: true,
			      src: 'styles.css',
			      dest: '../www-drupal/themes/wwwevergreen/css/build/',
			      /*rename: function(dest){
				      return dest + 'screen.css';
			      },*/
			      filter: 'isFile',  // Make sure it's a file, not a directory or something else (I think)
		      },
		      {
			      expand: true,
			      cwd: 'custom-css/build/',
			      src: 'ckeditor.css',
			      dest: '../www-drupal/themes/wwwevergreen/css/build/',
			      filter: 'isFile',
		      },
		      
		      /*// includes files within path
		      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
		
		      // includes files within path and its sub-directories
		      {expand: true, src: ['path/**'], dest: 'dest/'},
		
		      // makes all src relative to cwd
		      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
		
		      // flattens results to a single level
		      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},*/
		    ],
		  },
		},
		
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
		 * Perfbudget
		 *
		 * Performance budgeting thanks to the magic of WebPageTest
		 * See: https://github.com/tkadlec/grunt-perfbudget
		 *
		 * grunt-perfbudget is a Grunt.js task for enforcing a performance budget
		 * (more on performance budgets:
		 * http://timkadlec.com/2013/01/setting-a-performance-budget/). It uses
		 * the wonderful webpagetest.org and the WebPagetest API Wrapper for
		 * NodeJS created by Marcel Duran.
		 *
		 * grunt-perfbudget uses either a public or private instance of
		 * WebPagetest to perform tests on a specified URL. It compares test
		 * results to budgets you specify. If the budget is met, the tasks
		 * successfully completes. If it the page exceeds your performance
		 * budgets, the task fails and informs you why.
		 */
		perfbudget: {
			default: {
				options: {
					url: 'http://evergreen.edu',
					key: 'A.71de0f32f82a2c13f3ed1f862acb6548',
					location: 'ec2-us-west-2:Firefox',  // Oregon - EC2
					budget: {
						visualComplete: '4000',
						SpeedIndex: '1500',
					}
				}
			}
		},
		
		/**
		 * CSS post-processors
		 *
		 * autoprefixer adds support for older browsers by adding vendor
		 * prefixes to Sass properties, based on data from caniuse.com.
		 */
		postcss: {
	    options: {
		    processors: [
					require('autoprefixer')(  // add vendor prefixes
						{
							browsers: [
								'> 0.2% in US',
							]
						}
					),
					
					/**
					 * postcss-reporter
					 *
					 * Prints out warning and error messages from other PostCSS plugins.
					 *
					 * This plugin should go last to report warnings from all previous
					 * plugins.
					 */ 
					require('postcss-reporter')(
						{
							clearMessages: true,
						}
					),
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
			r25_styles: {
				src: 'r25/r25.css',
				dest: 'r25/build/r25.css'
			}
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
				tasks: ['sass', 'postcss', 'copy:to_drupal']
			},
			js: {  // Uglify JavaScript.
				files: ['scripts.js'],
				tasks: ['jshint', 'uglify']
			},
		},
    
	});

	// Load the plugins (alphabetical order).
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-perfbudget');
	grunt.loadNpmTasks('grunt-svgstore');
	/*grunt.loadNpmTasks('grunt-svg-sprite');*/
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s) (in the order you want to run them).
	grunt.registerTask('default', ['sass', 'postcss', 'newer:uglify', 'copy']);

};