import * as vscode from 'vscode';
import {Cmakehelper, SettingsJSON_t} from './lib/cmakehelper/cmakehelper';

let log_pref = 'cmakehelper log >>> ';
let outputChannel = vscode.window.createOutputChannel('cmakehelper');


export function activate(context: vscode.ExtensionContext) {
  console.log('activate method is done');

  let instance_cmakehelper = new Cmakehelper(outputChannel);

  const changeSettingsEvent = vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('cmakehelper')) {
      console.log(log_pref + 'settings update');
      instance_cmakehelper.getSettings();
    }
  });

  // register command method
  const helloWorldAssertReg = vscode.commands.registerCommand('cmakehelper.init', () => {
    instance_cmakehelper.getSettings();
    vscode.window.showInformationMessage('initialization done');
  });

  //cmake version registerate
  const checkCmakeVersionReg = vscode.commands.registerCommand('cmakehelper.checkCmakeVersion', () => {
    let ans = instance_cmakehelper.checkCmakeVersion();

    if (ans == undefined || ans.startsWith('cmakehelper error')) {
      vscode.window.showErrorMessage('cmake version not found')
    } else {
      vscode.window.showInformationMessage(ans + ' successfully found in your system');
    }
  });

  //cmake init cache registerate
  const cacheInitReg = vscode.commands.registerCommand('cmakehelper.cacheInit', () => {
    if (instance_cmakehelper.CacheInit()) {
      vscode.window.showInformationMessage('initialization cmake cache successfully');
    } else {
      vscode.window.showErrorMessage('initialization cmake cache fail')
    };
  });

  //cmake build registerate
  const buildReg = vscode.commands.registerCommand('cmakehelper.buildProj', () => {
    if (instance_cmakehelper.BuildProj()) {
      vscode.window.showInformationMessage('Build project successfully');
    } else {
      vscode.window.showErrorMessage('Build project cache fail')
    };
  });

  //run target registerate
  const runTarget = vscode.commands.registerCommand('cmakehelper.runTarget', () => {
    if (instance_cmakehelper.runTarget()) {
      vscode.window.showInformationMessage('Run target successfully');
    } else {
      vscode.window.showErrorMessage('Run target fail, check target settings')
    };
  });

  context.subscriptions.push(outputChannel);

  context.subscriptions.push(changeSettingsEvent);
  context.subscriptions.push(helloWorldAssertReg);
  context.subscriptions.push(checkCmakeVersionReg);
  context.subscriptions.push(buildReg);
  context.subscriptions.push(runTarget);
}

// deactivate method
export function deactivate() {
  if (outputChannel) {
    outputChannel.dispose();
  }
}
