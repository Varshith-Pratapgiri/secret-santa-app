
import type { Participant } from "../types/participants.js";

export const mergeUniqueParticipants = (existing: Participant[], incoming: string[]): Participant[] => {
    const existingLower = existing.map((n) => n.name.toLowerCase());
    const uniqueIncoming = incoming
    .map((name) => name.trim())
    .filter((name) => name && !existingLower.includes(name.toLowerCase()))
    .map((name) => ({ id: crypto.randomUUID(), name }));
    return [
        ...existing, 
        ...uniqueIncoming,
    ];
};