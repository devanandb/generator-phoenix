'use strict';
var util = require('util');
var path = require('path');
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Hi there! let me help you ' + chalk.blue('generator-phoenix') + ' generator!'
    // ));

    var prompts = [
      {
        type: 'input',
        name: 'component',
        message: 'Please enter the "section" name you want to generate',
        default: 'section-name'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {

    this.fs.copyTpl(
      this.templatePath('section.html'),
      this.destinationPath('./client/views/sections/'+ this.props.component + '.html'),
      { component: this.props.component }

    );

    this.fs.copyTpl(
      this.templatePath('styles.less'),
      this.destinationPath('./client/less/sections/'+ this.props.component + '.less'),
      { component: this.props.component }
    );

    var lessfilepath = './client/less/sections/index.less';
    var fileSrc = fs.readFileSync(lessfilepath,'utf8');
    var indexOf = fileSrc.indexOf('');
    var lineStart = fileSrc.substring(0,indexOf).lastIndexOf('\n') + 1;
    var indent = fileSrc.substring(lineStart,indexOf);
    fileSrc = fileSrc.substring(0,indexOf) + "@import '" + this.props.component + ".less';" + "\n" + indent + fileSrc.substring(indexOf);
    fs.writeFileSync(lessfilepath,fileSrc);

    this.log('Creating required files and including references.' + chalk.magenta(' Get to work now!'));
  },

  install: function () {
    // this.installDependencies();
  }
});
