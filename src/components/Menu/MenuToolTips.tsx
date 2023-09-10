import Image from "next/image";
export const FinderTipComponent = (
  <div className="flex justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="tooltip absolute z-10 inline-block max-w-xs rounded-lg rounded-t-none bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm"
      style={{
        animation: "pullDownTop 0.3s forwards",
      }}
    >
      Find your ideal program by filtering our listings however you want
      <div className="mt-2 overflow-hidden rounded">
        <Image
          src="/Program-Finder.png"
          alt="Program Finder - Act. Sing. Dance. Repeat."
          width={500}
          height={200}
        />
      </div>
    </div>
  </div>
);

export const MobileFinderTipComponent = (
  <div className="flex justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="tooltip inline-block rounded-lg rounded-t-none px-3 pb-3 text-center text-base font-medium shadow-sm"
    >
      Find your ideal program by filtering our listings however you want
      <div className="mb-2 mt-6 overflow-hidden rounded border-2 border-indigo-200">
        <Image
          src="/Program-Finder.png"
          alt="Program Finder - Act. Sing. Dance. Repeat."
          width={500}
          height={200}
        />
      </div>
    </div>
  </div>
);

export const DirectoryTipComponent = (
  <div className="flex justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="absolute z-10 inline-block max-w-xs rounded-lg rounded-t-none bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm"
      style={{
        animation: "pullDownTop 0.3s ease-in-out forwards",
      }}
    >
      Directory of performace programs in Canada
      <div className="mt-2 overflow-hidden rounded">
        <Image
          src="/Program-Directory.png"
          alt="Program Directory - Act. Sing. Dance. Repeat."
          width={500}
          height={200}
        />
      </div>
    </div>
  </div>
);

export const MobileDirectoryTipComponent = (
  <div className="flex justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="tooltip inline-block rounded-lg rounded-t-none px-3 pb-3 text-center text-base font-medium shadow-sm"
    >
      Directory of performace programs in Canada
      <div className="mb-2 mt-6 overflow-hidden rounded border-2 border-indigo-200">
        <Image
          src="/Program-Directory.png"
          alt="Program Directory - Act. Sing. Dance. Repeat."
          width={500}
          height={200}
        />
      </div>
    </div>
  </div>
);

export const ProgramsTipComponent = (
  <div className="flex justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="absolute z-10 inline-block max-w-xs rounded-lg rounded-t-none bg-gradient-to-b from-[#edfeff] to-[#6db6b9] px-3 py-7 text-center text-base font-medium text-cyan-950 shadow-sm"
      style={{
        animation: "pullDownTop 0.3s ease-in-out forwards",
      }}
    >
      Your personal list of saved programs (Sign In Required)
    </div>
  </div>
);

export const MobileProgramsTipComponent = (
  <div className="flex h-24 justify-center">
    <div
      id="tooltip-bottom"
      role="tooltip"
      className="tooltip  inline-block w-full rounded-lg px-5 pb-3 text-center text-base font-medium shadow-sm"
    >
      <div className="flex flex-col">
        <span>Your personal list of saved programs</span>
        <span>(Sign In Required)</span>
      </div>
    </div>
  </div>
);
