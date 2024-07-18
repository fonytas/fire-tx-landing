import { useJob } from "@/context/job";
import { multicastApis } from "@/lib/api";
import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";

export const DemoMode = () => {
  const { jobs } = useJob();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  if (jobs === null) {
    return null;
  }
  const pendingIdleJobs = jobs.filter(
    (each) => each.type.startsWith("demo") && each.status === "pending"
  );
  function tmpLoading1() {
    setLoading1(true);
    setTimeout(() => {
      setLoading1(false);
    }, 7000);
  }
  function tmpLoading2() {
    setLoading2(true);
    setTimeout(() => {
      setLoading2(false);
    }, 7000);
  }
  function tmpLoading3() {
    setLoading3(true);
    setTimeout(() => {
      setLoading3(false);
    }, 7000);
  }
  function tmpLoading4() {
    setLoading4(true);
    setTimeout(() => {
      setLoading4(false);
    }, 7000);
  }
  return (
    <Card size="3">
      <Flex justify="between" align="center">
        <Box>
          <Heading size="6" className="ibm-mono">
            {"Demo Mode".toUpperCase()}
          </Heading>
          <Text color="gray" size="2">
            Enable  mode can last up to 1 hour.
          </Text>
        </Box>
        <Flex align="center" gap="3">
          <Button
            className="ibm-mono"
            size="3"
            variant="soft"
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            loading={loading1}
            onClick={async () => {
              tmpLoading1();
              for (const api of multicastApis) {
                try {
                  await api.exec_demo(1);
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            disabled={JSON.stringify(pendingIdleJobs).includes("demo_1")}
          >
            {JSON.stringify(pendingIdleJobs).includes("demo_1") ? "Running Demo 1..." : "Demo 1 ≈ 250"}
          </Button>
          <Button
            className="ibm-mono"
            size="3"
            variant="soft"
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            loading={loading2}
            onClick={async () => {
              tmpLoading2();
              for (const api of multicastApis) {
                try {
                  await api.exec_demo(2);
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            disabled={JSON.stringify(pendingIdleJobs).includes("demo_2")}
          >
            {JSON.stringify(pendingIdleJobs).includes("demo_2") ? "Running Demo 2..." : "Demo 2 ≈ 800"}
          </Button>
          <Button
            className="ibm-mono"
            size="3"
            variant="soft"
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            loading={loading3}
            onClick={async () => {
              tmpLoading3();
              for (const api of multicastApis) {
                try {
                  await api.exec_demo(3);
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            disabled={JSON.stringify(pendingIdleJobs).includes("demo_3")}
          >
            {JSON.stringify(pendingIdleJobs).includes("demo_3") ? "Running Demo 3..." : "Demo 3 ≈ 1500"}
          </Button>
          <Button
            className="ibm-mono"
            size="3"
            variant="soft"
            style={{ fontWeight: 600, textTransform: "uppercase" }}
            loading={loading4}
            onClick={async () => {
              tmpLoading4();
              for (const api of multicastApis) {
                try {
                  await api.exec_demo(4);
                } catch (err) {
                  console.error(err);
                }
              }
            }}
            disabled={JSON.stringify(pendingIdleJobs).includes("demo_4")}
          >
            {JSON.stringify(pendingIdleJobs).includes("demo_4") ? "Running Demo 4..." : "Demo 4 ≈ 2500"}
          </Button>
        </Flex>
      </Flex>
    </Card>
    
  );
};
