import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync } from 'node:child_process';

const system = os.platform();
const arch = os.arch();

const supportedArch = ['arm64', 'x64'];
if(!supportedArch.includes(arch)) {
	console.log('unsupported arch:', arch);
	process.exit(-1);
}

const isArm64 = arch === 'arm64';

const cmd = ['pnpm', 'run', '-C', 'api'];
const outDir = path.join(process.cwd(), 'api/bin');
let fileName;

switch(system) {
	case 'darwin':
		cmd.push(isArm64? 'pkgmacos-arm64': 'pkgmacos');
		fileName = isArm64? 'app_macos_arm64': 'app_macos';
		break;
	case 'freebsd':
	case 'linux':
	case 'openbsd':
	case 'netbsd':
		cmd.push(arch === 'arm64'? 'pkglinux-arm64': 'pkglinux');
		fileName = isArm64? 'app_linux_arm64': 'app_linux';
		break;
	case 'win32':
		cmd.push(arch === 'arm64'? 'pkg . -t node14-win-arm64 -C GZip -o bin/app_win_arm64 --no-bytecode': 'pkgwin');
		fileName = isArm64? 'app_win_arm64.exe': 'app_win.exe';
}

const outFile = path.join(outDir, fileName);
if(!fs.existsSync(outFile)) {
	console.log(`start build api for ${system} ${arch}`);
	execSync(cmd.join(' '));
	console.log('api built');
} else {
	console.log('api has been built, build will skip');
}

console.log('copying api exec file');
const targetFile = path.join(process.cwd(), 'executables', system === 'win32'? 'api.exe': 'api');
if(!fs.existsSync(targetFile)) {
	fs.cpSync(outFile, targetFile, { recursive: true });
}
console.log('all done!');
