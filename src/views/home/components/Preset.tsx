import { LightningBoltIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  ScrollArea,
  Text,
} from "@radix-ui/themes";

interface CmdPreset {
  name: string;
  concurrent: number;
  number: number;
  rateLimit: number;
}

const cmds: CmdPreset[] = [
  {
    name: "Preset 1",
    concurrent: 1,
    number: 10000,
    rateLimit: 1,
  },

];

export const Preset = () => {
  return (
    <Box>
      <ScrollArea type="auto" style={{ width: "inherit", paddingBottom: "20px" }}>
        <Flex gap="4">
          {cmds.map((each, index) => (
            <Card key={`preset-${index}`} style={{ minWidth: "400px" }}>
              <Flex justify="between">
                <Box>
                  <Heading size="3" mb="3">
                    {each.name}
                  </Heading>
                  <DataList.Root size="2">
                    {Object.keys(each).map((key) => {
                      if (key === "name") return null;
                      const value = (each as any)[key];
                      return (
                        <DataList.Item>
                          <DataList.Label>
                            <Code variant="ghost">{key}</Code>
                          </DataList.Label>
                          <DataList.Value>
                            <Code variant="ghost" color="amber" weight="bold">
                              {value}
                            </Code>
                          </DataList.Value>
                        </DataList.Item>
                      );
                    })}
                  </DataList.Root>
                </Box>
                <Box>
                  <Button size="2">
                    <LightningBoltIcon />
                    <Text weight="bold">Execute</Text>
                  </Button>
                </Box>
              </Flex>
            </Card>
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  );
};
