const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');
const mkdirp = require('mkdirp');

// Read the sourcemap file
const rawSourceMap = JSON.parse(fs.readFileSync(path.join(__dirname, 'main.js.map'), 'utf8'));

SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
    // Iterate through the sources in the sourcemap
    consumer.sources.forEach(source => {
        const sourceContent = consumer.sourceContentFor(source, true);
        const outputPath = path.join(__dirname, source);

        // Ensure that the necessary folder structure exists
        mkdirp(path.dirname(outputPath), (err) => {
            if (err) {
                console.error('Error creating directory: ', err);
                return;
            }

            fs.writeFileSync(outputPath, sourceContent, 'utf8');
            console.log(`File ${source} successfully written to ${outputPath}`);
        });
    });
});
