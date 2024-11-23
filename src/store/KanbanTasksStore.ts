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
                console.log(`task id ${task.id}`)
                if (task.id === taskToUpdate.id) {
                    insertionRow += 1
                    continue
                }
                if (task.type !== taskType)
                    continue
                task.row = insertionRow++
                // if (task.row >= taskRow) {
                //     task.row = task.row + 1
                // }
                // else if (task.row < taskRow) {
                //     task.row = task.row - 1
                // }

                console.log(`task row ${task.row} task id ${task.id}`)
            }
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