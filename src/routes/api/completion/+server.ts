import { ollama } from 'ollama-ai-provider';
// import { mistral } from '@ai-sdk/mistral';
import { createMistral } from '@ai-sdk/mistral';
import { MISTRAL_API_KEY } from '$env/static/private';

import { streamText } from 'ai';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY
});

export async function POST({ request }) {
	const { prompt, model, system } = await request.json();

	let provider;

	if (model.provider === 'mistral') {
		provider = mistral(model.name);
	} else if (model.provider === 'ollama') {
		provider = ollama(model.name);
	} else {
		throw new Error('Invalid provider');
	}

	console.log('provider', provider);

	const result = streamText({
		system,
		model: provider,
		prompt
	});

	return result.toDataStreamResponse();
}
