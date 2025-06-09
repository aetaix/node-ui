import ollama from 'ollama';
import type { Model } from '$lib/models/types';
import type { LayoutServerLoad } from './$types';
import { MISTRAL_API_KEY } from '$env/static/private';
import { mistralModels } from '$lib/models/mistral/models';

export const load: LayoutServerLoad = async () => {
	try {
		const { models } = await ollama.list();
		models.forEach((model) => {
			(model as Model).label = model.name.split(':')[0].replace(/-/g, ' ');
			(model as Model).provider = 'ollama';
		});

		if (MISTRAL_API_KEY) {
			models.push(...mistralModels);
		}

		if (models) {
			return {
				models
			};
		}
	} catch (error) {
		console.log(error);
	}
};
