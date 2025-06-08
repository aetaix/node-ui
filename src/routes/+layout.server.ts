import ollama from 'ollama';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	try {
		const models = await ollama.list();
		if (models) {
			return {
				models
			};
		} 
	} catch (error) {
		console.log(error);
	}
};
