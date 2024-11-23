import type { KanbanTask } from "@/store/KanbanTasksStore";
import type { InjectionKey } from "vue";

export interface DragState{
    task: KanbanTask | null
    element: HTMLElement | null
    
}

export const dragStateKey = Symbol() as InjectionKey<DragState>