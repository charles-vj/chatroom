import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAsuyvMqtdwIUx10BHudM4gFHpnXOzYE44",
  authDomain: "chatroom-facb3.firebaseapp.com",
  projectId: "chatroom-facb3",
  storageBucket: "chatroom-facb3.appspot.com",
  messagingSenderId: "976612612870",
  appId: "1:976612612870:web:c2911164711a5931aa5c87",
  measurementId: "G-C29Y9NE1R9"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] =useAuthState(auth);
  return (
    <div className="App">
      <section>
        {user? <CR /> : <SignIn />}
      </section>
      
    </div>
  );
}

function SignIn () {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>SignIn</button>
  )
}

function Signout () {
  return auth.currentUser && (
    <button onClick={() => auth.signOut}>Sign Out</button>
  )
}

function CR () {
  const messagesRef = firestore.collection('messages');
  const query =messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField : 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg}/>)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{text}</p>
}
export default App;
