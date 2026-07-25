// import { Tooltip } from "@mui/material";
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
//   TelegramShareButton,
//   FacebookMessengerShareButton,
//   ThreadsShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   WhatsappIcon,
//   EmailIcon,
//   TelegramIcon,
//   FacebookMessengerIcon,
//   ThreadsIcon,
// } from "react-share";
// import { MdOutlineShare } from "react-icons/md";


// interface ShareTooltipProps {
//   open: boolean;
//   onClose: () => void;
//   shareUrl: string;
//   shareText: string;
//   onClick: () => void;
// }

// const ShareTooltip: React.FC<ShareTooltipProps> = ({
//   open,
//   onClose,
//   shareUrl,
//   shareText,
//   onClick,
// }) => {

//   return (
//     <Tooltip
//       open={open}
//       onClose={onClose}
//       title={
//         <div className="flex gap-2 p-2 flex-wrap">
//           <FacebookShareButton url={shareUrl}>
//             <FacebookIcon size={32} round />
//           </FacebookShareButton>
//           <TwitterShareButton url={shareUrl} title={shareText}>
//             <TwitterIcon size={32} round />
//           </TwitterShareButton>
//           <WhatsappShareButton url={shareUrl} title={shareText}>
//             <WhatsappIcon size={32} round />
//           </WhatsappShareButton>
//           <EmailShareButton
//             url={shareUrl}
//             subject="Hadith of the Day"
//             body={shareText}
//           >
//             <EmailIcon size={32} round />
//           </EmailShareButton>
//           <TelegramShareButton url={shareUrl} title={shareText}>
//             <TelegramIcon size={32} round />
//           </TelegramShareButton>
//           <FacebookMessengerShareButton url={shareUrl} appId="">
//             <FacebookMessengerIcon size={32} round />
//           </FacebookMessengerShareButton>
//           <ThreadsShareButton url={shareUrl}>
//             <ThreadsIcon size={32} round />
//           </ThreadsShareButton>
//         </div>
//       }
//     >
//       <div
//         onClick={onClick}
//         style={{ cursor: "pointer" }}
//       >
//         <MdOutlineShare />
//       </div>
//     </Tooltip>
//   );
// };

// export default ShareTooltip;


import { Tooltip } from "@mui/material";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
  ThreadsShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  TelegramIcon,
  FacebookMessengerIcon,
  ThreadsIcon,
} from "react-share";
import { MdOutlineShare } from "react-icons/md";

interface ShareTooltipProps {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  shareText: string;
  onClick: () => void;
}

const ShareTooltip: React.FC<ShareTooltipProps> = ({
  open,
  onClose,
  shareUrl,
  shareText,
  onClick,
}) => {
  return (
    <Tooltip
      open={open}
      onClose={onClose}
      arrow
      title={
        <div className="flex items-center justify-center gap-[0.3rem] p-2 bg-[#f5f5f5] rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={shareText}>
            <TwitterIcon round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={shareText}>
            <WhatsappIcon  round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </WhatsappShareButton>
          <EmailShareButton url={shareUrl} subject="Hadith of the Day" body={shareText}>
            <EmailIcon  round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </EmailShareButton>
          <TelegramShareButton url={shareUrl} title={shareText}>
            <TelegramIcon round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </TelegramShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId="">
            <FacebookMessengerIcon round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </FacebookMessengerShareButton>
          <ThreadsShareButton url={shareUrl}>
            <ThreadsIcon round className="rounded-full p-1 pb-0 w-8 h-8 transition-[transform,background-color] duration-200 hover:scale-110 hover:bg-[#e0e0e0]" />
          </ThreadsShareButton>
        </div>
      }
     slotProps={{
        popper: {
          sx: {
            '& .MuiTooltip-tooltip': {
              backgroundColor: 'transparent',
            //   color: 'white',
            },
          },
        },
      }}
      leaveDelay={5000}
    >
        <MdOutlineShare onClick={onClick} style={{ cursor: "pointer" }}/>
    </Tooltip>
  );
};

export default ShareTooltip;