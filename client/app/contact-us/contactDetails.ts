import archish from "@/assets/photos/archish.png";
import prabhat from "@/assets/photos/prabhat.png";
import abhiram from "@/assets/photos/abhiram.png";
import shreya from "@/assets/photos/shreya.png";
import sreeja from "@/assets/photos/sreejaa.png";
import pranit from "@/assets/photos/pranit.png";
import akshat from "@/assets/photos/akshat.png";
import shreepoorna from "@/assets/photos/shreepoorna.png";
import jayanth from "@/assets/photos/jayanth.png";
import tarini from "@/assets/photos/tarini.png";
import arnab from "@/assets/photos/arnab.png";
import { StaticImageData } from "next/image";

export interface ContactDetailsType {
  vertical: string;
  heads: {
    name: string;
    phone: string;
    email: string;
    photo: StaticImageData;
  }[];
}

export const contactDetails: ContactDetailsType[] = [
  {
    vertical: "Convenors",
    heads: [
      {
        name: "Archish S",
        phone: "+91 8438322870",
        email: "archish@smail.iitm.ac.in",
        photo: archish,
      },
      {
        name: "Prabhat",
        phone: "+91 9108259723",
        email: "me20b132@smail.iitm.ac.in",
        photo: prabhat,
      },
    ],
  },
  {
    vertical: "Industry Relations and Outreach",
    heads: [
      {
        name: "Abhiram G",
        phone: "+91 9676617070",
        email: "gabhiram@smail.iitm.ac.in",
        photo: abhiram,
      },
      {
        name: "Shreya Ramkumar",
        phone: "+91 9176352903",
        email: "ed21b060@smail.iitm.ac.in",
        photo: shreya,
      },
      {
        name: "Sreejaa Kumar",
        phone: "+91 9500039714",
        email: "ee21b134@smail.iitm.ac.in",
        photo: sreeja,
      },
    ],
  },
  {
    vertical: "Overall Management",
    heads: [
      {
        name: "Pranit Zope",
        phone: "+91 9879253473",
        email: "ae20b046@smail.iitm.ac.in",
        photo: pranit,
      },
      {
        name: "Akshat Nagar",
        phone: "+91 9997677804",
        email: "ae20b009@smail.iitm.ac.in",
        photo: akshat,
      },
    ],
  },
  {
    vertical: "Finance",
    heads: [
      {
        name: "Shreepoorna S Rao",
        phone: "+91 9483643500",
        email: "ce20b102@smail.iitm.ac.in",
        photo: shreepoorna,
      },
    ],
  },
  {
    vertical: "WebOps",
    heads: [
      {
        name: "Jayanth K",
        phone: "+91 6380021838",
        email: "ae20b030@smail.iitm.ac.in",
        photo: jayanth,
      },
    ],
  },
  {
    vertical: "Design and Marketing",
    heads: [
      {
        name: "Tarini Akshaya Anand",
        phone: "+91 8870522836",
        email: "ed21b066@smail.iitm.ac.in",
        photo: tarini,
      },
      {
        name: "Arnab Samanta",
        phone: "+91 9880861745",
        email: "me20b034@smail.iitm.ac.in",
        photo: arnab,
      },
    ],
  },
];
