
import { create } from 'zustand';
import type { Member } from '../types/global';

// ✅ Fixed TS7006: added explicit parameter type
interface MemberState {
  members: Member[];
  filteredMembers: Member[];
  filterMembers: (searchTerm: string) => void;
}

const useMemberStore = create<MemberState>((set) => ({
  members: [
    { id: 1, name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 2, name: 'Bob Williams', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 3, name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 4, name: 'Diana Miller', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704g' },
  ],
  filteredMembers: [],
  // ✅ Fixed TS7006: added explicit parameter type
  filterMembers: (searchTerm: string) =>
    set((state) => ({
      // ✅ Fixed TS7006: added explicit parameter type
      filteredMembers: state.members.filter((member: Member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    })),
}));

export default useMemberStore;
