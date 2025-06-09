<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	import { useSvelteFlow, Handle, Position, NodeResizer } from '@xyflow/svelte';
	import { Completion } from '@ai-sdk/svelte';
	import { onMount } from 'svelte';
	import { MessageCircle, Copy } from '@lucide/svelte';

	let { updateNodeData } = useSvelteFlow();

	let { id, data, selected } = $props();

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

	onMount(() => {
		completion.complete(data.prompt);
	});

	function copy() {
		navigator.clipboard.writeText(completion.completion);
	}
</script>

<div
	class="w-full h-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-md"
>
	<Handle type="target" position={Position.Left} />
	<div class="flex items-center justify-between border-b border-neutral-200 p-3">
		<button
			class="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm shadow"
		>
			<MessageCircle class="h-4 w-4" />
			Answer</button
		>
	</div>

	<div class="nodrag nowheel flex-grow overflow-y-auto p-3">
		{#if !completion.completion}
			<div class="flex items-center gap-2 text-gray-400">
				<div class="loader"></div>
				<span>Loading model</span>
			</div>
		{:else}
			<div class="prose">
				<SvelteMarkdown source={completion.completion} />
			</div>
		{/if}
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
<NodeResizer
	isVisible={selected}
	minWidth={300}
	maxWidth={600}
	minHeight={140}
	maxHeight={800}
	color="#4480FF"
	class="rounded-4xl"
	handleStyle="width: 14px; height: 14px; background: rgb(255, 64, 0); border-radius: 8px; border: 2px solid white;"
/>