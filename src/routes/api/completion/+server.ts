import { ollama } from 'ollama-ai-provider';
import { streamText } from 'ai';

export async function POST({ request }) {

	const { prompt, model, system } = await request.json();

	const result = streamText({
		system,
		model: ollama(model),
		prompt
	});

	return result.toDataStreamResponse();
}
