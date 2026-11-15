#!/usr/bin/env node
'use strict';

import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distArg = process.argv[2] || 'dist';
const outArg = process.argv[3] || path.join('scripts', 'sec_uninst.nsh');

const distDir = path.resolve(projectRoot, distArg);
const outFile = path.resolve(projectRoot, outArg);
const nsiDir = path.dirname(outFile);

if (!fs.existsSync(distDir) || !fs.statSync(distDir).isDirectory()) {
	console.error(`[error] dist 目录不存在: ${distDir}`);
	process.exit(1);
}

/** NSIS 字符串转义: $ -> $$, " -> $\" */
function esc(str) {
	return str.replace(/\$/g, '$$$$').replace(/"/g, '$\\"');
}

/** 统一为 Windows 反斜杠 */
function toWin(p) {
	return p.split(/[\\/]+/).join('\\');
}

/** 生成相对于 .nsi/.nsh 所在目录的源路径 */
function relSrc(fullPath) {
	let rel = path.relative(nsiDir, fullPath);
	return toWin(rel).replace(/^\.\.\\dist\\/, '');
}

/** 递归扫描目录，返回树 */
function scan(dir) {
	const node = { files: [], dirs: new Map() };
	const entries = fs
		.readdirSync(dir, { withFileTypes: true })
		.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

	for (const ent of entries) {
		const full = path.join(dir, ent.name);
		if (ent.isDirectory()) {
			node.dirs.set(ent.name, { full, node: scan(full) });
		} else if (ent.isFile()) {
			node.files.push({ name: ent.name, full });
		} else if (ent.isSymbolicLink()) {
			// 跟随符号链接（文件），目录链接跳过避免死循环
			const st = fs.statSync(full);
			if (st.isFile()) node.files.push({ name: ent.name, full });
		}
	}
	return node;
}

const tree = scan(distDir);

const lines = [];
let totalFiles = 0;
let totalDirs = 0;

lines.push('; ================================================================');
lines.push('; 本文件由 gen-sec-uninst.js 自动生成，请勿手动修改');
lines.push('; ================================================================');
lines.push('');
lines.push('Section "Uninstall"');
lines.push('');

function del(node, relInstall) {
	const instDir = relInstall ? `$INSTDIR\\${toWin(relInstall)}` : '$INSTDIR';

	for (const [name, child] of node.dirs) {
		del(child.node, relInstall ? path.join(relInstall, name) : name);
	}

	if (node.files.length > 0 || node.dirs.size === 0) {
		totalDirs++;
		for (const f of node.files) {
			lines.push(`  Delete "$INSTDIR\\${esc(relSrc(f.full))}"`);
			totalFiles++;
		}
		lines.push('');
	}
}

function rmdir(node, relInstall) {
	const instDir = relInstall ? `$INSTDIR\\${toWin(relInstall)}` : '$INSTDIR';

	for (const [name, child] of node.dirs) {
		rmdir(child.node, relInstall ? path.join(relInstall, name) : name);
	}

	lines.push(`  RMDir ${instDir}`);
}

lines.push('  !insertmacro MUI_STARTMENU_GETFOLDER Application $R0');
lines.push('  Delete "$SMPROGRAMS\\$R0\\${PRODUCT_NAME}.lnk"');
lines.push('  Delete "$SMPROGRAMS\\$R0\\Uninstall.lnk"');
lines.push('  RMDir "$SMPROGRAMS\\$R0"');
lines.push('  Delete "$DESKTOP\\${PRODUCT_NAME}.lnk"');
lines.push('');

del(tree, '');
lines.push('  Delete "$INSTDIR\\Uninstall.exe"');
rmdir(tree, '');

lines.push('');
lines.push('  DeleteRegKey HKLM "Software\\${PRODUCT_NAME}"');
lines.push('  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"');
lines.push('  DeleteRegKey HKLM "${PRODUCT_UNINST_KEY}"');
lines.push('');

lines.push(`SectionEnd`);
lines.push('');
lines.push(`; 统计: ${totalFiles} 个文件, ${totalDirs} 个目录`);

fs.mkdirSync(nsiDir, { recursive: true });
fs.writeFileSync(outFile, lines.join('\r\n'), 'utf8');

console.log(`[ok] 已生成: ${outFile}`);
console.log(`[ok] 文件数: ${totalFiles}, 输出目录数: ${totalDirs}`);