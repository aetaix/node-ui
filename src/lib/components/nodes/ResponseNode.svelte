<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import { useSvelteFlow, Handle, Position } from '@xyflow/svelte';
	import { Completion } from '@ai-sdk/svelte';
	import { onMount } from 'svelte';

	let { updateNodeData } = useSvelteFlow();

	let { id, data } = $props();

	const completion = new Completion({
		api: '/api/completion',

		body: {
			model: data.model,
			system: data.system
		},
		onFinish: (completion) => {
			updateNodeData(id, {
				...data,
				completion: completion
			});
		}
	});

	const carta = new Carta();

	onMount(() => {
		completion.complete(data.prompt);
	});
</script>

<div
	class="w-full max-w-[500px] min-w-[300px] divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<Handle type="target" position={Position.Left} />
	<div class="flex items-center justify-between p-3">
		<button class="rounded-full bg-gray-100 px-3 py-2 text-sm">Answer</button>
	</div>

	<div class="nodrag p-3">
		{#key completion.completion}
			<Markdown {carta} value={completion.completion} />
		{/key}
	</div>
</div>
