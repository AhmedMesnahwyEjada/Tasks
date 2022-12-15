import './UserForm.scss'
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react';
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.svg'
const UserForm = ({ type }) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [RemmemberMe, setRemmemberMe] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (event) =>{
        //call the firebase server create a new account if succeed redirect if not send error messaged
        if (type === "signup")
        {
            // create new account
        }
        else if (type == "login") 
        {
            // check the credintials 
        }
        navigate('/');
    }
    return <div className="signup">
        <h1>Get's Started.</h1>
        {type === 'signup' ? 
            <div className='Signin'> Already have an account ? <Link className='anchor' to={'/login'}>Sign in</Link> </div> :
            <div className='Signin'> Don't have an account ? <Link className='anchor' to={'/signup'}>Sign Up</Link> </div> }
        <div>
            <button className='google'> <img className='img'  alt='google logo' src={google} /> Sign in with Google </button>
            <button className='facebook'> <img className='img'  alt='facebook logo' src={facebook} /> Sign in with Facebook </button>
        </div>
        <form onSubmit={handleSubmit}>
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
                <input className="form-input" type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='flex-container'>
                <input type="checkbox" className='checkBox' onChange={(e) => setRemmemberMe(e.target.checked)}/> 
                <label > Remmember me</label>
                <Link className='anchor right-side' to={'/forgotPassword'} >Forgot your password?</Link>
                <button type='submit' className='btn'>Sign Up</button>
            </div>
        </form>
    </div>
}
export default UserForm;