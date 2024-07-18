export interface ChildProcess {
  pid: number;
  killed: boolean;
  exitCode: number | null;
}

export interface Job {
  params: {[key: string]: any};
  id: string;
  type: string;
  status: string;
  errors: string[];
  startedAt: string;
  children: ChildProcess[];
}