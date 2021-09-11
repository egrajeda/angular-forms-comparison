const fs = require("fs");
const path = require("path");
const _ = require("lodash/core");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "_base/*.js": "." });
  eleventyConfig.addPassthroughCopy({ "_base/*.css": "." });
  eleventyConfig.addPassthroughCopy({ "_assets/*": "." });

  eleventyConfig.addShortcode("src", function (filePath) {
    const header = filePath.endsWith(".html")
      ? `<!-- ${filePath} -->`
      : `// ${filePath}`;
    const escapedHeader = _.escape(header);

    const content = fs.readFileSync(
      path.resolve(__dirname, "../src/", filePath),
      { encoding: "utf-8" }
    );
    const escapedContent = _.escape(content);

    return `<pre><code>${escapedHeader}

${escapedContent}</code></pre>`;
  });
};
