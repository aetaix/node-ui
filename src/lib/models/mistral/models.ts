import type { Model } from '$lib/models/types';
export const mistralModels = [
	{
		name: 'mistral-large-latest',
		label: 'Mistral Large',
		provider: 'mistral',
		size: 0,
		digest: '',
		modified_at: new Date('2024-07-10T00:00:00Z'),
		model: 'mistral-large-latest',
		expires_at: new Date('2024-07-10T00:00:00Z'),
		size_vram: 0,
		details: {
			format: '',
			family: 'mistral',
			families: [],
            parent_model: 'mistral',
			parameter_size: '',
			quantization_level: ''
		}
	}
] as Model[];
