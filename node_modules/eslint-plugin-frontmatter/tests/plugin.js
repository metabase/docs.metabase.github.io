var CLIEngine = require('eslint').CLIEngine;
var plugin = require('../');
var fs = require('fs');
var path = require('path');
require('chai');
require('should');

// global reference for cli engine configured below
var cli;

function getFixturePath(relativePath) {
  return path.normalize(path.join(__dirname, relativePath));
}

function trim(str) {
  if (!str) return str;

  return str.replace(/^\s+|\s+$/, '');
}

describe('Frontmatter processor', function() {

  // Specify a sample input file
  var sample = fs.readFileSync(getFixturePath('./fixtures/basic.js'), 'utf8');

  before(function() {
    cli = new CLIEngine({
      envs: ['browser'],
      extensions: ['js'],
      ignore: false,
      rules: {
        'no-console': 2,
        'no-undef': 2,
        'quotes': 2,
        'spaced-comment': 2
      },
      useEslintrc: false
    });
    cli.addPlugin('frontmatter', plugin);
  });

  describe('preprocess', function() {
    it('should remove frontmatter', function() {
      var processed = plugin['processors']['.js']['preprocess'](sample)
      var tripleDashes = processed[0].split('---').length;
      tripleDashes.should.equal(2);
    });

    it('should not raise a linting error', function() {
      var report = cli.executeOnText(sample, 'sample.js');
      var errors = report.results[0].messages;
      errors.length.should.equal(0);
    });

    it('should remove frontmatter even if --- in frontmatter', function() {
      var fixturePath = getFixturePath('./fixtures/withDashesInFrontMatter.js');
      var withDashes = fs.readFileSync(fixturePath, 'utf8');
      var processed = plugin.processors['.js'].preprocess(withDashes);
      trim(processed[0]).should.equal('var x;');
    });

    it('should not change JS even if --- present in code', function() {
      var fixturePath = getFixturePath('./fixtures/dashesInCode.js');
      var dashesInCode = fs.readFileSync(fixturePath, 'utf8');
      var processed = plugin.processors['.js'].preprocess(dashesInCode);
      trim(processed[0]).should.equal('x --- y;');
    });
  });

  describe('postprocess', function() {
    it('should report accurate line numbers in lint messages', function() {
      var report = cli.executeOnFiles([
        getFixturePath('./fixtures/withLintErrors.js')
      ]);
      var messages = report.results[0].messages;
      messages.length.should.equal(1);
      messages[0].ruleId.should.equal('no-console');
      messages[0].line.should.equal(5);
      messages[0].endLine.should.equal(5);
    });

    it('should report accurately even if no frontmatter', function() {
      var report = cli.executeOnFiles([
        getFixturePath('./fixtures/withLintErrorsNoFrontmatter.js')
      ]);
      var messages = report.results[0].messages;
      messages.length.should.equal(1);
      messages[0].ruleId.should.equal('no-console');
      messages[0].line.should.equal(1);
      messages[0].endLine.should.equal(1);
    });
  });
});
