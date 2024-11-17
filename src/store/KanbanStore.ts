import { defineStore } from "pinia";
interface Kanban {
    id: number,
    title: string,
    isNew: boolean
}
export const useKanbanStore = defineStore('kanbans', {
    state: function () {
        return {
            kanbans: [] as Kanban[],
        }
    },
    actions: {
        save() {
            localStorage.setItem("kanbans", JSON.stringify(this.$state.kanbans))
        },
        addKanban(kanban: Kanban) {
            this.$state.kanbans.push(kanban)
            this.save()
        },
        deleteKanban(kanban: Kanban) {
            let toDelete = this.$state.kanbans.findIndex((p) => p.id == kanban.id)
            if (toDelete >= 0) {
                this.$state.kanbans.splice(toDelete, 1)
            }
            this.save()
        },
        editKanban(kanban: Kanban) {
            let index = this.$state.kanbans.findIndex((p) => p.id === kanban.id)
            if (index >= 0) {
                this.$state.kanbans[index] = kanban;
            }
            this.save()
        },
        setKanbans(kanbans: Kanban[]) {
            this.$state.kanbans = kanbans
        }
    }
})