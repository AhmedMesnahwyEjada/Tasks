import './UserForm.scss'
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react';
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.svg'
import { getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {db, auth} from './../../firebase'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
const UserForm = ({ type, setIsLoggedIn }) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RemmemberMe, setRemmemberMe] = useState(false);
    const navigate = useNavigate();
    const clearInputs = () => {
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            input.value = ''
        });
    }
    const handleSubmit = async (event) =>{
        event.preventDefault()
        //call the firebase server create a new account if succeed redirect if not send error messaged
        if (type === "signup")
        {
            const fName = event.target[0].value 
            const lName = event.target[1].value
            const email = event.target[2].value
            const password = event.target[3].value
            clearInputs();
            const emailQuery = query(collection(db, 'Users'), where('email', '==', email));
            // create new account
            const user = await getDocs(emailQuery);
            if (user.docs.length === 0)
            {
                await addDoc(collection(db,'Users'), {
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    password: password,
                    authProvider: 'Local'
                })
            }
            else   alert("this email is alerady registered");
        }
        else if (type == "login") 
        {
            const email = event.target[0].value
            const password = event.target[1].value
            clearInputs();
            const emailPasswordQuery = query(collection(db, 'Users'), where('email', '==', email), where('password', '==', password));
            const user = await getDocs(emailPasswordQuery)
            if (user.docs.length === 0)     alert('there is no user with these credentials')
            else    navigate('/');
        }
    }
    const googleProvider = new GoogleAuthProvider();
    const signupWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth, googleProvider)
            const user = res.user
            const q = query(collection(db, "Users"), where('id', '==', user.uid))
            const users = await getDocs(q); 
            if (users.docs.length === 0)
            {
                await addDoc(collection(db, 'Users'), {
                    firstName: user.displayName.split(" ")[0],
                    lastName: user.displayName.split(" ").at(-1),
                    authProvider : 'Google',
                    email: user.email
                })
            }
            setIsLoggedIn(true)
            navigate('/')
        }catch(error)
        {
            console.log("error:" + error)
        }
    }
    return <div className="signup">
        <h1>Get's Started.</h1>
        {type === 'signup' ? 
            <div className='Signin'> Already have an account ? <Link className='anchor' to={'/login'}>Sign in</Link> </div> :
            <div className='Signin'> Don't have an account ? <Link className='anchor' to={'/signup'}>Sign Up</Link> </div> }
        <div>
            <button className='google' onClick={signupWithGoogle}> <img className='img'  alt='google logo' src={google} /> Sign in with Google </button>
            <button className='facebook'> <img className='img'  alt='facebook logo' src={facebook} /> Sign in with Facebook </button>
        </div>
        <form onSubmit={handleSubmit} id="userForm">
            <div className='form' >
                {(type === 'signup') &&  
                <div>
                    <label >First Name</label>
                    <input className="form-input" type="text" placeholder="First Name" required  value={firstName} onChange={(e) => setFirstname(e.target.value)} /> 
                    <label >Last Name</label>
                    <input className="form-input" type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastname(e.target.value)}/>  
                </div>}             
                <label >Email address</label>
                <input className="form-input" type="email" placeholder="Email" required value={Email} onChange={(e) => setEmail(e.target.value)}/> 
                <label >Password</label>
                <input className="form-input" type="password" placeholder="Password" required value={Password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='flex-container'>
                <input type="checkbox" className='checkBox' onChange={(e) => setRemmemberMe(e.target.checked)}/> 
                <label > Remmember me</label>
                <Link className='anchor right-side' to={'/forgotPassword'} >Forgot your password?</Link>
                <button type='submit' className='btn'>{type === 'login'? 'Login' : 'Sign up'}</button>
            </div>
        </form>
    </div>
}
export default UserForm;