import * as vscode from 'vscode';
import * as child from 'child_process';
import { mkdir } from 'fs';

let log_pref = 'cmakehelper log >>> ';

interface SettingsJSON_t {
  BuildPathSetting?: string;
  GeneratorSetting?: string;
  SourcePathSetting?: string;
  BuildTypeSetting?: string;
  CCompilerSetting?: string;
  CXXCompilerSetting?: string;
  AnotherCacheGenericArgsSetting?: string;
}

class Cmakehelper {
  cmakehelperSettings_ : SettingsJSON_t;
  workspacePath_ : string = '';
  tagetPath: string = '';
  outputChannel : vscode.OutputChannel;
  isCacheGenerated : boolean = false;
  constructor(outputChannel: vscode.OutputChannel) {
    this.outputChannel = outputChannel;
    if(vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      this.workspacePath_ = vscode.workspace.workspaceFolders[0].uri.fsPath;
    } else {
      this.workspacePath_ = '';
    }

    this.cmakehelperSettings_ = {
      BuildPathSetting: undefined,
      GeneratorSetting: undefined,
      SourcePathSetting: undefined,
      BuildTypeSetting: undefined,
      CCompilerSetting: undefined,
      CXXCompilerSetting: undefined,
      AnotherCacheGenericArgsSetting: undefined
    };
  this.CacheInit();
  }

  getSettings() {
    // registrate extention settings
    console.log(log_pref + 'get settings done');

    let vscode_text_edotor = vscode.window.activeTextEditor;
    let vscode_cfg = vscode.workspace.getConfiguration('cmakehelper');
    if (vscode_text_edotor) {
      if (vscode_cfg.get<string>('BuildPathSetting')) {
        this.cmakehelperSettings_.BuildPathSetting = vscode_cfg.get<string>('BuildPathSetting') || this.cmakehelperSettings_.BuildPathSetting;
      }
      this.cmakehelperSettings_.GeneratorSetting = vscode_cfg.get<string>('GeneratorSetting') || this.cmakehelperSettings_.GeneratorSetting;
      this.cmakehelperSettings_.SourcePathSetting = vscode_cfg.get<string>('SourcePathSetting') || this.cmakehelperSettings_.SourcePathSetting;
      this.cmakehelperSettings_.BuildTypeSetting = vscode_cfg.get<string>('BuildTypeSetting') || this.cmakehelperSettings_.BuildTypeSetting;
      this.cmakehelperSettings_.CCompilerSetting = vscode_cfg.get<string>('CCompilerSetting') || this.cmakehelperSettings_.CCompilerSetting;
      this.cmakehelperSettings_.CXXCompilerSetting = vscode_cfg.get<string>('CXXCompilerSetting') || this.cmakehelperSettings_.CXXCompilerSetting;

      this.cmakehelperSettings_.AnotherCacheGenericArgsSetting = vscode_cfg.get<string>('anotherCacheGenericArgs') || this.cmakehelperSettings_.AnotherCacheGenericArgsSetting;
      this.tagetPath = vscode_cfg.get<string>('PathToTarget') || '';
      if (this.tagetPath) {
        if (this.tagetPath + vscode_cfg.get<string>('TargetName')) {
          this.tagetPath = this.tagetPath + vscode_cfg.get<string>('TargetName');
          this.tagetPath = this.tagetPath + ' ' + vscode_cfg.get<string>('TargetArgs') || '';
        } else {
          this.tagetPath = '';
        }
      }

      if(!this.cmakehelperSettings_.BuildPathSetting) {
        this.cmakehelperSettings_.BuildPathSetting = this.workspacePath_;
      }

      console.log(log_pref + 'update settings done: ' + JSON.stringify(this.cmakehelperSettings_));
      console.log(log_pref + '---------------------------------------------');
    } else {
      console.log(log_pref + 'text editor don`t found');
    }
  };

  checkCmakeVersion() {
    try {
      let res = child.execSync('cmake --version');
      return res.toString('utf8').trim();
    } catch (err) {
      return 'cmakehelper error: ' + err;
    }
  };

