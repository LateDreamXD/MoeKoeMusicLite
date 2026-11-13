import { type MoeKoeSettings } from '@latedream/moekoe-latelib-types';
import path from 'tjs:path';

let apiProcess: null | tjs.Process = null;

const streamToConsole = async (reader: ReadableStreamDefaultReader<Uint8Array<ArrayBufferLike>>, prefix: string) => {
	const decoder = new TextDecoder();
	while(true) {
		const { value, done } = await reader.read();
		if(done) break;
		console.log(prefix + decoder.decode(value));
	}
}

export const startApiService = async (app: TinyApp, settings: MoeKoeSettings) => {
	const dir = (await app.paths()).executables!;
	const exe = path.join(dir, tjs.env.OS === 'Windows_NT'? 'api.exe': 'api');
	const args = [
		exe, '--port=9430', `--platform=${settings.dataSource === 'concept'? 'lite': ''}`,
		`--proxy=${settings.proxyUrl || ''}`
	];
	apiProcess = tjs.spawn(args, { stderr: 'pipe', stdin: 'ignore', stdout: 'pipe' });

	const stdoutReader = apiProcess.stdout!.getReader()!;
	const stderrReader = apiProcess.stderr!.getReader()!;
	
	Promise.all([
		streamToConsole(stdoutReader, '[API输出] '),
		streamToConsole(stderrReader, '[API出错] '),
		apiProcess.wait(),
	]).then(([,, status]) => {
		console.error('api 意外退出', status);
		app.quit();
	});
}