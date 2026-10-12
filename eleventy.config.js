module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/content/css");
	return {
        dir: {
            output: 'public',
            input: 'src/content',
            includes: '../_includes',
            data: '../../data'
        },
        markdownTemplateEngine: "njk"
    };
};