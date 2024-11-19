import type { InjectionKey } from "vue";

export interface DragState{
    taskId: number | null
    element: HTMLElement | null
}

export const dragStateKey = Symbol() as InjectionKey<DragState>