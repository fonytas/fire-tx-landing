import { Job } from "./api";

export type DisplayJob = Job & { name: string; date: Date, color?: string };

export type DisplayAccount = {
  address: string;
  balance: bigint;
}