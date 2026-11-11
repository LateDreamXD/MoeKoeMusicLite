import { type MoeKoeShortcuts } from '@latedream/moekoe-latelib-types';
import { toggleDesktopLyc } from './desktop-lyc';

export const registerHotkeys = (app: TinyApp, hotkeys: MoeKoeShortcuts) => {
	Object.keys(hotkeys).forEach(hotKeyId => {
		// @ts-ignore
		if(hotkeys[hotKeyId]) app.hotkey.register(hotKeyId, hotkeys[hotKeyId]);
		else app.hotkey.unregister(hotKeyId);
	});
}

export const onHotkey = (id: keyof MoeKoeShortcuts, app: TinyApp) => {
	switch(id) {
		case 'mainWindow':
			return app.win.show();
		case 'quitApp':
			return app.quit();
		case 'prevTrack':
			return app.push('prev-track');
		case 'nextTrack':
			return app.push('next-track');
		case 'playPause':
			return app.push('toggle-play-pause');
		case 'volumeUp':
			return app.push('volume-up');
		case 'volumeDown':
			return app.push('volume-down');
		case 'mute':
			return app.push('toggle-mute');
		case 'like':
			return app.push('toggle-like');
		case 'mode':
			return app.push('toggle-mode');
		case 'toggleDesktopLyrics':
			return toggleDesktopLyc(app);
	}
}