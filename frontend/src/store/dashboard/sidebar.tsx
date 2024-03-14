import { create } from "zustand";

interface SidebarStore {
    collapsed: boolean;
    expand: () => void;
    collapse: () => void;
    toggle: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    expand: () => set(() => ({ collapsed: false })),
    collapse: () => set(() => ({ collapsed: true })),
    toggle: () => set((state) => ({ collapsed: !state.collapsed })),
}));
