# cmakehelper vscode extention
- pugging path (./cmakehelper/1/)
- test project path (./test_proj/)
> Pan Alexander 467005 M3103

plugging integrate cmake commands to vscode, provide vscode interface by .json settings and vscode command plate

it's alternative to cmaketools - official cmake extention to vscode
> I don't find functional the one i need, and make it self

pluggin have vscode command plate interface assertion to vscode output console and standart vscode asserts(error) canvases

---

## command

### command list:
1. `cmakehelper.init`(short notation: `cmakehelper: sanek molodec`)
2. `cmakehelper.checkCmakeVersion`(short notation: `cmakehelper: check cmake version`)
3. `cmakehelper.cacheInit`(short notation: `cmakehelper: init cmake cache`)
4. `cmakehelper.buildProj`(short notation: `cmakehelper: build project`)
5. `cmakehelper.runTarget`(short notation: `cmakehelper: target run`)

### command notation:

#### init
(1) initalization pluggin state
#### version
(2) assert cmake version
#### cache initialization
(3) initializtion build cache of cmake
#### build project
(4) build project with cmake
#### run target
(5) execute choosen target

---

## input interfaces
initializaton of extention state made in setting.json files, after saving, state automaticly update.

### parametr list:
1. cmakehelper.BuildPathSetting
2. cmakehelper.GeneratorSetting
3. cmakehelper.SourcePathSetting
4. cmakehelper.BuildTypeSetting
5. cmakehelper.CCompilerSetting
6. cmakehelper.CXXCompilerSetting
7. cmakehelper.anotherCacheGenericArgs
8. cmakehelper.PathToTarget
9. cmakehelper.TargetName
10. cmakehelper.TargetArgs

### command notation:
#### cmakehelper.BuildPathSetting
path to build directory \[OPTIONAL\]
#### cmakehelper.GeneratorSetting
cmake generator name
#### cmakehelper.SourcePathSetting
cmake source file path(CMakeLists.txt) \[OPTIONAL\]
#### cmakehelper.BuildTypeSetting
build type pf project \[OPTIONAL\]
#### cmakehelper.CCompilerSetting
C compiler name(with path somtimes) \[OPTIONAL\]
#### cmakehelper.CXXCompilerSetting
CXX compiler name(with path somtimes) \[OPTIONAL\]
#### cmakehelper.anotherCacheGenericArgs
another cmake args \[OPTIONAL\]
#### cmakehelper.PathToTarget
path to target(execute file)
#### cmakehelper.TargetName
name of target(execute file)
#### cmakehelper.TargetArgs
target run arguments