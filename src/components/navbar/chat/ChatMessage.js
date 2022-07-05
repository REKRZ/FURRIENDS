/* eslint-disable no-unused-vars */
import { auth } from '../../../firebase';

export default function ChatMessage(props) {
  const { id, text, uid, photoURL, displayName } = props.message;
  const { name } = props;

  const isMessageFromUser = () => {
    return displayName === name;
  };

  return (
    <div
      key={id}
      className={
        isMessageFromUser()
          ? 'flex justify-end pr-2 mb-1 bg-blue-400 border-2 border-white rounded-lg'
          : 'flex justify-start pl-2 mb-1 bg-blue-200 border-2 border-white rounded-lg'
      }
    >
      <span className='flex h-auto text-black text-xs font-normal rounded-sm px-1 p-1 items-center'>
        {!isMessageFromUser() ? (
          <>
            <img
              className='block rounded-full h-7 w-7 mr-1'
              src={
                photoURL ||
                'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
              }
              alt=''
            />
            <p className='pl-3'>{text}</p>
          </>
        ) : (
          <>
            <p className='pr-3'>{text}</p>
            <img
              className='block rounded-full h-7 w-7 mr-1'
              src={
                photoURL ||
                'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
              }
              alt=''
            />
          </>
        )}
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
