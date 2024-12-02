import { randomBytes } from "crypto";

export function generatePUID(prefix: string, totalLength: number = 32): string {
    const randomLength = totalLength - prefix.length - 1;
    if (randomLength <= 0) throw new Error("Prefix too long for desired length");

    const randomPart = randomBytes(Math.ceil(randomLength/2))
        .toString("hex")
        .slice(0, randomLength);

    return `${prefix}_${randomPart}`;
}