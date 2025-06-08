# NodeUI

NodeUI is an experimental local web-based user interface designed to revolutionize the way you interact with Large Language Models (LLMs). While most AI interactions today are centered around chat interfaces, NodeUI aims to explore new possibilities.

With NodeUI, you can interact with LLMs using a node-based UI, where cards can be connected to create a flow of information. This approach allows for a more organized and structured interaction with LLMs, opening up new avenues for creativity and efficiency.

Built with SvelteKit, Svelte Flow, [Ollama](https://ollama.ai/), AI SDK, and Tailwind CSS.

> [!WARNING]
> This project is currently in an experimental phase and may contain bugs or undergo significant changes. Use at your own discretion.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
