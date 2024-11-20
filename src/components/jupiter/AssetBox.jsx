import Image from "next/image";

export function AssetBox({ img, amount, name }) {
  const roundedAmount = parseFloat(amount).toFixed(4);
  return (
    <div className="info-box flex items-center justify-center space-x-2">
      <Image
        src={img}
        alt=""
        className="h-6 w-6 rounded-full"
        width={32}
        height={32}
      />
      <div className="font-semibold">{roundedAmount}</div>
      <div className="">{name}</div>
    </div>
  );
}
