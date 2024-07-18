import { useSelectList } from "@/context/select-list";
import {
  Box,
  Card,
  Code,
  Heading,
  ScrollArea,
  Section,
  Text,
} from "@radix-ui/themes";

export const AccountSelect = () => {
  const { list } = useSelectList();
  return (
    <Card size="3">
      <Heading size="5">Selected accounts ({list.length})</Heading>
      <ScrollArea type="auto">
        <Box py="4">
          <Text>
            <Code variant="ghost">{list.join(",")}</Code>
          </Text>
        </Box>
      </ScrollArea>
    </Card>
  );
};
