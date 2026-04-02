import * as XLSX from "xlsx";

import type { Pair } from "../types/participants";

export const exportSecretSantaResults = (pairs: Pair[]) => {

    if (!pairs || pairs.length === 0) {
        throw new Error("Pairs not found");
    }

    const workSheetData = [
        [ "Giver", "Receiver" ],
        ...pairs.map(({ giver, receiver }) => [giver.name, receiver.name])
    ]

    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "Secrect Santa");

    const date = new Date().toISOString().split("T")[0];

    XLSX.writeFile(workBook, `Secret-Santa-Results-${date}.xlsx`);
};