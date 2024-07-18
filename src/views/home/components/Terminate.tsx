import { useJob } from "@/context/job";
import { multicastApis } from "@/lib/api";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";

export const Terminate = () => {
  const { pending } = useJob();
  const [loading, setLoading] = useState(false);
  function tmpLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }
  // if (pending === 0) {
  //   return null;
  // }
  return (
    <Card size="3">
      <Flex justify="between" align="center">
        <Box>
          <Heading size="6" className="ibm-mono">{"Terminate jobs".toUpperCase()}</Heading>
          <Text color="gray" size="2">
            Force the {pending} pending casts to stop. This will terminate both
            idle and intense mode.
          </Text>
        </Box>
        <Flex align="center" gap="3">
          <Button
            className="ibm-mono"
            size="3"
            color="red"
            variant="surface"
            loading={loading}
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            onClick={async () => {
              tmpLoading();
              for (const api of multicastApis) {
                await api.terminateAll();
              }
            }}
          >
            🚨 Terminate
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
