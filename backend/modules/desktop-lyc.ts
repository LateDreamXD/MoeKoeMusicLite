let created = false;

export const closeDesktopLyc = (app: TinyApp) => {
	if(!created) return;
	app.window('desktop-lyc').close();
	created = false;
}

export const openDesktopLyc = async (app: TinyApp) => {
	if(created) return;
	const screens = await app.screens();
	const external = screens.find((s) => !s.internal) ?? screens[0];
	const width = external.width * 0.7;
	const lycWinData = await app.store.get('lyc-win-data');
	if(!lycWinData) await app.store.set('lyc-win-data', { width, height: 120 });
	app.win.open('desktop-lyc', {
		chrome: {
			frame: false,
			menu: false,
			panel: false,
			transparent: true
		},
		title: 'Desktop Lyrics',
		page: 'index.html#/lyrics',
		// size: `${width}x120`,
		minSize: `${width}x120`,
		x: Math.floor((external.width - width) / 2),
		y: external.height - 120,
	});
	
	created = true;
}

export const toggleDesktopLyc = (app: TinyApp) => {
	if(created) closeDesktopLyc(app);
	else openDesktopLyc(app);
	app.store.get('settings').then(settings => {
		settings.desktopLyrics = created? 'off': 'on';
		app.store.set('settings', settings);
	});
}

export const onLycData = (data: any, app: TinyApp) => {
	if(!created) return;
	const lycWin = app.window('desktop-lyc');
	lycWin.push('lyrics-data', data);
}