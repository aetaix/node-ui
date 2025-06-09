import { type ModelResponse } from 'ollama';

export interface Model extends ModelResponse {
    label: string;
    provider: string;
}