  CacheInit() {
    this.getSettings();
    try {
      let res = child.execSync('mkdir build', {cwd: this.cmakehelperSettings_.BuildPathSetting})
      console.log(log_pref +  'mkdir build done >>> ' + 'res: ' + res.toString('utf8').trim());
      console.log(log_pref + '---------------------------------------------');
    } catch (err) {
      console.log(log_pref + 'mkdir fail >>> ' + 'res: ' + err);
      console.log(log_pref + '---------------------------------------------');
    }

    if (this.cmakehelperSettings_.BuildPathSetting) {
      let req = `cmake -S${this.cmakehelperSettings_.SourcePathSetting}` + '../';
      if (this.cmakehelperSettings_.GeneratorSetting)
        req = req + ' ' + `-G"${this.cmakehelperSettings_.GeneratorSetting}"`;
      if (this.cmakehelperSettings_.CCompilerSetting)
        req = req + ' ' +  `-DCMAKE_C_COMPILER=${this.cmakehelperSettings_.CCompilerSetting}`;
      if (this.cmakehelperSettings_.CXXCompilerSetting)
        req = req + ' ' + `-DCMAKE_CXX_COMPILER=${this.cmakehelperSettings_.CXXCompilerSetting}`;
      if (this.cmakehelperSettings_.AnotherCacheGenericArgsSetting)
        req = req + ' ' + `${this.cmakehelperSettings_.AnotherCacheGenericArgsSetting}`;

      this.outputChannel.appendLine('cache generation res => ');
      try {
        let res = child.execSync(req, {cwd: this.cmakehelperSettings_.BuildPathSetting + '/build/'});
        console.log(log_pref +  'cache init done >>> ' + 'res: ' + res.toString('utf8').trim());
        console.log(log_pref + '---------------------------------------------');
        this.outputChannel.append(res.toString('utf8').trim());
        this.isCacheGenerated = true;
        return true;
      } catch (err) {
        this.outputChannel.append(log_pref + err);
        console.log(log_pref + err);
        console.log(log_pref + '---------------------------------------------');
        return false;
      }
    }
    console.log(log_pref + '---------------------------------------------');
    return false;
  };

  BuildProj() {
    this.outputChannel.appendLine('building res => ');
    if (this.isCacheGenerated) {
      let req = `cmake --build .`;

      try {
        let res = child.execSync(req, {cwd: this.cmakehelperSettings_.BuildPathSetting + '/build/'});
        console.log(log_pref +  'building done >>> ' + 'res: ' + res.toString('utf8').trim());
        this.outputChannel.append(res.toString('utf8').trim());
        console.log(log_pref + '---------------------------------------------');
        return true;
      } catch (err) {
        this.outputChannel.append(log_pref + err);
        console.log(log_pref + err);
        console.log(log_pref + '---------------------------------------------');
        return false;
      }
    } else {
      console.log(log_pref + '---------------------------------------------');
    }
    this.outputChannel.appendLine('cache was not generating');
    return false;
  }

  runTarget () {
    this.outputChannel.append('\nrun target =>\n ');
    if (this.tagetPath != '') {
      let req = this.tagetPath;

      try {
        let res;
        if (this.tagetPath.startsWith('./')) {
          res = child.execSync(req.slice(2), {cwd: this.cmakehelperSettings_.BuildPathSetting + '/build/'});
        } else {
          res = child.execSync(req);
        }

        this.outputChannel.append(res.toString('utf8').trim());
        console.log(log_pref + '---------------------------------------------');
        return true;
      } catch (err) {
        this.outputChannel.append(log_pref + err);
        console.log(log_pref + err);
        console.log(log_pref + '---------------------------------------------');
        return false;
      }
    } else {
      this.outputChannel.appendLine('target path and name was is undefine');
    }
    console.log(log_pref + '---------------------------------------------');
    return false;
  }
}

export {Cmakehelper, SettingsJSON_t};