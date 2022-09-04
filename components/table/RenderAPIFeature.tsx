const RenderApiFeature = ({ feature }: any) => {
  switch (feature) {
    case 'true':
      return (
        <div className="flex justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
          Yes
        </div>
      );
    case 'false':
      return (
        <div className="flex justify-center w-fit px-2 text-white bg-[#e14545] rounded-lg">
          No
        </div>
      );
    case 'yes':
      return (
        <div className="flex justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
          Yes
        </div>
      );
    case 'no':
      return (
        <div className="flex justify-center w-fit px-2 text-white bg-[#e14545] rounded-lg">
          No
        </div>
      );
    case 'apiKey':
      return (
        <div className="flex justify-center w-fit px-2 text-white bg-[#4845e1] rounded-lg">
          {feature}
        </div>
      );
    case 'OAuth':
      return (
        <div className="flex justify-center w-fit px-2 text-white bg-[#e145d7] rounded-lg">
          {feature}
        </div>
      );
    case '':
      return <div className="flex">-</div>;
    default:
      return feature;
  }
  // if (feature === 'true') {
  //   return (
  //     <div className="flex text-centeritems-center justify-center w-fit px-2 py-1text-whitez bg-[#45e179] rounded-lg">
  //       Yes
  //     </div>
  //   );
  // }
  // return feature;
};

export default RenderApiFeature;
