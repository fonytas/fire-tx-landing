import { DisplayJob } from "@/types/ui";
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { FC, useState } from "react";
import dayjs from "dayjs";
import {
  ArrowDownIcon,
  BookmarkFilledIcon,
  CaretDownIcon,
  CaretUpIcon,
  DotFilledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { getTimeDifference } from "@/helpers/time";
interface JobCardProps {
  job: DisplayJob;
}

function shortenUUID(id: string) {
  const space = 7;
  if (id.length < 12) return id;
  return id.slice(0, space) + "..." + id.slice(id.length - space, id.length);
}

export const JobCard: FC<JobCardProps> = ({ job }) => {
  const [expand, setExpand] = useState<boolean>(false);
  function toggleExpand() {
    setExpand(!expand);
  }
  function status(job: DisplayJob) {
    const makeStatusLabel = (
      color: "indigo" | "red" | "mint" | "green" | "gray" | undefined,
      label: string
    ) => {
      return {
        color,
        label,
      };
    };
    const errorCase = makeStatusLabel("red", "Error");
    switch (job.status) {
      case "pending":
        return makeStatusLabel("indigo", "Pending...");

      case "done":
        if (job.errors.length) {
          return errorCase;
        }
        return makeStatusLabel("mint", "Complete");
      case "exited":
        if (job.errors.length) {
          return errorCase;
        }
        return makeStatusLabel("mint", "Exited");
      case "error":
        return errorCase;
      default:
        return makeStatusLabel("gray", "-");
    }
  }
  return (
    <Card
      size="2"
      style={{
        backgroundColor: "#00000000",
      }}
    >
      <Flex justify="between">
        <div>
          <Flex align="center" gap="2">
            <Text size="5">
              <BookmarkFilledIcon color={job.color} />
            </Text>
            <Heading size="1">{job.name}</Heading>
          </Flex>
        </div>
        <div>
          <Badge
            className="ibm-mono"
            color={status(job).color}
            style={{
              fontWeight: 700,
            }}
            radius="full"
            size="2"
            variant="surface"
          >
            {status(job).label}
          </Badge>
        </div>
      </Flex>
      <Box>
        <Text size="1" color="gray" as="p" mb="3">
          {getTimeDifference(job.date)}
        </Text>

        {expand ? (
          <DataList.Root size="1">
            <DataList.Item align="start">
              <DataList.Label>ID</DataList.Label>
              <DataList.Value>
                <Code highContrast size="1" variant="ghost">
                  {shortenUUID(job.id)}
                </Code>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="start">
              <DataList.Label>Since</DataList.Label>
              <DataList.Value>
                <Text size="1">
                  {dayjs(job.date).format("DD/MM/YYYY HH:mm:ss")}
                </Text>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="start">
              <DataList.Label>Type</DataList.Label>
              <DataList.Value>{job.type}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="start">
              <DataList.Label>Params</DataList.Label>
              <DataList.Value>
                {Object.keys(job.params).map((paramName: string) => (
                  <Text as="div">
                    <Code variant="ghost">{paramName}</Code>:
                    <Code size="1" ml="3">
                      {job.params[paramName]}
                    </Code>
                  </Text>
                ))}
              </DataList.Value>
            </DataList.Item>

            <DataList.Item align="start">
              <DataList.Label>Children</DataList.Label>
              <DataList.Value>
                <Flex direction="column" gap="3">
                  {job.children.map((p: { [key: string]: any }, index) => {
                    const process = Object.keys(p).map((paramName: string) => (
                      <>
                        <Text
                          as="div"
                          key={`${job.id}-child-process-${index}-${paramName}`}
                        >
                          <Code variant="ghost">{paramName}</Code>:
                          <Code size="1" ml="3">
                            {p[paramName]}
                          </Code>
                        </Text>
                      </>
                    ));
                    return (
                      <Card key={`${job.id}-child-process-${index}`}>
                        {process}
                      </Card>
                    );
                  })}
                </Flex>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        ) : null}

        {expand ? (
          <Flex direction="column" gap="3" mt="3">
            {job.errors.map((err, index) => (
              <Callout.Root
                color="red"
                role="alert"
                size="1"
                key={`${job.id}-error-${index}`}
              >
                <Callout.Icon>
                  <ExclamationTriangleIcon />
                </Callout.Icon>
                <Callout.Text size="1">{err.slice(0, 250)}...</Callout.Text>
              </Callout.Root>
            ))}
          </Flex>
        ) : null}
      </Box>
      <Flex justify="center" mt="10px">
        <Button
          color="gray"
          variant="ghost"
          size="1"
          style={{
            width: "100%",
          }}
          onClick={toggleExpand}
        >
          <Flex align="center">
            {expand ? (
              <>
                <CaretUpIcon />
                Hide
              </>
            ) : (
              <>
                <CaretDownIcon />
                More
              </>
            )}
          </Flex>
        </Button>
      </Flex>
    </Card>
  );
};
