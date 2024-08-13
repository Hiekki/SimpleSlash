import { PermissionFlagsBits } from 'discord-api-types/v10';
import Bitfield, { type BitType } from './Bitfield';

export default class PermissionBitfield extends Bitfield<typeof PermissionFlagsBits> {
    flags = PermissionFlagsBits;
    static all: bigint = Object.values(PermissionFlagsBits).reduce((all, p) => all | p, BigInt(0));

    isAdmin() {
        return this.has(PermissionFlagsBits.Administrator);
    }

    missing(...bits: Array<BitType<typeof PermissionFlagsBits>>) {
        const missing = [];
        for (const bit of bits) {
            if (!this.has(bit)) missing.push(bit);
        }

        return missing;
    }
}
