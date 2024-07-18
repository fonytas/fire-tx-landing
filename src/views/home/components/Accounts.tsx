import { multicastApis } from "@/lib/api";
import { Box, Grid, Section } from "@radix-ui/themes";
import { AccountCard } from "./AccountCard";
import { SelectListProvider } from "@/context/select-list";
import { AccountSelect } from "./AccountSelect";

export const Accounts = () => {
  return (
    <Box>
      <SelectListProvider>
        <Grid
          columns={{
            initial: "1",
            xs: "1",
            sm: "2",
          }}
          gap="3"
        >
          {multicastApis.map((api, index) => {
            return (
              <AccountCard api={api} key={`api-account-${index}-${api.name}`} />
            );
          })}
        </Grid>
        <Section>
          <AccountSelect />
        </Section>
      </SelectListProvider>
    </Box>
  );
};
