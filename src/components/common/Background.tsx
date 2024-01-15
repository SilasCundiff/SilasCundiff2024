export default function Background({
  backgroundImage,
}: {
  backgroundImage: string;
}) {
  return (
    <div className="absolute inset-0 bg-red-500 -z-10">
      <img
        className="object-top object-cover w-full h-full"
        src={backgroundImage}
      />
    </div>
  );
}
