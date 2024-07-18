import { fetchJobInterval } from "@/config/env";
import { predefinedColors } from "@/helpers/color";
import { multicastApis } from "@/lib/api";
import { DisplayJob } from "@/types/ui";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface JobContext {
  jobs: DisplayJob[] | null;
  pending: number;
}

const defaultContext: JobContext = {
  jobs: null,
  pending: 0,
};

const JobContext = createContext<JobContext>(defaultContext);

interface JobProviderProps {
  children?: any;
}

export const JobProvider: FC<JobProviderProps> = ({ children }) => {
  const [jobs, setJobs] = useState<DisplayJob[] | null>(null);
  async function getAllFromApiInstances(): Promise<DisplayJob[]> {
    const res: DisplayJob[] = [];
    let i = 0;
    for (const api of multicastApis) {
      const jobs = await api.jobs();
      res.push(
        ...jobs.map((j) => ({
          ...j,
          name: api.name,
          date: new Date(j.startedAt),
          color: predefinedColors[i],
        }))
      );
      i++;
    }
    return res.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async function fetch() {
    const j = await getAllFromApiInstances();
    setJobs(j);
  }

  useEffect(() => {
    fetch();
    const intv = setInterval(() => {
      fetch();
    }, fetchJobInterval());
    return () => clearInterval(intv);
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs,
        pending: jobs === null ? 0 : jobs.filter((j) => j.status === "pending").length,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext)