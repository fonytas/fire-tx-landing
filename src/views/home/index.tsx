import { Flex, Section } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";
import { Preset } from "./components/Preset";
import { Content, PageContainer, Sidebar } from "./layouts/PageLayout";
import { Jobs } from "./components/Jobs";
import { Execute } from "./components/Execute";
import { Accounts } from "./components/Accounts";
import { JobProvider } from "@/context/job";
import { IdleMode } from "./components/Idle";
import { DemoMode } from "./components/Demo";
import { Terminate } from "./components/Terminate";
import { Announcement } from "./components/Announcement";

export const HomePage: FC = () => {
  return (
    // <PageContainer>
    //   <Section>
    //     <Grid>
    //       <Column>
    //         <Preset />
    //         <Flex gap="3" my="6">
    //           {casters.map((each) => (
    //             <Card
    //               size="2"
    //               style={{
    //                 width: "300px",
    //               }}
    //             >
    //               <Flex justify="between">
    //                 <div>
    //                   <Heading size="2">{each.name}</Heading>
    //                   <Text size="1" color="gray">
    //                     {each.backendUrl}
    //                   </Text>
    //                 </div>
    //                 <div></div>
    //               </Flex>
    //             </Card>
    //           ))}
    //         </Flex>
    //       </Column>
    //       <Column>2</Column>
    //       <Column>3</Column>
    //     </Grid>
    //   </Section>
    // </PageContainer>
    <JobProvider>
      <PageContainer>
        <Content>
          <Section px="3">
            <Flex direction="column" gap="3">
              {/* <Announcement /> */}
              <Terminate />
              <IdleMode />
              <DemoMode />
              <Execute />
            </Flex>
          </Section>

          <Section px="3">
            <Accounts />
          </Section>
        </Content>
        <Sidebar>
          <Section>
            <Jobs />
          </Section>
        </Sidebar>
      </PageContainer>
    </JobProvider>
  );
};
