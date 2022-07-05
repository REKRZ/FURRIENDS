import { auth } from '../../../firebase';

export default function ChatMessage(props) {
  const { id, text, uid, photoURL, displayName } = props.message;
  const { name } = props;

  const isMessageFromUser = () => {
    return displayName === name;
  };

  return (
    <div
      className={
        isMessageFromUser()
          ? 'flex justify-end pr-2'
          : 'flex justify-start pl-2'
      }
    >
      <span
        className='flex h-auto text-black text-xs font-normal rounded-sm px-1 p-1 items-center'
        key={id}
      >
        <img
          className='block rounded-full h-7 w-7 mr-1'
          src={
            photoURL ||
            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
          }
          alt=''
        />
        <p className=''>{text}</p>
      </span>
    </div>
  );
}

// (
//   // <div className={`message ${messageClass}`} key={id}>
//   <div
//     className={`${
//       isMessageFromUser() ? 'place-self-end' : 'place-self-start'
//     } space-y-2`}
//     key={id}
//   >
//     <img
//       className='block rounded-full h-7 w-7 mr-1'
//       src={
//         photoURL ||
//         'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
//       }
//       alt=''
//     />
//     <p>{text}</p>
//   </div>
// );
