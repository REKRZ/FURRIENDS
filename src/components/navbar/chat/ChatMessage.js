import { auth } from '../../../firebase';

export default function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL ||
            'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png'
          }
          alt=''
        />
        <p>{text}</p>
      </div>
    </>
  );
}