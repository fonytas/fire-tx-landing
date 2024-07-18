import { multicastApis } from "@/lib/api";
import { Job } from "@/types/api";
import { DisplayJob } from "@/types/ui";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { predefinedColors } from "@/helpers/color";
import { useJob } from "@/context/job";

export const Jobs = () => {
  
  const { jobs } = useJob()
  return (
    <Box p="2">
      <Heading size="4" mb="4" className="ibm-mono">
        {"Latest Jobs".toUpperCase()}
      </Heading>
      <Flex direction="column" gap="3">
        {jobs?.map((job) => (
          <JobCard job={job} />
        ))}
      </Flex>
    </Box>
  );
};
