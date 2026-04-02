import * as XLSX from "xlsx";

export const extractNamesFromExcel = async(file: File): Promise<string[]> => {
    if (!file) throw new Error("file not selected");

    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        throw new Error("Please upload a valid file (.xlsx or .xls or .csv)");
    }

    if (file.name.match(/\.(csv)$/i)) {
        const text = await file.text();

        const rows = text.split(/\r?\n/).filter(Boolean);

        const firstColumn = rows
        .map(row => row.split(",")[0]?.trim())
        .filter((val): val is string => Boolean(val))

        return firstColumn;
    }

    const buffer = await file.arrayBuffer();
    const fileData = new Uint8Array(buffer);
    const workBook = XLSX.read(fileData, { type: "array"});

    const sheetName = workBook.SheetNames[0];
    if (!sheetName) {
        throw new Error("No sheets found in excel file");
    }
    const workSheet = workBook.Sheets[sheetName];
    if (!workSheet) {
        throw new Error("Worksheet not found");
    }
    const sheetData: unknown[][] = XLSX.utils.sheet_to_json(workSheet, { header: 1});
    const names: string[] = sheetData 
    .slice(1)
    .map((row) => row[0])
    .filter((cell): cell is string => typeof cell === "string" && cell.trim() !== "")
    .map((name) => name.trim());

    if (names.length === 0) {
        throw new Error("no valid names in excel file");
    }
    return names;
}