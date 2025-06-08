<script lang="ts">
	import {
		useNodes,
		useEdges,
		useNodeConnections,
		Handle,
		Position,
		// useNodesData,
		// useInternalNode,
		useSvelteFlow,
		type NodeProps
	} from '@xyflow/svelte';
	import { ArrowUp } from '@lucide/svelte';
	// Components
	import ModelPicker from '$lib/components/ui/model-picker/ModelPicker.svelte';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';

	// Data
	let { updateNodeData } = useSvelteFlow();
	const sources = useNodeConnections({ handleId: 'sources', handleType: 'target' });
	let { id, type, data, positionAbsoluteX, positionAbsoluteY }: NodeProps = $props();

	// Node functions
	const nodes = useNodes();
	const edges = useEdges();

	function generate(e: Event) {
		e.preventDefault();
		const newId = crypto.randomUUID();

		let system = data.system;
		let prompt = '';

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

		prompt += data.prompt;

		const newNode = {
			id: newId,
			type: 'response',
			position: { x: positionAbsoluteX + 350, y: positionAbsoluteY },
			data: { system, model: data.model, prompt }
		};

		const newEdge = {
			id: crypto.randomUUID(),
			source: id,
			target: newId
		};
		nodes.set([...nodes.current, newNode]);
		edges.set([...edges.current, newEdge]);
	}
</script>

<div
	class="max-w-[500px] min-w-[300px] divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>

	<div class="p-3">
		<ModelPicker {id} />
	</div>

	<div class="p-3">
		<Handle id="sources" type="target" position={Position.Left} class="custom-handle" />
		{sources.current?.length > 0 ? sources.current.length + ' sources' : 'No sources'}
	</div>
	<form class="p-3" onsubmit={generate}>
		<textarea
			onkeydown={(e) => {
				if (e.key === 'Enter' && !e.shiftKey) {
					generate(e);
				}
			}}
			oninput={(e) => updateNodeData(id, { prompt: (e.target as HTMLTextAreaElement).value })}
			class="nodrag w-full border-none focus:outline-none"
			rows="4"
			placeholder="Enter your prompt here"
		></textarea>
		<div class="flex justify-end">
			<button
				type="submit"
				class="flex size-8 items-center justify-center rounded-lg bg-black text-white"
			>
				<ArrowUp class="size-5" />
			</button>
		</div>
	</form>
	<Handle id="response" type="source" position={Position.Right} />
</div>
