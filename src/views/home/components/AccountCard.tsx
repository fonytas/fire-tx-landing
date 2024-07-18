import { fetchBalanceInterval } from "@/config/env";
import { useSelectList } from "@/context/select-list";
import { MulticastApi } from "@/lib/api";
import { rpcProvider } from "@/lib/eth";
import { DisplayAccount } from "@/types/ui";
import { ArrowTopRightIcon, CopyIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Code,
  Flex,
  Heading,
  HoverCard,
  ScrollArea,
  Separator,
  Skeleton,
  Table,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { formatUnits } from "ethers";
import { FC, useEffect, useState } from "react";

interface AccountCardProps {
  api: MulticastApi;
}

const bigIntToEther = (b: bigint): number => {
  return parseFloat(formatUnits(b, 18));
};

const shortenAddress = (address: string) => {
  if (address.length < 6) return address;
  return (
    address.slice(0, 6) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};

const sharedHoverCardProps = {
  size: "1" as "1",
  variant: "soft" as "soft",
  color: "gray" as "gray",
  radius: "full" as "full",
};

export const AccountCard: FC<AccountCardProps> = ({ api }) => {
  const [accounts, setAccounts] = useState<DisplayAccount[] | null>(null);
  const { list, add, remove, addMany, removeMany } = useSelectList();
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const handleCopyAddress = (content: string) => {
    copyToClipboard(content);
  };

  const copyToClipboard = (text: string): void => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          console.log("Text copied to clipboard");
        },
        (err) => {
          console.error("Failed to copy text to clipboard", err);
        }
      );
    } else {
      console.error("Clipboard API not supported");
    }
  };

  async function fetchData() {
    const results: DisplayAccount[] = [];
    const list = await api.accounts();
    for (const each of list) {
      const balance = await rpcProvider.getBalance(each);
      results.push({
        address: each,
        balance,
      });
    }
    setAccounts(results);
  }

  useEffect(() => {
    fetchData();
    const intv = setInterval(() => {
      fetchData();
    }, fetchBalanceInterval());
    return () => clearInterval(intv);
  }, []);

  useEffect(() => {
    if (accounts === null) {
      return;
    }
    if (selectAll) {
      addMany(accounts.map((e) => e.address))
    } else {
      removeMany(accounts.map((e) => e.address))
    }
  }, [selectAll]);

  return (
    <Box>
      <Box mb="5">
        <Heading size="3">
          {api.name} Accounts{"  "}
          <Skeleton loading={accounts === null}>
            <Text>({accounts?.length})</Text>
          </Skeleton>
        </Heading>
      </Box>
      <ScrollArea
        style={{
          height: "400px",
        }}
      >
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                <Flex align="center" direction="row" gap="2">
                  <Checkbox
                    size="3"
                    checked={selectAll}
                    onCheckedChange={(c) =>
                      c ? setSelectAll(true) : setSelectAll(false)
                    }
                  />
                  <Text></Text>
                </Flex>
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>#</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Balance</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {accounts?.map((a, i) => {
              const inList = list.includes(a.address);
              return (
                <Table.Row>
                  <Table.Cell width="40px">
                    <Checkbox
                      size="3"
                      checked={inList}
                      onCheckedChange={(c) => {
                        if (c) {
                          add(a.address);
                        } else {
                          remove(a.address);
                        }
                      }}
                    />
                  </Table.Cell>
                  <Table.RowHeaderCell width="40px">{i + 1}</Table.RowHeaderCell>
                  <Table.Cell>
                    <HoverCard.Root>
                      <HoverCard.Trigger>
                        <Code
                          variant="ghost"
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {shortenAddress(a.address)}
                        </Code>
                      </HoverCard.Trigger>
                      <HoverCard.Content maxWidth="300px" size="1">
                        <Box mb="2">
                          <Code variant="ghost" color="mint" weight="bold">
                            {shortenAddress(a.address)}
                          </Code>
                          <Separator size="4" mt="1" />
                        </Box>

                        <Flex gap="2">
                          <Button
                            {...sharedHoverCardProps}
                            onClick={() => handleCopyAddress(a.address)}
                          >
                            Copy <CopyIcon />
                          </Button>
                          <a href="#">
                            <Button {...sharedHoverCardProps}>
                              Explorer <ArrowTopRightIcon />
                            </Button>
                          </a>
                        </Flex>
                      </HoverCard.Content>
                    </HoverCard.Root>
                  </Table.Cell>
                  <Table.Cell>{bigIntToEther(a.balance).toFixed(4)}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </ScrollArea>
    </Box>
  );
};
