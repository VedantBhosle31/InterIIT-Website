import trumio from "@/assets/logos/trumio.svg";
import jlr from "@/assets/logos/jlr.png";
import worldquant from "@/assets/logos/wq.png";
import devrev from "@/assets/logos/devrev.svg";
import zelta from "@/assets/logos/zelta.svg";
import aptos from "@/assets/logos/aptos.svg";
import mphasis from "@/assets/logos/mphasis.svg";
import adobe from "@/assets/logos/adobe.svg";
import interiit from "@/assets/logo_light.svg";
import cert from "@/assets/logos/cert.png";
import solinas from "@/assets/logos/solinas.png";
import igdc from "@/assets/logos/igdc.png";
import tessellate from "@/assets/logos/tessellate.png";
import ministry from "@/assets/logos/ministry.svg";
import { StaticImageData } from "next/image";

interface PsDetails {
  desc: string;
  file: string;
  image: StaticImageData;
  width?: number;
  smallLogo?: boolean;
}

export const highPrepPsDetails: PsDetails[] = [
  {
    desc: "University Project Ecosystem Challenge",
    file: "https://drive.google.com/file/d/1coFTnvn7q8ZAJD5ZZX0cJ8DFwCiAdEXc/view",
    image: trumio,
  },
  {
    desc: "Chiplet Challenge",
    file: "https://drive.google.com/file/d/1-7HajASd57Fi_u16Nf9oi-UrGmbypuPy/view",
    image: jlr,
  },
  {
    desc: "Quantitative Analysis Challenge",
    file: "https://drive.google.com/file/d/1W0ISeYd-ug8xlR8qihbYjk2mCKKyDXjo/view",
    image: worldquant,
  },
  {
    desc: "AI Agent 007: Tooling up for Success",
    file: "https://drive.google.com/file/d/1ygpAuuQeLh2ul-Y1Uf6L36jnYEJgJj5p/view",
    image: devrev,
  },
];
export const midPrepPsDetails: PsDetails[] = [
  {
    desc: "Crypto Trading Challenge",
    file: "https://drive.google.com/file/d/1OThxMiQabORyAugw7wknSB7FnI4MmnDJ/view",
    image: zelta,
  },
  {
    desc: "Blockchain Challenge",
    file: "https://drive.google.com/file/d/1f6THCSgFd6nZHq7Vc410VX60d8EfeEDo/view",
    image: aptos,
  },
  {
    desc: "Quantum Computing Challenge",
    file: "https://drive.google.com/file/d/1Ppkx6Iz7R2zpg1qSGHCDRIupKZ-0LBpM/view",
    image: mphasis,
  },
  {
    desc: "Behaviour Simulation Challenge",
    file: "https://drive.google.com/file/d/1ih79ljcUkxUaSa7nIvC73I5rjN5zMsw5/view",
    image: adobe,
  },
];
export const lowPrepPsDetails: PsDetails[] = [
  {
    desc: "Engineers' Conclave",
    file: "https://drive.google.com/file/d/1Ga978B1vrh3ScvqszOvtcqIMtNnWtzcj/view",
    image: interiit,
  },
  {
    desc: "Students' Academic Conference",
    file: "https://drive.google.com/file/d/1FvKcUlzhvb511Qx8DpkO6309f_uJ1oLA/view",
    image: interiit,
  },
  {
    desc: "Cybersecurity Challenge",
    file: "https://drive.google.com/file/d/1tmoJHbsxHLlnadubyV7SefaiRtC6ehoh/view",
    image: cert,
  },
  {
    desc: "Product Design Challenge",
    file: "https://drive.google.com/file/d/1mYgTrBes43kHaule1cHYYvxRPbjwThyv/view",
    image: solinas,
  },
  {
    desc: "Game-Dev Challenge",
    file: "https://drive.google.com/file/d/1zXJrncflmuR0WxRwsOeT9KnMsGLBjAIN/view",
    image: igdc,
    smallLogo: true,
  },
  {
    desc: "Math Challenge",
    file: "https://drive.google.com/file/d/1ZbjBzZ3ikOzWzHIrv6w4g_MocBDbe4g6/view",
    image: tessellate,
    width: 100,
  },
  {
    desc: "Drone Software Challenge",
    file: "https://drive.google.com/file/d/11Q4bw-f0hLhw-LwPTwInE4MrNvTr013G/view",
    image: ministry,
  },
];
