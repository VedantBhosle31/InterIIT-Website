import { useRouter } from "next/navigation";

interface ps {
  ps_id: string;
  name: string;
  content: string;
  psType: string;
  isRegistered: string;
}

const Box = ({ name, description, ps_id }: any) => {
  let router = useRouter();
  return (
    <div
      className="bg-white p-4 rounded-md shadow-md w-1/4 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
        const params = new URLSearchParams();
        params.append("id", `${ps_id}`);
        params.append("name", `${name}`);
        router.push(`admin/contention?${params.toString()}`);
      }}
    >
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const PsGrid = (props: any) => {
  let lowPrep: ps[] = [];
  let midPrep: ps[] = [];
  let highPrep: ps[] = [];
  let noPrep: ps[] = [];
  Array.from(props.psData).map((item: any, index: any) => {
    if (item.psType == "HIGH") highPrep.push(item);
    else if (item.psType == "MID") midPrep.push(item);
    else if (item.psType == "LOW") lowPrep.push(item);
    else if (item.psType == "NO") noPrep.push(item);
  });
  return (
    <div className="mt-7">
      <h1 className="text-2xl text-slate-800 font-bold mb-4">High Prep</h1>
      <div className="flex flex-col">
        <div className="flex justify-start gap-3">
          {highPrep.map((item: any, index: any) => {
            return (
              <Box
                key={index}
                name={item.name}
                description={item.content}
                ps_id={item.id}
              />
            );
          })}
        </div>
      </div>

      <br></br>
      <br></br>

      <h1 className="text-2xl font-bold text-slate-800 mb-4">Mid Prep</h1>
      <div className="flex justify-start space-x-4">
        {midPrep.map((item: any, index: any) => {
          return (
            <Box
              key={index}
              name={item.name}
              description={item.content}
              ps_id={item.id}
            />
          );
        })}
      </div>

      <br></br>
      <br></br>

      <h1 className="text-2xl font-bold text-slate-800 mb-4">Low Prep</h1>
      <div className="flex flex-col">
        <div className="flex justify-start gap-3">
          {lowPrep.map((item: any, index: any) => {
            return (
              <Box
                key={index}
                name={item.name}
                description={item.content}
                ps_id={item.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PsGrid;
