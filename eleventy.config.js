const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/content/css");
    eleventyConfig.addFilter("readableDate", (dateVal, format = "LLLL dd, yyyy hh:mm a") => {
      if (!dateVal) return "";
    
        // If it's already a JS Date object, convert to Luxon
        const d = (dateVal instanceof Date) 
        ? DateTime.fromJSDate(dateVal, { zone: "utc" })
        : DateTime.fromISO(dateVal, { zone: "utc" });
        
        return d.toFormat(format);
    });

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