<script lang="ts">
	import { Handle, Position, useSvelteFlow, type NodeProps } from '@xyflow/svelte';
	import NodeTypePicker from '../ui/node-type-picker/NodeTypePicker.svelte';
	let { id, type }: NodeProps = $props();
	let { updateNodeData } = useSvelteFlow();
</script>

<div
	class="max-h-[400px] w-full max-w-[500px] min-w-[300px] divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-md"
>
	<div class="flex items-center justify-between p-3">
		<NodeTypePicker {id} {type} />
	</div>
	<div class="nodrag nowheel rounded-b-xl bg-gray-50">
		<!-- <MarkdownEditor {carta} bind:value /> -->
		<textarea
			oninput={(e) => updateNodeData(id, { content: (e.target as HTMLTextAreaElement).value })}
			class="h-full w-full resize-none p-3 font-mono focus:outline-none"
			placeholder="Type your content here..."
		></textarea>
	</div>

	<Handle type="source" position={Position.Right} class="custom-handle" style="top:32px" />
</div>
