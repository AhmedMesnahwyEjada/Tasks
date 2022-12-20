import './UserForm.scss'
import {useNavigate, Link} from 'react-router-dom'
import google from '../../Assets/google.svg'
import facebook from '../../Assets/facebook.svg'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {db, auth} from './../../firebase'
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useDispatch } from 'react-redux'
import { login } from '../../redux/user';
import { toggleTheme } from '../../redux/theme'
const UserForm = ({ type }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const clearInputs = () => {
        const inputs = document.querySelectorAll('input')
        inputs.forEach(input => {
            input.value = ''
        });
    }

    const handleSubmit = async (event) =>{
        try{
            event.preventDefault()
            if (type === "signup")
            {
                const [{value: firstName}, {value: lastName}, {value: email}, {value : password}] = event.target
                clearInputs();
                const users = await getDocs( query(collection(db, 'Users'), where('email', '==', email)) );
                if (users.docs.length === 0) {
                    const user = {firstName, lastName, email, password, authProvider: "Local"}
                    await addDoc(collection(db,'Users'), user);
                    dispatch(login(user))
                    navigate("/")
                }
                else   alert("this email is alerady registered");
            }
            else if (type == "login") 
            {
                const [{value: email}, {value : password}] = event.target
                clearInputs();
                const user = await getDocs( query(collection(db, 'Users'), where('email', '==', email), where('password', '==', password)) );
                if (user.docs.length === 0)     alert('there is no user with these credentials')
                else{
                    const {
                        firstName : {stringValue: firstName},
                        lastName : {stringValue : lastName},
                        email : {stringValue: email}
                    } = user.docs[0]._document.data.value.mapValue.fields
                    const loggedUser = {firstName,  lastName,   email}
                    dispatch(login(loggedUser))
                    navigate('/');
                }    
            }
        }
        catch(error)    {console.error("error: " + error)}
    }

    const googleProvider = new GoogleAuthProvider();
    const signupWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth, googleProvider)
            const {displayName, email} = res.user
            const [firstName, lastName] = [displayName.split(" ")[0], displayName.split(" ").at(-1)]
            const user = {firstName, lastName, email, authProvider: "Google"}
            const users = await getDocs( query(collection(db, "Users"), where('email', '==', email)) ); 
            if (users.docs.length === 0)    await addDoc(collection(db,'Users'), user)
            dispatch(login(user))
            navigate("/")
        }
        catch(error)   {console.error("error:" + error)}
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
                    <input className="form-input" type="text" placeholder="First Name" required/> 
                    <label >Last Name</label>
                    <input className="form-input" type="text" placeholder="Last Name" required/>  
                </div>}             
                <label >Email address</label>
                <input className="form-input" type="email" placeholder="Email" required /> 
                <label >Password</label>
                <input className="form-input" type="password" placeholder="Password" required />
            </div>
            <div className='flex-container mt-2'>
                <div className='row'>
                    <div className='col my-1'>
                        <input type="checkbox" className='checkBox' /> 
                        <label> Remmember me</label>
                    </div>
                    <button type='reset' className='col-auto btn mx-5' onClick={(e) =>{e.preventDefault(); dispatch(toggleTheme());}}>Change Theme</button>
                    <Link className='col-auto anchor right-side my-1'>Forgot your password?</Link>
                </div>
                <button type='submit' className='btn login-btn'>{type === 'login'? 'Login' : 'Sign up'}</button>
            </div>
        </form>
    </div>
}
export default UserForm;