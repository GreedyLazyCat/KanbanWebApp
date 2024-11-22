import { defineStore } from "pinia";

export enum KanbanTaskType {
    todo,
    inProgress,
    underReview,
    done
}

export interface KanbanTask {
    id: number
    kanbanId: number
    title: string
    body: string
    important: boolean
    urgent: boolean
    type: KanbanTaskType
    row: number
}

export const useKanbanTasksStore = defineStore('kanbanTasks', {
    state: function () {
        return {
            tasks: [{
                id: 0,
                kanbanId: 1,
                type: KanbanTaskType.todo,
                title: "todo",
                body: "Some task body text lalalala",
                important: true,
                urgent: false,
                row: 1
            },
            {
                id: 1,
                kanbanId: 1,
                type: KanbanTaskType.underReview,
                title: "todo",
                body: "Some task body text lalalala",
                important: true,
                urgent: false,
                row: 1
            },
            {
                id: 2,
                kanbanId: 1,
                type: KanbanTaskType.underReview,
                title: "todo",
                body: "Some task body text lalalala",
                important: true,
                urgent: false,
                row: 2
            },
            {
                id: 3,
                kanbanId: 1,
                type: KanbanTaskType.underReview,
                title: "todo",
                body: "Some task body text lalalala",
                important: true,
                urgent: false,
                row: 3
            } 
            ] as KanbanTask[]
        }
    },
    getters: {
        getTodoByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.todo
            )
        },
        getInProgressByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.inProgress
            )
        },
        getUnderReviewByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.underReview
            )
        },
        getDoneByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.done
            )
        }
    }
})