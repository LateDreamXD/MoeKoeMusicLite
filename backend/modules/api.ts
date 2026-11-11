import { type MoeKoeSettings } from '@latedream/moekoe-latelib-types';
import { registerHotkeys } from './hotkey';
import { closeDesktopLyc, openDesktopLyc, onLycData } from './desktop-lyc';

export const api: Record<string, TinyApiHandler> = {
	openMvWindow: ({ url, title }, app) => {
		app.win.open('mv-player', {
			chrome: {
				frame: false,
				menu: false,
				panel: false
			},
			size: '1024x768',
			title,
			page: url,
		});
		const win = app.window('mv-player');
		win.center();
		return win;
	},
	settingsUpdate: ({ settings }: { settings: MoeKoeSettings }, app) => {
		app.launchAtLogin.set(settings.autoStart === 'on');
		registerHotkeys(app, settings.shortcuts);
	},
	desktopLyrics: ({ show }: { show: boolean }, app) => show? openDesktopLyc(app): closeDesktopLyc(app),
	lycData: onLycData,
	lycAction: ({ action }, app) => {
		switch(action) {
			case 'previous-song':
				return app.push('prev-track');
			case 'toggle-play':
				return app.push('toggle-play-pause');
			case 'next-song':
				return app.push('next-track');
		}
	}
};