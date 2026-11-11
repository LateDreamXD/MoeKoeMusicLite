import { createTray, onTray } from './modules/tray';
import { registerHotkeys, onHotkey } from './modules/hotkey';
import { playStartupSound } from './modules/startup-sound';
import { openDesktopLyc } from './modules/desktop-lyc';
import defaultSettings from '@/data/defaultSettings.json';

const init = async (app: TinyApp) => {
	let settings: typeof defaultSettings = await app.store.get('settings');
	if(!settings) {
		app.store.set('settings', defaultSettings);
		settings = defaultSettings;
	}

	createTray(app);

	app.win.setChrome({
		frame: settings.nativeTitleBar === 'on',
		menu: false,
		panel: false
	});

	if(settings.startMinimized === 'on') {
		app.win.hide();
	}

	if(settings.preventAppSuspension === 'on') {
		app.power.preventSleep('preventAppSuspension is on');
	}

	registerHotkeys(app, settings.shortcuts);

	if(settings.greetings === 'on') {
		playStartupSound(app);
	}

	if(settings.desktopLyrics === 'on') {
		openDesktopLyc(app);
	}
}

export { init, onTray, onHotkey };
export { api } from './modules/api';
