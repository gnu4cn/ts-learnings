# tsconfig.json


[原文](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html): https://www.typescriptlang.org/docs/handbook/tsconfig-json.html


## 概述

某个目录下存在文件`tsconfig.json`，那么就表明该目录是某个TypeScript项目的根目录。`tsconfig.json`文件指定了有哪些根文件，以及需要哪些编译器选项来对该项目进行编译。项目是以以下方式之一进行编译的：


## `tsconfig.json`的运用

+ 通过不带有文件的方式调用 `tsc`命令，此时编译器从当前目录开始，进而沿父目录链往上搜索`tsconfig.json`文件（by invoking `tsc` with no input files, in which case the compiler searches for the `tsconfig.json` file starting in the current directory and continuing up the parent directory chain）。

+ 通过不带有文件，但提供用于指定包含了`tsconfig.json`文件的目录路径，或指向某个包含了配置的有效的`.json`文件的`--project`（或仅`-p`）的命令行选项方式，来调用`tsc`命令。

    当有在命令行上指定了文件时，`tsconfig.json`文件就会被忽略。

## 示例

`tsconfig.json`的一些示例文件：

+ 使用`files`属性

    ```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "sourceMap": true
        },
        "files": [
            "core.ts",
            "sys.ts",
            "types.ts",
            "scanner.ts",
            "parser.ts",
            "utilities.ts",
            "binder.ts",
            "checker.ts",
            "emitter.ts",
            "program.ts",
            "commandLineParser.ts",
            "tsc.ts",
            "diagnosticInformationMap.generated.ts"
        ]
    }
    ```

+ 使用`include`与`exclude`属性

    ```json
    {
        "compilerOptions": {
            "module": "system",
            "noImplicitAny": true,
            "removeComments": true,
            "preserveConstEnums": true,
            "outFile": "../../built/local/tsc.js",
            "sourceMap": true
        },
        "include": [
            "src/**/*"
        ],
        "exclude": [
            "node_modules",
            "**/*.spec.ts"
        ]
    }
    ```

## 详解（Details）

属性`compilerOptions`是可以省略的，在省略了该属性时，编辑器将使用默认选项。请参考完整的[编译器选项](#compiler-options)清单。

`files`属性取的是一个相对或绝对文件路径的清单。而`include`与`exclude`属性，则取的是类似于glob的文件模式清单（请参考 [Glob_(programming), Wikipedia](https://en.wikipedia.org/wiki/Glob_(programming))，[glob介绍](https://www.jianshu.com/p/ce7cf53274bb)）。支持以下glob通配符：

+ `*` 匹配零个或更多字符（不包含目录分隔符，`*` matches zero or more characters(excluding directory separators)）

+ `?` 匹配任意的一个字符（不包含目录分隔符，`?` matches any one character(excluding directory separators)）

+ `**/` 递归地匹配所有子目录（`**/` recursively matches any subdirectory）

在某个glob模式片段中仅包含了 `*` 或 `.*` 时，那么只有那些扩展被支持的文件才被包含进来（也就是`.ts`、`.tsx`与`.d.ts`，而在`allowJs`被设置为`true`的情况下，也包含`.jx`与`.jsx`）。


