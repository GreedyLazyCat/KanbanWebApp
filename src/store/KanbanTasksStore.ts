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
                row: 2
            },
            {
                id: 2,
                kanbanId: 1,
                type: KanbanTaskType.underReview,
                title: "todo",
                body: "Some task body text lalalala",
                important: true,
                urgent: false,
                row: 1
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
    actions: {
        updateTaskRow(taskToUpdate: KanbanTask, taskRow: number, taskType: KanbanTaskType) {
            const oldTaskType = taskToUpdate.type
            let row = 1
            let insertionRow = 1
            taskToUpdate.type = taskType
            taskToUpdate.row = taskRow

            for (let task of this.tasks) {
                if (task.type === oldTaskType && oldTaskType !== taskType)
                    task.row = row++
                if (task.id === taskToUpdate.id) {
                    insertionRow += 1
                    continue
                }
                if (task.type === taskType) {

                    insertionRow += 1
                }

                console.log(`task row ${task.row} task id ${task.id}`)
            }
        },
        // updateTaskById()
    },
    getters: {
        getTodoByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.todo
            ).sort((a, b) => a.row - b.row)
        },
        getInProgressByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.inProgress
            ).sort((a, b) => a.row - b.row)
        },
        getUnderReviewByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.underReview
            ).sort((a, b) => a.row - b.row)
        },
        getDoneByKanban(state) {
            return (id: number) => state.tasks.filter((p) =>
                p.kanbanId === id && p.type === KanbanTaskType.done
            ).sort((a, b) => a.row - b.row)
        }
    }
})