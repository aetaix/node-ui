import ollama from 'ollama';
import { type ModelResponse } from 'ollama';
import type { LayoutServerLoad } from './$types';

interface ModelWithLabel extends ModelResponse {
	label: string;
}

export const load: LayoutServerLoad = async () => {
	try {
		const { models } = await ollama.list();
		models.forEach((model) => {
			(model as ModelWithLabel).label = model.name.split(':')[0].replace(/-/g, ' ');
		});

		if (models) {
			return {
				models
			};
		}
	} catch (error) {
		console.log(error);
	}
};
