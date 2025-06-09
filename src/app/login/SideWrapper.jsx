export default function SideWrapper({ heading, rotate }) {
    let backRot=0
    if(rotate){
        backRot=180;
    }
  return (
    <div className=" flex-1 flex flex-col justify-end px-6 py-24  h-[calc(100% - 4em)] m-4 text-[var(--color-primary-1-darker)] rounded-2xl relative overflow-clip">
      
      <h6 className=" relative z-10">WorkTrack</h6>
      <h2 className=" relative z-10">{heading}</h2>
      <img className=" h-full w-full absolute top-0 left-0 z-0"
        style={{
          transform: `rotate(${backRot}deg)`,
        }}
        src="/singupimage.jpg"
      />
    </div>
  );
}
