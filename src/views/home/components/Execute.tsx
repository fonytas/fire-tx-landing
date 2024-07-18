import { Processing } from "@/components/decorations/Processing";
import { fetchJobInterval } from "@/config/env";
import { useJob } from "@/context/job";
import { multicastApis } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export const Execute = () => {
  const { jobs } = useJob();
  const [minute, setMinute] = useState<string>("");
  const [execButtonConfirming, setExecButtonConfirming] = useState(false);
  function validMinute(minute: string) {
    if (!minute) {
      return 0;
    }
    const m = parseInt(minute);
    if (m > 10 || m < 1) {
      return 0;
    }
    return m;
  }

  async function handleExecute() {
    const jobIds = [];
    const m = validMinute(minute);
    if (m <= 0) {
      alert("Cannot sent request to Multicaster");
    }
    // Do terminate all polygon cli process
    for (const api of multicastApis) {
      await api.terminateAll();
    }
    for (const each of multicastApis) {
      const id = await each.exec(m);
      jobIds.push(id);
    }
    setExecButtonConfirming(true);
    setTimeout(() => {
      setExecButtonConfirming(false);
    }, fetchJobInterval());
  }

  if (jobs === null) {
    return null;
  }

  const intensePending = jobs.filter(
    (e) => e.type === "cast" && e.status === "pending"
  );
  return (
    <Card size="3" style={{
      position: "relative",
    }}>
      <Flex justify="between" align="center" style={{position: "relative", zIndex: 5}}>
        <Box>
          <Heading size="6" className="ibm-mono">
            {"Insane Mode".toUpperCase()}
          </Heading>
          <Text color="gray" size="2">
            Request for a high tps transaction sender for an amount of time
            (around 25k tpb)
          </Text>
        </Box>
      </Flex>
      <Flex justify="center" align="center" p="4" minHeight="300px" wrap="wrap" style={{position: "relative", zIndex: 5}}>
        <div style={{ maxWidth: "660px" }}>
          <Heading
            size="6"
            className={
              "ibm-mono" + (intensePending.length > 0 || true ? "" : "")
            }
            style={{
              textTransform: "uppercase",
            }}
          >
            {intensePending.length > 0
              ? "We are firing transactions... 🔥"
              : execButtonConfirming
              ? "Connecting to Multicasters..."
              : "All good! Ready to go"}
          </Heading>
          <Flex gap="3" my="6">
            <TextField.Root
              color="gray"
              placeholder="Minutes (1-10)"
              variant="soft"
              type="number"
              size="3"
              value={minute}
              onChange={(event) => setMinute(event.target.value)}
            />
            <Button
              className="ibm-mono"
              size="3"
              style={{ fontWeight: 600, textTransform: "uppercase" }}
              loading={execButtonConfirming}
              disabled={
                validMinute(minute) === 0 ||
                execButtonConfirming ||
                intensePending.length > 0
              }
              onClick={handleExecute}
            >
              {intensePending.length > 0 ? "Firing transactions..." : "Fire 🔥"}
            </Button>
          </Flex>
        </div>
        {intensePending.length ? (
          <div>
            <Image alt="nyancat" width={200} height={200} src="/quby-run.gif" />
          </div>
        ) : null}
      </Flex>
      <div
        className={intensePending.length ? "wow-container-2" : ""}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          opacity: 0.2,
        }}
      ></div>
    </Card>
  );
};
