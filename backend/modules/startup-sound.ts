import path from 'tjs:path';

const sounds = [
	'/sounds/yise-jp.mp3',
	'/sounds/qiqi-jp.mp3',
	'/sounds/qiqi-zh.mp3'
];

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const playStartupSound = async (app: TinyApp, index?: number) => {
	index = index || random(0, 2);
	const basePath = (await app.paths()).resources;
	await app.audio.sampler.load('startup', [basePath, sounds[index]].join(path.sep));
	const { stop } = await app.audio.sampler.play('startup', { vol: 0.5 });
	await new Promise(res => setTimeout(res, 3000));
	stop();
	app.audio.sampler.unload('startup');
}