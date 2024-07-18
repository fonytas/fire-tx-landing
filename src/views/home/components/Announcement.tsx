import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";

export const Announcement = () => {
  return (
    <Callout.Root size="1">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        ตอนนี้ระบบตั้งเวลาทำงานผิดปกติ ไม่หยุดให้ตามเวลาที่กำหนด
        หากไม่สามารถหยุดได้ให้กดปุ่ม Terminate ทันที ไม่ว่าจะมี pending
        ขึ้นหรือไม่ก็ตาม
      </Callout.Text>
    </Callout.Root>
  );
};
