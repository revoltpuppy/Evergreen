module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		autoprefixer: {
			options: {
				browsers: ['last 3 versions']
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
			/*custom_css:{  // process a whole folder
				options: {
					style: 'compressed'
				},
				files: [
					{
		        expand: true,
		        cwd: 'custom-css/',
		        src: ['*.scss'],
		        dest: 'custom-css/',
		        ext: '.css'
		      }
				]
			}*/
		},
    
		uglify: {
			//options: {
				//banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			//},
			scripts: {
				src: 'scripts.js',
				dest: 'js/build/scripts.min.js'
			}
		}
    
	});

	// Load the plugins.
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	//grunt.registerTask('default', ['sass', 'uglify']);
	grunt.registerTask('default', ['sass', 'autoprefixer', 'uglify']);

};