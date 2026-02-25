export const shuffleArray = (arr) => {
    const array = [...arr];

    if (array.length < 2) return array;

    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

export const generateSecretSantaPairs = (data) => {

    if (data.length < 2) {
        throw new Error("Atleast 2 pariticpants required");
    }

    const shuffled = shuffleArray(data);

    return shuffled.map((person, index) => {
        const receiver = shuffled[(index + 1) % shuffled.length];
        return { giver: person, receiver};
    });
}