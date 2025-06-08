<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import { useSvelteFlow, Handle, Position } from '@xyflow/svelte';
	import { Completion } from '@ai-sdk/svelte';
	import { onMount } from 'svelte';
	import { Copy } from '@lucide/svelte';

	let { updateNodeData } = useSvelteFlow();

	let { id, data } = $props();

	const completion = new Completion({
		api: '/api/completion',

		body: {
			model: data.model,
			system: data.system
		},
		onFinish: () => {
			updateNodeData(id, {
				...data,
				content: completion.completion
			});
		}
	});

	const carta = new Carta();

	onMount(() => {
		completion.complete(data.prompt);
	});

	function copy() {
		navigator.clipboard.writeText(completion.completion);
	}
</script>

<div
	class="w-full max-w-[500px] min-w-[300px] divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<Handle type="target" position={Position.Left} />
	<div class="flex items-center justify-between p-3">
		<button class="rounded-full bg-gray-100 px-3 py-2 text-sm">Answer</button>
	</div>

	<div class="nodrag nowheel max-h-[300px] overflow-y-auto p-3">
		{#key completion.completion}
			<Markdown {carta} value={completion.completion} />
		{/key}
	</div>
	<div class="flex items-center justify-end p-3">
		<button
			onclick={copy}
			class="flex size-8 items-center justify-center rounded hover:bg-gray-200"
		>
			<Copy class="h-4 w-4" />
		</button>
	</div>

	<Handle type="source" position={Position.Right} class="custom-handle" />
</div>
