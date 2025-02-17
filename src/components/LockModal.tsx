import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LockModalProps {
  isOpen: boolean;
}

const LockModal = ({ isOpen }: LockModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="bg-[#030816] border-[#20293A]/50 p-6"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="text-white bg-white/10 hover:bg-white/30 hover:text-white"
              onClick={() => (window.location.href = "/")}
            >
              Go Back
            </Button>
          </div>
          <div className="flex justify-center mb-6">
            <img
              src="/assets/images/gold-logo.jpg"
              alt="Gold Logo"
              className="w-[200px] h-auto rounded-full"
            />
          </div>
          <div className="mt-6">
            <p className="text-[#FFFFFF]/80 font-medium">
              Thank you for registering!
            </p>
            <p className="text-[#A1A1AA] mt-1 text-sm">
              Please click the contact us button below and let our team know by
              sending the message: "Gold Registration ". This will help us
              prepare to unlock access to the Net Sentiment feature, which will
              be available starting February.{" "}
            </p>
          </div>
          <div className="mt-6">
            <p className="text-[#FFFFFF]/70 font-medium">
              ขอบคุณสำหรับการลงทะเบียนโปรแกรม!
            </p>
            <p className="text-[#A1A1AA] mt-1 text-sm">
              รบกวนทุกท่านช่วยกดปุ่ม Contact us ด้านล่าง แล้วแจ้งกับทีมงานว่า
              "ลงทะเบียน Gold แล้ว" เพื่อให้ทีมงานพร้อมปลดล็อคการใช้ฟีเจอร์ Net
              Sentiment ในเดือนกุมภาพันธ์ ที่เราพร้อมเปิดให้ใช้งาน
            </p>
          </div>
          <div className="mt-6">
            <Button
              className="w-full h-[50px] rounded-lg bg-[#209CFF] hover:bg-[#209CFF]/80 text-white font-normal"
              onClick={() =>
                window.open("https://m.me/gold.analytics", "_blank")
              }
            >
              Contact us to unlock
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LockModal;
