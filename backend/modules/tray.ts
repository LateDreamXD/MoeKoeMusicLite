import path from 'tjs:path';

const getIconPath = (basePath: string, iconFile: string) => [basePath, iconFile].join(path.sep);

export const onTray = (id: string, app: TinyApp) => {
	switch(id) {
		case 'show':
			return app.win.show();
		case 'prev-track':
			return app.push('prev-track');
		case 'pause':
			return app.push('toggle-play-pause');
		case 'next-track':
			return app.push('next-track');
		case 'project-home':
			return app.shell.open('https://music.moekoe.cn');
		case 'report-bug':
			return app.shell.open('https://github.com/LateDreamXD/MoeKoeMusicLite/issues');
		case 'check-update':
			return ;
		case 'restart-app':
			return app.reload();
		case 'quit':
			return app.quit();
	}
}

export const createTray = async (app: TinyApp) => {
	const basePath = (await app.paths()).resources!;

	let mainIcon: string;
	switch(app.system.os()) {
		case 'macos':
			mainIcon = getIconPath(basePath, '/tray/mac-ico.png');
			break;
		case 'windows':
			mainIcon = getIconPath(basePath, '/tray/tray-icon.ico');
			break;
		case 'linux':
			mainIcon = getIconPath(basePath, '/tray/linux-icon.png');
	}

	app.tray.set({
		icon: mainIcon,
		tooltip: 'MoeKoe Music Lite',
		menu: [
			{ id: 'show', label: '显示主窗口', icon: getIconPath(basePath, '/tray/menu/show.png') },
			{ separator: true },
			{ id: 'prev-track', label: '上一首', icon: getIconPath(basePath, '/tray/menu/prev.png') },
			{ id: 'pause', label: '播放/暂停', icon: getIconPath(basePath, '/tray/menu/play.png') },
			{ id: 'next-track', label: '下一首', icon: getIconPath(basePath, '/tray/menu/next.png') },
			{ separator: true },
			{ id: 'project-home', label: '项目主页', icon: getIconPath(basePath, '/tray/menu/home.png') },
			{ id: 'report-bug', label: '反馈问题', icon: getIconPath(basePath, '/tray/menu/bug.png') },
			{ id: 'check-update', label: '检查更新', icon: getIconPath(basePath, '/tray/menu/update.png') },
			{ id: 'restart-app', label: '重启软件', icon: getIconPath(basePath, '/tray/menu/restart.png') },
			{ separator: true },
			{ id: 'quit', label: '退出', icon: getIconPath(basePath, '/tray/menu/quit.png') }
		],
	});
}