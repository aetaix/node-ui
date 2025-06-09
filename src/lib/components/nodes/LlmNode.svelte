<script lang="ts">
	import {
		useNodes,
		useEdges,
		useNodeConnections,
		Handle,
		Position,
		NodeResizeControl,
		type NodeProps
	} from '@xyflow/svelte';
	import { ArrowUp } from '@lucide/svelte';

	import ModelPicker from '$lib/components/ui/model-picker/ModelPicker.svelte';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';

	const sources = useNodeConnections({ handleId: 'sources', handleType: 'target' });
	let { id, type, data, positionAbsoluteX, positionAbsoluteY }: NodeProps = $props();

	const nodes = useNodes();
	const edges = useEdges();
	let prompt = $state('');

	function generate(e: Event) {
		e.preventDefault();
		const newId = crypto.randomUUID();

		let system = data.system;

		if (sources.current?.length > 0) {
			sources.current.forEach((source) => {
				const id = source.source;
				const node = nodes.current.find((node) => node.id === id);
				if (!node) return;

				if (node.type === 'system') {
					system += node?.data.content + '\n';
					return;
				}
				const content = node?.data.content;
				console.log('Node content', content);
				prompt += content + '\n';
			});
		}

		const newNode = {
			id: newId,
			type: 'response',
			position: { x: positionAbsoluteX + 350, y: positionAbsoluteY },
			data: { system, model: data.model, prompt, content: '' }
		};

		const newEdge = {
			id: crypto.randomUUID(),
			source: id,
			target: newId,
			animated: true
		};
		nodes.set([...nodes.current, newNode]);
		edges.set([...edges.current, newEdge]);

		prompt = '';
	}
</script>

<div
	class="flex h-full w-full flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>

	<div class="p-3">
		<ModelPicker {id} />
	</div>

	<div class="p-3">
		<Handle
			id="sources"
			type="target"
			class="custom-handle"
			position={Position.Left}
			style="top: 138px; background: #555"
		/>

		{#if sources.current?.length > 0}
			<span class="rounded-full bg-blue-100 px-3 py-2 text-blue-500">
				{sources.current.length} source{sources.current.length > 1 ? 's' : ''}</span
			>
		{:else}
			<span class="text-gray-400">No sources</span>
		{/if}
	</div>
	<form class="flex-gro flex h-full flex-col p-3" onsubmit={generate}>
		<textarea
			onkeydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					generate(e);
				}
			}}
			bind:value={prompt}
			class="nodrag h-full w-full resize-none border-none focus:outline-none"
			placeholder="Enter your prompt here"
		></textarea>

		<div class="flex justify-end">
			{#if prompt || sources.current?.length > 0}
				<button
					type="submit"
					class="flex size-8 items-center justify-center rounded-lg bg-black text-white"
				>
					<ArrowUp class="size-5" />
				</button>
			{:else}
				<button
					type="button"
					class="flex size-8 items-center justify-center rounded-lg bg-gray-200 text-gray-400"
					disabled
				>
					<ArrowUp class="size-5" />
				</button>
			{/if}
		</div>
	</form>
</div>
<Handle id="response" type="source" position={Position.Right} />
<NodeResizeControl minWidth={300} maxWidth={600} minHeight={200} maxHeight={400}
></NodeResizeControl>
