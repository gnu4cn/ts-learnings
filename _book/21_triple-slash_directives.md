# 三斜杠指令

## Triple-Slash Directives

三斜杠指令，指的是包含了单个的 XML(eXtensible Markup Language, 可扩展标记语言)的单行评论。评论内容是作为编译器指令，进行使用的。

三斜杠指令， **只有** 位于包含他们的文件顶部时，才生效。一条三斜杠指令后面，只能跟一条单行或多行注释，包含其他三斜杠指令。在他们中有跟随了一条语句或圣母的情况，那么他们将作为常规的单行注释对待，而不再有特殊意义（A triple-slash directive can only be preceded by single or multi-line comments, including other triple-slash directives. If they are encountered following a statement or a declaration they are treated as regular single-line comments, and hold no special meaning）。

```typescript
/// <reference path="..." />
```

指令 `/// <reference path="..." />` 是三斜杠指令中最常见的。其是作为文件之间 *依赖* 的声明而发挥作用的（It serves as a declaration of *dependency* between files）。

三斜杠的引用，告知编译器在编译过程中，要包含额外的文件。

在使用了`--out` 或 `--outFile`选项时，三斜杠引用还作为一种将编译输出进行排序的方式，而发挥作用。此时编译生成的文件，将按照与预处理完成后的输出同样的顺序，生成到输出文件位置（They also serve as a method to order the output when using `--out` or `--outFile`. Files are emitted to the output file location in the same order as the input after preprocessing pass）。

## 输入文件的预处理（preprocessing input files）

编译器对输入文件执行预处理，从而对所有三斜杠指令完成解析。在此过程中，那些额外文件就被添加到编译中。

预处理过程一些 *根文件（root files）* 开始，这些根文件为在命令行上指定的文件名，或在`tsconfig.json`文件中列入到`files`字段的那些文件。这些根文件将按照指定他们的顺序得以预处理。在某个文件加入到根文件清单之前，所有该文件中的三斜杠引用，都会得到处理，且这些三斜杠引用的目标都被包含进来。三斜杠引用的解析，是以引用深度优先方式、以引用在文件中被观察到的顺序进行的。

在三斜杠引用路径没有指定根的时候，引用路径都是以相对与包含他们的那些文件，进行解析的。

## 错误处理（errors）

在引用了不存在的文件时，就出现了错误。对自身的三斜杠引用，也是错误的。

## `--noResolve`的使用（using `--noResolve`）

在指定了`--noResolve`编译器开关时，就会忽略三斜杠引用；此时三斜杠引用既不会加入新的文件，也不会改变所提供到的文件顺序。

## `/// <reference types="..." />`

与 `/// <reference path="..." />` 指令类似，该指令也是作为 *依赖* 的声明而发挥作用的；不过 `/// <reference types="..." />` 指令则声明了对某个包的依赖。

对这些包名称的解析过程，与`import`语句中对模块的解析过程类似。对“三斜杠类型引用（triple-slash-reference-types）”的一种简便理解，便是将其作为一个包声明的`import`语句。

比如，在某个声明文件中包含了`/// <reference types="node" />`，就声明了此文件将用到在`@types/node/index.d.ts`中中所声明的名称；那么因此这个`node`包就需要在编译过程中与该声明文件一同包含进来。

请只有在手动编写某个`d.ts`文件时，才使用这类指令。

对于那些在编译过程中生成的声明文件，编译器将自动为您加入`/// <reference types="..." />`指令；有且只有在生成文件用到所引用的包中的某个声明时，编译器才会将某个`/// <reference types="..." />`指令加入到所生成的声明文件中。

在声明对某个`.ts`文件中的`@types`包的依赖时，就要在命令行或`tsconfig.json`文件中，使用`--types`选项了。请参考 [在`tsconfig.json`文件中使用`@types`、`typeRoots`以及`types`](tsconfig-json.md#types-typeroots-and-types)。

## `/// <reference lib="..." />`

该指令令到某个文件可以显式地包含某个既有的内建 *库（lib）* 文件。

内建 *库* 文件是以与`tsconfig.json`中的`lib`编译器选项同样的方式（比如，使用`lib=es2015`而非 `lib="lib.es2015.d.ts"`等等），加以引用的。

对于那些对内建类型，比如DOM APIs或诸如`Symbol`或`Iterable`这样内建 JavaScript运行时构造器，有所依赖的声明文件编写者来说，推荐使用三斜杠库引用指令（triple-slash-reference lib directives）。在没有三斜杠库引用指令之前，这些`.d.ts`文件就必须加入这些内建类型的前向/重复声明（previously these `.d.ts` files had to add forward/duplicate declarations of such types）。

比如，将`/// <reference lib="es2017.string" />` 添加到编译中的某个文件，就等同于使用`--lib es2017.string`编译选项。

```typescript
/// <reference lib="es2017.string" />

"foo".padStart(4); // " foo"
```

## `/// <reference no-default-lib="true" />`

本指令将某个文件标记为 *默认库（default library）*。在`lib.d.ts`文件顶部可以看到此注释机器不同变种。

该指令告诉编译器在编译中不要包含默认库（比如`lib.d.ts`）。其影响与在命令行上传入`--noLib`选项类似。

还要注意在传入`--skipDefaultLibCheck`参数时，编译器仅跳过那些有着`/// <reference no-default-with="true" />`的文件的检查。


## `/// <amd-module />`

>  *注:* AMD是指异步模块定义API，Asynchronous Module Definition API, 参见[github.com/amdjs](https://github.com/amdjs/amdjs-api/wiki/AMD)。

默认情况下AMD的模块是匿名生成的。这在有使用其他工具，诸如某些打包器（如`r.js`），来处理生成的模块时可能导致某些问题。

`amd-module`指令允许将可选的模块名称，传递给编译器：

*amdModule.ts*

```typescript
/// <amd-module name="NamedModule" />
export class C {}
```

上面的代码的效果是将名称`NamedModule`，作为对 AMD `define`的调用的一部分，赋予给该模块：

*amdModule.js*

```javascript
define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {}
        return C;
    })();

    exports.C = C;
});
```

## `<amd-dependency />`

> **注意**: 该指令已被启用。请直接使用 `import "moduleName";` 语句。
