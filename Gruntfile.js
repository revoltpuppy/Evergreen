module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * Add support for older browsers by adding vendor prefixes to
		 * Sass properties, based on data from caniuse.com.
		 */
		autoprefixer: {
			options: {
				browsers: ['last 3 Chrome versions', 'last 3 Firefox versions', 'last 3 Safari versions', 'last 3 Explorer versions']
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
				src: 'custom-css/*.css', // -> src/css/file1.css, src/css/file2.css
				dest: 'custom-css/' // -> dest/css/file1.css, dest/css/file2.css
			},
		},
		
		/**
		 * Give hints on fixing bugs in JavaScript.
		 */
		jshint: {
			Gruntfile: ['Gruntfile.js'],
			scripts: ['scripts.js']
		},

		/**
		 * Process Sass into CSS.
		 */
		sass: {
			stylesheets: {  // process specific files
				options: {
					style: 'compressed'
				},
				files: [
					{'styles.css': 'styles.scss'},  // 'destination': 'source'
					{'print.css': 'print.scss'},
					{                               // process this whole folder
						expand: true,
						cwd: 'custom-css/',
						src: ['*.scss'],
						dest: 'custom-css/',
						ext: '.css'
					}
				]
			},
		},
    
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

		watch: {
			gruntfile: {  // Validate Gruntfile.
				files: 'Gruntfile.js',
				tasks: ['jshint'],
			},
			css: {  // Autoprefix, then process Sass into CSS.
				files: ['styles.scss', 'print.scss', 'sass/**/*.scss', 'custom-css/*.scss'],
				tasks: ['sass', 'autoprefixer']
			},
			js: {  // Uglify JavaScript.
				files: ['scripts.js'],
				tasks: ['uglify']
			},
		},
    
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify']);

};