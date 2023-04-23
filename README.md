# TypeScript 学习记录

你可以直接在 xfoss.com 阅读本书：[ts.xfoss.com](https://ts.xfoss.com/)。xfoss.com 还有其他书籍：

- [Rust 编程语言](https://rust-lang.xfoss.com)，Rust 官方教程中文翻译

- [Java 编程语言](https://java.xfoss.com)，"Head First Java" 书中文翻译

- [60天通过CCNA考试](https://ccna60d.xfoss.com)，一本基础的网络通讯书，翻译自国外经典 CCNA 60 days




你可以在 https://github.com/gnu4cn/ts-learnings 上 fork 本项目，并提交你的修正。



ECMAScript 2015 (ES6)已经正式发布，所有浏览器均已支持，同时许多项目，如Angular, Ionic, Electron框架等，均已在往ES6迁移。故需要学习掌握这一新版的Javascript。



## 变更日志

+ 2019-3-27, 重新整理`package.json`、`tsconfig.json`与`gulpfile.js`文件，让`.gitignore`生效，令到项目大小得以缩小

---

## 在本地阅读

在本地阅读本书，需要安装 `mdbook` 程序。根据操作系统的不同，安装 `mdbook` 程序有所不同。


### 在 Linux 系统上

```console
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install mdbook
```

### 在 Windows 上

在 “Powershell（管理员）”（"Administrator: Windows Powershell"） 中，先安装 `choco`

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

经由 `choco` 安装 `msys2`

```powershell
choco install -y msys2
```

在 `msys2` 中安装 `mdbook`

```console
pacman -S mingw-w64-x86_64-mdbook
```

安装好 `mdbook` 后, 带一些命令行参数和开关运行服务器：

```console
mdbook serve ~/rust-lang-zh_CN -p 8080 -n 127.0.0.1 --open
```

> 注：当在 Windows 系统上时，咱们要在 `msys2` 的终端窗口中运行此命令。

此时，将在操作系统的默认浏览器中，打开本书。


## ES6与 Javascript

ES6仍然是Javascript, 只不过是在我们已经熟悉的Javascript上加入了一些新的东西。使得Javascript更为强大，可以应对大型程序的要求。

## ES6的实现

ES6只是新一代Javascript的规范，几大公司、各个浏览器引擎等都有具体的实现。微软TypeScript、社区的CoffeeScript等都是ES6的具体实现。

参考链接：

- https://blog.mariusschulz.com/2017/01/13/typescript-vs-flow
- http://blog.ionicframework.com/ionic-and-typescript-part-1/

鉴于Angular与Ionic都是使用了微软的TypeScript, 因此在学习ES6时，将学习TypeScript这一实现。

## 关于TypeScript

TypeScript是Javascript的超集，有着以下优势：

- 可选的静态类型（关键就是这里的“可选”, Optional static typing, the key here is optional）
- 类型推理，此特性在并没有使用到类型的情况下，带来那些类型的诸多益处（Type Inference, which gives some of the benefits of types, without actually using them）
- 可在主流浏览器尚未对ES6/ES7提供支持之前，通过TypeScript用上ES6及ES7的特性
- TypeScript有着将程序向下编译到所有浏览器都支持的某个Javascript版本的能力
- IntelliSense提供了极好的工具支持

因为TypeScript带给如你一样的开发者这些不错的特性及巨大优势，Ionic是以TypeScript编写的，而不是ES6（这里就表明了**TypeScript并不是ES6**）。

### 关于可选的静态类型

可能TypeScript最能打动人心的，就是其所提供到的可选静态类型系统了。将给变量、函数、属性等加上类型。这将帮到编译器，且在app尚未运行时，就给出有关代码中任何潜在错误的警告。在使用到库及框架时，类型也有帮助，这是由于类型可令到开发者准确知悉那些APIs期望何种类型的数据。而关于类型系统，你首先要记住的是它是可选的。TypeScript并不强制要求开发者在他们不想添加的上必须添加类型。但随着应用变得越来越大、越来越复杂，类型确实可以提供到一些很棒的优势。

关于 IntelliSense:

> 一种 Microsoft 技术，这种技术通过在光标悬停在函数上时显示类定义和注释，从而让您可以分析源代码。当您在 IDE 中键入函数名时，IntelliSense 还可以完成这些名称。

TypeScript的一大优势，就是其代码补全与IntelliSense了。IntelliSense在敲入代码时，提供有用的提示。因为Ionic本身就是用TypeScript写就的，代码编辑器就可以展示出所有可用的方法，以及这些方法所期望的参数。当今所有最好的集成开发环境，比如VScode、Atom、Sublime text，甚至那些诸如Vim/Neovim等命令行的编辑器，都有对代码补全的支持。

TypeScript的许多优势，带来了一种好得多的app开发体验。因此，Ionic将全力压注到TypeScript上，而不提供ES6的启动器。

摘录自：

> [TypeScript的优势](https://ionicframework.com/docs/developer-resources/typescript/)

## 本教程特色

针对新特性的详细讨论，并与与实例代码结合。TypeScript是在Javascript的基础上，引入了诸多新特性，本教程将逐一讨论这些新特性，并同时编写相应代码加以验证。

## 环境的建立

环境的建立主要由三个文件构成：

+ `package.json` -- NodeJS 的项目文件，该文件包含了项目的各种信息与包依赖，比如项目名称、所有者信息、许可证、git地址等信息，包含各种依赖包等。

```json
{
    "name": "typescript-learnings",
    "version": "0.1.0",
    "description": "TypeScript Learning stuffs.",
    "main": "/dist/main.js",
    "scripts": {
        "gulp": "gulp &",
        "start": "live-server dist/",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/gnu4cn/ts-learnings.git"
    },
    "keywords": [
        "TypeScript"
    ],
    "author": "Peng Hailin, unisko@gmail.com",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/gnu4cn/ts-learnings/issues"
    },
    "homepage": "https://github.com/gnu4cn/ts-learnings#readme",
    "devDependencies": {
        "@types/reflect-metadata": "^0.1.0",
        "gulp": "^4.0.0",
        "gulp-sourcemaps": "^2.6.1",
        "gulp-typescript": "^5.0.1",
        "gulp-uglify": "^3.0.0",
        "live-server": "^1.2.0",
        "typescript": "^3.4.1"
    },
    "dependencies": {}
}
```

`package.json`文件是所有NodeJS项目都有的文件，有了该文件，就可以使用`npm -i`命令，在本地安装项目依赖包。于是项目就可以运行起来了。

+ `tsconfig.json` 文件

    该文件表明此NodeJS项目是一个 TypeScript项目，其中包含了`files`、`include`、`exclude`、`compilerOptions`等属性，用于将 TypeScript代码编译为 JavaScript目标代码过程。

```json
{
    "include": [
        "src/*.ts"
    ],
    "compilerOptions": {
        "noImplicitAny": true,
        "target": "es5",
        "outDir": "dist/",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "types": [
            "reflect-metadata"
        ]
    }
}
```

+ `gulpfile.js` 文件

    该文件是 Gulp 自动化工具的配置文件。利用 Gulp 来自动化处理有关编译、打包及SourceMap相关工作。在上面的`package.json`文件中包含了对 `gulp`、`gulp-typescript`的依赖，其中`gulp-typescript`就是 Gulp中的 TypeScript编译器。

```javascript
var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

let paths = {
    pages: ["src/*.html"]
};

gulp.task("copy-html", ()=>{
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"))
});

gulp.task('tsc', () => {
    return gulp.src('src/*.ts')
                          .pipe(tsProject())
                          .pipe(gulp.dest('dist'));
});

// 这里 watch 里必须使用 gulp.series
gulp.task('watch', () => {
    gulp.watch('src/*.ts', gulp.series('tsc'));
});


// 这里必须要有一个 default 任务
gulp.task('default', gulp.series('copy-html', 'tsc', 'watch'));
```

有了这三个文件，就意味着环境建立起来了，可以开始TypeScript代码的编写了。`src`目录下的所有`.ts`代码，都将被编译到 `dist`目录下。
