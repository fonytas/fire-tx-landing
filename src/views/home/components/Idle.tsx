import { useJob } from "@/context/job";
import { multicastApis } from "@/lib/api";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";

export const IdleMode = () => {
  const { jobs } = useJob();
  const [loading, setLoading] = useState(false);
  if (jobs === null) {
    return null;
  }
  const pendingIdleJobs = jobs.filter(
    (each) => each.type === "idle" && each.status === "pending"
  );
  function tmpLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }
  return (
    <Card size="3">
      <Flex justify="between" align="center">
        <Box>
          <Heading size="6" className="ibm-mono">
            {"Idle Mode".toUpperCase()}
          </Heading>
          <Text color="gray" size="2">
            Enable low tps transaction sender. Idle mode can last up to 1 hour.
          </Text>
        </Box>
        <Flex align="center" gap="3">
          <Button
            className="ibm-mono"
            size="3"
            variant="soft"
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            loading={loading}
            onClick={async () => {
              tmpLoading();
              for (const api of multicastApis) {
                // not all multicast api enable idle mode
                try {
                  await api.idle();
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            disabled={pendingIdleJobs.length > 0}
          >
            {pendingIdleJobs.length > 0 ? "Idling..." : "Enable"}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
