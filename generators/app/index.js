const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: "your project name",
                default: this.appname
            }
        ]).then(answers => {
            this.answers = answers;
        })
    }
    writing() {
        // 把每一个文件都通过模板转换到目标路径
        const templates = [
            // 这里面其实就是templates下每一个文件的相对路径
            "babel.config.js",
            "package.json",
            "README.md",
            "public/favicon.ico",
            "public/index.html",
            "src/App.vue",
            "src/main.js",
            "src/assets/logo.png",
            "src/components/HelloWorld.vue",
        ]

        templates.forEach(item => {
            // 遍历每一个模板的路径, 通过模板方式写入文件到目标目录
            // 转义原生模板标记的方式就是在<%<此处新增一个%> xxx %> => <%% xxx %>
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })
    }
}