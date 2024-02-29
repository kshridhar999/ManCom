'use client';
import MailIcon from '@mui/icons-material/Mail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const socialLinks = [
  {
    name: 'linkedIn',
    Icon: LinkedInIcon,
    url: 'https://linkedin.com/in/shridhar-kulkarni-74531b202',
  },
  { name: 'gmail', Icon: MailIcon, url: 'mailto:kshridhar.999@gmail.com' },
  { name: 'github', Icon: GitHubIcon, url: 'https://github.com/kshridhar999' },
];

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

const Footer = () => {
  return (
    <div className='flex items-center justify-between px-2 py-1 shadow-sm'>
      <p className='text-[10px] text-slate-900'>All Rights Reserved</p>
      <line className='m-4 h-[1px] flex-auto bg-slate-600/80' />
      <div className='flex space-x-2'>
        {socialLinks.map((link) => {
          const IconComponent = link.Icon;
          return (
            <button
              className='size-[fit-content] rounded-full bg-transparent p-1 text-slate-600 transition-colors hover:bg-slate-300'
              key={link.name}
              onClick={() => openLink(link.url)}
            >
              <IconComponent />
            </button>
          );
        })}
      </div>
      <line className='m-4 h-[1px] flex-auto bg-slate-600/80 to-purple-200' />
      <p className='text-[10px] text-slate-900'>ManCom United</p>
    </div>
  );
};

export default Footer;
