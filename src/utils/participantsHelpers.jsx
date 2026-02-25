export const removeParticipant = (list, name) => {
    return list.filter((n) => name !== n);
}

export const mergeUniqueParticipants = (existing, incoming) => {
    const existingLower = existing.map((n) => n.toLowerCase());
    return [
        ...existingLower, 
        ...incoming.filter(
            (name) => !existingLower.includes(name.toLowerCase())
        ),
    ];
};