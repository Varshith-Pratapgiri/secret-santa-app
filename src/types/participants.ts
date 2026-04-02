export type Participant = {
  id: string;
  name: string;
}

export type Pair = {
  giver: Participant;
  receiver: Participant;
};