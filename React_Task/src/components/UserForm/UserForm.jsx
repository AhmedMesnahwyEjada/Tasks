import './UserForm.scss'
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react';
import google from '../../Assets/google.svg'
import facebook from '../../Assets/facebook.svg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {db, auth} from './../../firebase'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/user';
const UserForm = ({ type }) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                const newUser = {
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    password: password,
                    authProvider: 'Local'
                }
                await addDoc(collection(db,'Users'), newUser)
                dispatch(login(newUser))
                navigate('/')
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
            else{ 
                const newUser = {
                    firstName: user.docs[0]._document.data.value.mapValue.fields.firstName.stringValue,
                    lastName: user.docs[0]._document.data.value.mapValue.fields.lastName.stringValue,
                    email: user.docs[0]._document.data.value.mapValue.fields.email.stringValue,
                }
                dispatch(login(newUser))
                navigate('/');
            }    
        }
    }
    const googleProvider = new GoogleAuthProvider();
    const signupWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth, googleProvider)
            const user ={
                firstName: res.user.displayName.split(" ")[0],
                lastName: res.user.displayName.split(" ").at(-1),
                email: res.user.email,
            } 
            const q = query(collection(db, "Users"), where('id', '==', res.user.uid))
            const users = await getDocs(q); 
            if (users.docs.length === 0)
            {
                await addDoc(collection(db, 'Users'), user)
            }
            dispatch(login(user))
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
        <div className='row justify-content-center'>
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
                <input type="checkbox" className='checkBox' /> 
                <label > Remmember me</label>
                <Link className='anchor right-side' to={'/forgotPassword'} >Forgot your password?</Link>
                <button type='submit' className='btn'>{type === 'login'? 'Login' : 'Sign up'}</button>
            </div>
        </form>
    </div>
}
export default UserForm;