const sass = require('node-sass');

module.exports = {
	dev: {
		options: {
			implementation: sass,
			sourceMap: true,
			includePaths: ['node_modules/matise-gryd']
		},
		files: {
			'<%= config.themedist.root %>assets/css/app.css': '<%= config.themesrc.root %>assets/scss/app.scss',
			'<%= config.themedist.root %>assets/css/admin.css': '<%= config.themesrc.root %>assets/scss/admin.scss'
		},
	},
	dist: {
		options: {
			implementation: sass,
			sourceMap: false,
			omitSourceMapUrl: true,
			includePaths: ['node_modules/matise-gryd']
		},
		files: {
			'<%= config.themedist.root %>assets/css/app.css': '<%= config.themesrc.root %>assets/scss/app.scss',
			'<%= config.themedist.root %>assets/css/admin.css': '<%= config.themesrc.root %>assets/scss/admin.scss'
		},
	}
};
