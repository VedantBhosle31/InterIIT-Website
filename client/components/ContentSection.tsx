import Box from "./Box";
interface ps {
  ps_id: string;
  name: string;
  content: string;
  psType: string;
  isRegistered: string;
  isSacEc?: boolean;
}
export default function ContentSection(props: any) {
  let lowPrep: ps[] = [];
  let midPrep: ps[] = [];
  let highPrep: ps[] = [];
  let noPrep: ps[] = [];
  Array.from(props.data).map((item: any, index: any) => {
    if (item.psType == "HIGH") highPrep.push(item);
    else if (item.psType == "MID") midPrep.push(item);
    else if (item.psType == "LOW") lowPrep.push(item);
    else if (item.psType == "NO") noPrep.push(item);
  });
  return (
    <div className="mt-7">
      <h1 className="text-2xl text-slate-800 font-bold mb-4">High Prep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* <div className="flex justify-start gap-3"> */}
        {highPrep.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              name={item.name}
              description={item.content}
              ps_id={item.id}
              isRegistered={item.registered}
              noOfParticipants={Number(process.env.MAX_HIGH_PREP_PARTICIPANTS)}
            ></Box>
          );
        })}
        {/* </div> */}
      </div>

      <br></br>
      <br></br>

      <h1 className="text-2xl font-bold text-slate-800 mb-4">Mid Prep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {midPrep.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              name={item.name}
              description={item.content}
              ps_id={item.id}
              isRegistered={item.registered}
              noOfParticipants={Number(process.env.MAX_MID_PREP_PARTICIPANTS)}
            ></Box>
          );
        })}
      </div>

      <br></br>
      <br></br>

      <h1 className="text-2xl font-bold text-slate-800 mb-4">Low Prep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {lowPrep.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              name={item.name}
              description={item.content}
              ps_id={item.id}
              isRegistered={item.registered}
              noOfParticipants={Number(
                item.isSacEc
                  ? process.env.MAX_SAC_EC_PARTICIPANTS
                  : process.env.MAX_LOW_PREP_PARTICIPANTS
              )}
            ></Box>
          );
        })}
        {/* <div className=" mt-3 flex justify-start gap-6">
          {noPrep.map((item: any, index: any) => {
            return (
              <Box
                key={index}
                name={item.name}
                description={item.content}
                ps_id={item.id}
                isRegistered={item.registered}
                noOfParticipants={Number(process.env.MAX_NO_PREP_PARTICIPANTS)}
              ></Box>
            );
          })}
        </div> */}
      </div>
    </div>
  );
}
