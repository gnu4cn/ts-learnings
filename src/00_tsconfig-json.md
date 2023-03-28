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

在某个glob模式片段中仅包含了 `*` 或 `.*` 时，那么只有那些扩展被支持的文件才被包含进来（也就是`.ts`、`.tsx`与`.d.ts`，而在`allowJs`被设置为`true`的情况下，也包含`.js`与`.jsx`）。

而在`files`与`include`都没有指定时，编译器将默认包含其所在目录及子目录下的所有TypeScript文件（`.ts`、`.d.ts`与`tsx`），除了那些使用`exclude`属性所排除的文件。同时若`allowJS`被设置为`true`，那么JavaScript文集（`.js`与`.jsx`）也将包含进来。若有指定`files`与`include`属性，则编译器将包含由这两个属性所包含的文件联合（the union of the files included by those two properties）。在未指定`exclude`属性时，使用编译器选项`outDir`所指定的目录中的文件是排除在外的（Files in the directory specified using the `outDir` compiler option are excluded as long as `exclude` property is not specified）。

使用`include`所包含的文件，可使用`exclude`属性对其进行过滤。但使用`files`属性显式包含的文件，则不会受到`exclude`的影响而总是会包含进来。在莫有指定`exclude`属性时，就默认排除了`node_modules`、`bower_components`、`jspm_packages`以及`<outDir>`这些目录。

那些被`files`或`include`属性包含进来的文件引用到的文件，也将被包含进来。同样，如某个文件`B.ts`被另一个文件`A.ts`引用了，那么除非文件`A.ts`在`exclude`清单中有指明，否则文件`B.ts`也不能被排除在外。

请注意编译器不会将那些可能是输出的文件包含进去；比如在输入中包含了`index.ts`时，那么`index.d.ts`与`index.js`就会被排除在外。总体来说，让多个文件只是在扩展名上有所不同，是不好的做法。

`tsconfig.json`文件可以是空的，那将对默认包含的所有文件，以默认的编译器选项进行编译（跟前面讲到的一样）。

在命令行指定的编译器选项，将覆盖在`tsconfig.json`文件中所指定的那些选项。

## `@types`、`typeRoots`与`types`

默认所有 *可见* 的 `@types` 包在编译中都被包含进去了。任何闭合文件夹的 `node_modules/@types` 里的包，都被视为 *可见* 的（Packages in `node_modules/@types` of any enclosing folder are considered *visible*）； 具体来说，那意味着在 `./node_modules/@types/`、`../node/modules/@types/`及`../../node_modules/@types/`等处的包。

若指定了 `typeRoots`，那么就 *只有* `typeRoots`下的包将被包含进来了。比如：

```json
{
   "compilerOptions": {
        "typeRoots": ["./typings"]
   } 
}
```

此配置文件将包含在 `./typings` 下的 *所有* 包，而不会包含那些 `./node_modules/@types` 下的包了。

在指定了 `types` 属性时，那么就只有所列出的那些包被包含进来。比如：

```typescript
{
    "compilerOptions": {
        "types" : ["node", "lodash", "express"]
    }
}
```

此`tsconfig.json`文件将 *只* 包含 `./node_modules/@types/node`、`./node_modules/@types/lodash`与`./node_modules/@types/express`。其他位处 `./node_modules/@types/*` 的包不会被包含进来。

类型包（a types package）指的是某个带有名为`index.d.ts`文件的文件夹，或某个有着包含了`types`字段的`package.json`文件的文件夹。

在`tsconfig.json`中指定`types: []`字段，就关闭了`@types`包的自动包含。

请记住只有在使用那些带有全局声明的文件（与将文件声明为模块相反）时，自动包含才是重要的（keep in mind that automatic inclusion is only important if you're using files with global declarations(as opposed to files declared as modules)）。比如在使用一条`import "foo"`语句时，TypeScript将在`node_modules`与`node_modules/@types`文件夹中进行查找，以找到`foo`包。

## 使用`extends`配置继承

**Configuration inheritence with `extends`**

通过使用`extends`属性，`tsconfig.json`文件可从其他文件继承到配置。

在`tsconfig.json`中，`extends`属性是一项顶层属性（与`compilerOptions`、`files`、`include`与`exclude`一起）。`extends`的值是一个包含了到要继承的其他文件的路径的字符串。

来自基础文件的配置，将首先载入，随后被继承的配置文件覆盖。如发生了循环继承，编译器将报告错误。

继承配置文件中的`files`、`include`与`exclude`将 *覆盖* 基础配置文件中的对应属性（`files`, `include` and `exclude` from the inheriting config file *overwrite* those from the base config file）。

在配置文件中找到的所有相对路径，将解析为相对于配置文件原本的位置。

比如：

`configs/base.json`:

```json
{
    "compilerOptions": {
        "noImplicitAny": true,
        "strictNullChecks": true
    }
}
```

`tsconfig.json`:

```json
{
    "extends": "./config/base",
    "files": [
        "main.ts",
        "supplemental.ts"
    ]
}
```

`tsconfig.nostrictnull.json`:

```json
{
    "extends": "./tsconfig",
    "compilerOptions": {
        "strictNullChecks": false
    }
}
```

## 关于 `compileOnSave` 属性

加入一个顶层的`compileOnSave`，告诉IDE在保存时生成给定`tsconfig.json`的所有文件。

```json
{
    "compileOnSave": true,
    "compilerOptions": {
        "noImplicitAny": true
    }
}
```

此特性当前已在 Visual Studio 2015 与 TypeScript 1.8.4 以上版本，以及[atom-typescript](https://github.com/TypeStrong/atom-typescript#compile-on-save)插件中得到支持。

## 关于`tsconfig.json`文件的完整结构

**Schema**

可以从 http://json.schemastore.org/tsconfig 查看到。

<a name="compiler-options"></a>
## 编译器选项

| 选项                              | 值类型        | 默认值                                        | 简介                                                                          |
| :---                              | :----:        | :---                                          | :---                                                                          |
| `--allowJs`                       | `boolean`     | `false`                                       | 允许编译JavaScript文件。                                                      |
| `--allowSyntheticDefaultImports`  | `boolean`     | `module === "system"` 或 `--esModuleInterop`  | 允许从那些没有默认导出的模块默认导入。此选项不会影响生成的代码，只做类型检查。|

更多编译器选项请参考 https://www.typescriptlang.org/docs/handbook/compiler-options.html
