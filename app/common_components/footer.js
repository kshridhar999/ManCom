
"use client";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton } from "@mui/material";

const socialLinks = [
  {name: "linkedIn", Icon: LinkedInIcon, url: "https://linkedin.com/in/shridhar-kulkarni-74531b202" },
  {name: "gmail", Icon: MailIcon, url: "mailto:kshridhar.999@gmail.com" },
  {name: "github", Icon: GitHubIcon, url: "https://github.com/kshridhar999" },
];

const openLink = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Footer = () => {
  return <div className="p-1 bg-purple-500 flex justify-between items-center">
    <p className="text-sm text-slate-900">All Rights Reserved</p>
    <line className="flex-auto h-[1px] bg-gradient-to-r from-slate-900 to-purple-200 m-4"/>
    <div className="flex space-x-2">
      {socialLinks.map((link)=>{
        const IconComponent = link.Icon;
        return (
          <IconButton className="bg-purple-200"
            key={link.name}
            onClick={()=> openLink(link.url)}
            style={{color: "white"}}>
            <IconComponent/>
          </IconButton>
          
        );
      })}
    </div>
    <line className="flex-auto h-[1px] bg-gradient-to-l from-slate-900 to-purple-200 m-4"/>
    <p className="text-sm text-slate-900">ManCom United</p>
  </div>
  ;
};

export default Footer;