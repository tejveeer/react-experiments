import qrCodeImage from "./images/image-qr-code.png";

export default function Screen() {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center bg-slate-300">
        <Modal />
      </div>
    </>
  );
}

function Modal() {
  return (
    <>
      <div className="w-min rounded-[20px] bg-white p-4 pb-[40px] text-[15px] shadow-lg">
        <img
          src={qrCodeImage}
          alt="QR Code"
          className="h-[288px] w-[288px] rounded-[10px]"
        />
        <div className="px-4 text-center">
          <h2 className="my-0 mt-[20px] font-outfit text-[1.32em] text-slate-900">
            Improve your front-end skills by building projects
          </h2>
          <p className="mb-0 mt-4 text-slate-500 font-outfit">
            Scan the QR code to visit Frontend Mentor and take your coding
            skills to the next level
          </p>
        </div>
      </div>
    </>
  );
}
