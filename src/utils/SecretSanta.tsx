
type Pair<T> = {
    giver: T;
    receiver: T;
}

export const shuffleArray = <T,>(arr: T[]): T[] => {

    const array = [...arr];

    if (array.length < 2) return array;

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i]!;
        array[i] = array[j]!;
        array[j] = temp;
    }
    return array;
};

export const generateSecretSantaPairs = <T,>(data: T[]): Pair<T>[] => {

    if (data.length < 2) {
        throw new Error("Atleast 2 participants required");
    }
    const shuffled = shuffleArray(data);

    if (shuffled.length === 0) {
        throw new Error("Unexpected empty array");
    }

    return shuffled.map((person, index) => {
        const receiver = shuffled[(index + 1) % shuffled.length] as T;
        
        return {
            giver: person,
            receiver,
        }
    });
}