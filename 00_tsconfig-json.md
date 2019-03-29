# tsconfig.json

## 概述

某个目录下存在文件`tsconfig.json`，那么就表明该目录是某个TypeScript项目的根目录。`tsconfig.json`文件指定了有哪些根文件，以及需要哪些编译器选项来对该项目进行编译。项目是以以下方式之一进行编译的：


## `tsconfig.json`**的运用

+ 通过不带有文件的方式调用 `tsc`命令，此时编译器从当前目录开始，进而沿父目录链往上搜索`tsconfig.json`文件（by invoking `tsc` with no input files, in which case the compiler searches for the `tsconfig.json` file starting in the current directory and continuing up the parent directory chain）。

+ 通过不带有文件，但提供用于指定包含了`tsconfig.json`文件的目录路径，或指向某个包含了配置的有效的`.json`文件的`--project`（或仅`-p`）的命令行选项方式，来调用`tsc`命令。

当有在命令行上指定了文件时，`tsconfig.json`文件就会被忽略。

## 示例


